<template>
  <div ref="dom"></div>
</template>

<script>
import echarts from 'echarts'
import { on, off } from '@/libs/tools'
import tdTheme from '_c/charts/theme.json'
echarts.registerTheme('tdTheme', tdTheme)
export default {
  name: 'trashDetailKind',
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
      legend: {
        data: ['废纸', '塑料', '玻璃', '金属', '布料']
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
          boundaryGap: false,
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
          name: '废纸',
          type: 'line',
          areaStyle: {},
          stack: '回收垃圾数量（kg）',
          data: [232, 247, 260, 256, 268, 270, 280]
        },
        {
          name: '塑料',
          type: 'line',
          areaStyle: {},
          stack: '回收垃圾数量（kg）',
          data: [44, 51, 56, 59, 67, 63, 67]
        },
        {
          name: '玻璃',
          type: 'line',
          areaStyle: {},
          stack: '回收垃圾数量（kg）',
          data: [39, 42, 116, 143, 192, 160, 196]
        },
        {
          name: '金属',
          type: 'line',
          areaStyle: {},
          stack: '回收垃圾数量（kg）',
          data: [100, 150, 200, 220, 200, 194, 220]
        },
        {
          name: '布料',
          type: 'line',
          areaStyle: {},
          stack: '回收垃圾数量（kg）',
          data: [100, 130, 130, 160, 180, 183, 234]
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
