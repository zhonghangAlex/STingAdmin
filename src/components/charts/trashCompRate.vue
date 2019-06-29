<template>
  <div ref="dom"></div>
</template>

<script>
import echarts from 'echarts'
import { on, off } from '@/libs/tools'
import tdTheme from '_c/charts/theme.json'
echarts.registerTheme('tdTheme', tdTheme)
export default {
  name: 'trashCompRate',
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
      dataset: {
        source: [
          ['score', 'amount', 'product'],
          [323.7, '建发玺院'],
          [406.6, '佳兆天御'],
          [640.6, '武汉融创'],
          [775.1, '翡翠中心'],
          [796.7, '恒为旅行'],
          [852.1, '红韵天'],
          [866.2, '地铁尚城'],
          [883.3, '大华华府'],
          [936.5, '百江玉玺']
        ]
      },
      grid: {
        left: '3%',
        right: '4%',
        top: '3%',
        containLabel: true
      },
      xAxis: { name: '回收量（kg）' },
      yAxis: { type: 'category' },
      visualMap: {
        orient: 'horizontal',
        left: 'center',
        min: 300,
        max: 1000,
        text: ['高回收', '低回收'],
        // Map the score column to color
        dimension: 0,
        inRange: {
          color: ['#D7DA8B', '#E15457']
        }
      },
      series: [
        {
          type: 'bar',
          encode: {
            // Map the "amount" column to X axis.
            x: '回收量（kg）',
            // Map the "product" column to Y axis
            y: '公司名称'
          }
        }
      ]
    }
    this.$nextTick(() => {
      this.dom = echarts.init(this.$refs.dom)
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
