<template>
  <div ref="dom"></div>
</template>

<script>
import echarts from 'echarts'
import { on, off } from '@/libs/tools'
import tdTheme from '_c/charts/theme.json'
echarts.registerTheme('tdTheme', tdTheme)
export default {
  name: 'packageCompIncome',
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
          [7230, '建发玺院'],
          [10060, '佳兆天御'],
          [12400, '武汉融创'],
          [17750, '翡翠中心'],
          [17960, '恒为旅行'],
          [18520, '红韵天'],
          [18660, '地铁尚城'],
          [28830, '大华华府'],
          [29360, '百江玉玺']
        ]
      },
      grid: {
        left: '3%',
        right: '4%',
        top: '3%',
        containLabel: true
      },
      xAxis: { name: '营收金额（元）' },
      yAxis: { type: 'category' },
      visualMap: {
        orient: 'horizontal',
        left: 'center',
        min: 7000,
        max: 30000,
        text: ['高营收', '低营收'],
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
            x: '营收金额（元）',
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
