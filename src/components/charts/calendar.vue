<template>
  <div ref="dom"></div>
</template>

<script>
import echarts from 'echarts'
import { on, off } from '@/libs/tools'
import tdTheme from '_c/charts/theme.json'
echarts.registerTheme('tdTheme', tdTheme)
export default {
  name: 'calendar',
  data () {
    return {
      dom: null,
      pieRadius: 30,
      cellSize: [80, 80],
      scatterData: this.getVirtulData(),
      option: null
    }
  },
  methods: {
    resize () {
      this.dom.resize()
    },
    getVirtulData () {
      let date = +echarts.number.parseDate('2019-05-01')
      let end = +echarts.number.parseDate('2019-05-31')
      let dayTime = 3600 * 24 * 1000
      let data = []
      for (let time = date; time < end; time += dayTime) {
        data.push([
          echarts.format.formatTime('yyyy-MM-dd', time),
          Math.floor(Math.random() * 10000)
        ])
      }
      return data
    },
    getPieSeries (scatterData, chart) {
      let _this = this
      return echarts.util.map(scatterData, function (item, index) {
        let center = chart.convertToPixel('calendar', item)
        return {
          id: index + 'pie',
          type: 'pie',
          center: center,
          label: {
            normal: {
              formatter: '{c}',
              position: 'inside'
            }
          },
          radius: _this.pieRadius,
          data: [
            { name: '新增快递车配额', value: Math.round(Math.random() * 8) },
            { name: '新增垃圾车配额', value: Math.round(Math.random() * 20) },
            { name: '新增清洁车配额', value: Math.round(Math.random() * 8) },
            { name: '新增巡逻车配额', value: Math.round(Math.random() * 8) }
          ]
        }
      })
    }
  },
  mounted () {
    let _this = this
    const option = {
      tooltip: {

      },
      title: {
        text: '5月每周新增配额统计',
        x: 'center'
      },
      legend: {
        data: ['新增快递车配额', '新增垃圾车配额', '新增清洁车配额', '新增巡逻车配额'],
        bottom: 20
      },
      calendar: {
        top: 'middle',
        left: 'center',
        orient: 'vertical',
        splitLine: {
          show: true,
          lineStyle: {
            color: '#444444',
            opacity: 0
          }
        },
        itemStyle: {
          borderColor: '#ffffff'
        },
        cellSize: this.cellSize,
        yearLabel: {
          show: false,
          textStyle: {
            fontSize: 30
          }
        },
        dayLabel: {
          margin: 20,
          firstDay: 1,
          nameMap: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
        },
        monthLabel: {
          show: false
        },
        range: ['2019-05']
      },
      series: [{
        id: 'label',
        type: 'scatter',
        coordinateSystem: 'calendar',
        // symbolSize: 1,
        color: '#fff',
        label: {
          normal: {
            show: true,
            formatter: function (params) {
              return echarts.format.formatTime('dd', params.value[0])
            },
            offset: [-this.cellSize[0] / 2 + 10, -this.cellSize[1] / 2 + 10],
            textStyle: {
              color: '#000',
              fontSize: 14
            }
          }
        },
        data: this.scatterData
      }]
    }
    this.$nextTick(() => {
      this.dom = echarts.init(this.$refs.dom, 'tdTheme')
      this.dom.setOption(option, true)
      this.dom.setOption({
        series: _this.getPieSeries(this.scatterData, this.dom)
      })
    })
    on(window, 'resize', this.resize)
  },
  beforeDestroy () {
    off(window, 'resize', this.resize)
  }
}
</script>

<style scoped>
</style>
