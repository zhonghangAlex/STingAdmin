<template>
  <div ref="dom"></div>
</template>

<script>
import echarts from 'echarts'
import { on, off } from '@/libs/tools'
import tdTheme from '_c/charts/theme.json'
echarts.registerTheme('tdTheme', tdTheme)
export default {
  name: 'lineUse',
  data () {
    return {
      dom: null,
      option: null
    }
  },
  methods: {
    resize () {
      this.dom.resize()
    }
  },
  mounted () {
    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['line', 'bar'] },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      legend: {
        data: ['维修车辆', '维修垃圾车', '维修快递车', '维修清扫车', '在线车辆', '在线垃圾车', '在线快递车', '在线清扫车']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '维修车辆',
          type: 'bar',
          data: [135, 133, 135, 147, 155, 142, 139],
          markLine: {
            lineStyle: {
              normal: {
                type: 'dashed'
              }
            },
            data: [
              [{ type: 'min' }, { type: 'max' }]
            ]
          }
        },
        {
          name: '维修垃圾车',
          type: 'bar',
          barWidth: 5,
          stack: '维修车辆',
          data: [31, 33, 40, 35, 41, 47, 42]
        },
        {
          name: '维修快递车',
          type: 'bar',
          stack: '维修车辆',
          data: [29, 39, 34, 33, 35, 42, 40]
        },
        {
          name: '维修清扫车',
          type: 'bar',
          stack: '维修车辆',
          data: [75, 61, 61, 79, 79, 53, 57]
        },
        {
          name: '在线车辆',
          type: 'bar',
          data: [355, 390, 432, 458, 527, 493, 503],
          markLine: {
            lineStyle: {
              normal: {
                type: 'dashed'
              }
            },
            data: [
              [{ type: 'min' }, { type: 'max' }]
            ]
          }
        },
        {
          name: '在线垃圾车',
          type: 'bar',
          barWidth: 5,
          stack: '在线车辆',
          data: [232, 247, 260, 256, 268, 270, 280]
        },
        {
          name: '在线快递车',
          type: 'bar',
          stack: '在线车辆',
          data: [44, 51, 56, 59, 67, 63, 67]
        },
        {
          name: '在线清扫车',
          type: 'bar',
          stack: '在线车辆',
          data: [79, 92, 116, 143, 192, 160, 156]
        }
      ]
    }
    this.$nextTick(() => {
      this.dom = echarts.init(this.$refs.dom, 'tdTheme')
      this.dom.setOption(option, true)
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
