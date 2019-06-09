<template>
  <div ref="dom"></div>
</template>

<script>
import echarts from 'echarts'
import { on, off } from '@/libs/tools'
import tdTheme from '_c/charts/theme.json'
echarts.registerTheme('tdTheme', tdTheme)
export default {
  name: 'guardTotalRate',
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
          [52, '建发玺院'],
          [140, '佳兆天御'],
          [154, '武汉融创'],
          [177, '翡翠中心'],
          [199, '恒大金碧'],
          [205, '红韵天'],
          [206, '地铁尚城'],
          [250, '大华华府'],
          [323, '万达旗下']
        ]
      },
      grid: {
        left: '3%',
        right: '4%',
        top: '3%',
        containLabel: true
      },
      xAxis: { name: '巡逻次数（次）' },
      yAxis: { type: 'category' },
      visualMap: {
        orient: 'horizontal',
        left: 'center',
        min: 70,
        max: 300,
        text: ['高频率', '低频率'],
        // Map the score column to color
        dimension: 0,
        inRange: {
          color: ['#accdff', '#3e6ec7']
        }
      },
      series: [
        {
          type: 'bar',
          encode: {
            // Map the "amount" column to X axis.
            x: '巡逻次数（次）',
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
