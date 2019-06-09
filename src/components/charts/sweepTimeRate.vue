<template>
  <div ref="dom"></div>
</template>

<script>
import echarts from 'echarts'
import { on, off } from '@/libs/tools'
import tdTheme from '_c/charts/theme.json'
echarts.registerTheme('tdTheme', tdTheme)
export default {
  name: 'sweepTimeRate',
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
          [523, '建发玺院'],
          [596, '佳兆天御'],
          [740, '武汉融创'],
          [975, '翡翠中心'],
          [1496, '恒大金碧'],
          [1952, '红韵天'],
          [2566, '地铁尚城'],
          [2783, '大华华府'],
          [2836, '万达旗下']
        ]
      },
      grid: {
        left: '3%',
        right: '4%',
        top: '3%',
        containLabel: true
      },
      xAxis: { name: '工作时长（h）' },
      yAxis: { type: 'category' },
      visualMap: {
        orient: 'horizontal',
        left: 'center',
        min: 700,
        max: 3000,
        text: ['高时长', '低时长'],
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
            x: '工作时长（h）',
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
