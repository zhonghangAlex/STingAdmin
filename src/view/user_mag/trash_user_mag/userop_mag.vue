<template>
  <div>
    <Row :gutter="14">
      <i-col span="24">
        <tables ref="userOpTable" editable searchable border search-place="top" :columns="userOpColumns" v-model="userOpData"></tables>
      </i-col>
    </Row>
  </div>
</template>

<script>
import Tables from '_c/tables'
import { getTableData } from '@/api/data'
export default {
  name: 'userop_mag',
  components: {
    Tables
  },
  data () {
    return {
      // 表的信息及内容
      userOpColumns: [
        {
          title: '序号',
          width: 60,
          align: 'center',
          key: 'index',
          searchable: false,
          render: (h, params) => {
            return h('div', {
              style: {
                backgroundColor: '#3e6ec7',
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                lineHeight: '30px',
                color: '#ffffff'
              }
            }, params.index + 1)
          }
        },
        {
          title: '客户单位名称',
          key: 'user_comp',
          minWidth: 150,
          align: 'center',
          searchable: false
        },
        {
          title: '产品车辆总数',
          key: 'car_total',
          width: 250,
          align: 'center'
        },
        {
          title: '累计订单总数',
          key: 'order_total',
          minWidth: 130,
          align: 'center'
        },
        {
          title: '主要品类垃圾回收处理总数',
          key: 'main_kind_nums',
          minWidth: 130,
          align: 'center'
        },
        {
          title: '垃圾回收处理收益余额',
          key: 'left_num',
          minWidth: 130,
          align: 'center'
        },
        {
          title: '收益增率',
          key: 'income_rate',
          sortable: true,
          minWidth: 200,
          align: 'center',
          render: (h, params) => {
            return h('Progress', {
              props: {
                percent: params.row.income_rate,
                status: 'active'
              },
              style: {
                width: '80%'
              }
            }, params.row.income_rate)
          }
        }
      ],
      userOpData: [
        {
          user_comp: '武汉建成玉玺地质',
          car_total: 17,
          order_total: 50,
          main_kind_nums: 17,
          left_num: 33,
          income_rate: 27.55
        },
        {
          user_comp: '阳逻万达广场御江',
          car_total: 16,
          order_total: 150,
          main_kind_nums: 35,
          left_num: 115,
          income_rate: 43.63
        },
        {
          user_comp: '建发地产集团',
          car_total: 15,
          order_total: 50,
          main_kind_nums: 17,
          left_num: 33,
          income_rate: 83.19
        },
        {
          user_comp: '武汉市瑞安大江苑会所',
          car_total: 11,
          order_total: 50,
          main_kind_nums: 17,
          left_num: 33,
          income_rate: 22.34
        },
        {
          user_comp: '佳兆业广场天御',
          car_total: 19,
          order_total: 50,
          main_kind_nums: 17,
          left_num: 33,
          income_rate: 32.51
        },
        {
          user_comp: '恒为世家国际旅游中心',
          car_total: 14,
          order_total: 40,
          main_kind_nums: 17,
          left_num: 23,
          income_rate: 59.54
        },
        {
          user_comp: '联发国际度假区红韵天',
          car_total: 22,
          order_total: 50,
          main_kind_nums: 17,
          left_num: 13,
          income_rate: 73.51
        },
        {
          user_comp: '武汉融创国际会务中心',
          car_total: 16,
          order_total: 150,
          main_kind_nums: 117,
          left_num: 33,
          income_rate: 22.91
        },
        {
          user_comp: '武汉市深度科学研究中心',
          car_total: 30,
          order_total: 44,
          main_kind_nums: 17,
          left_num: 13,
          income_rate: 45.77
        },
        {
          user_comp: '武汉市邬所创投',
          car_total: 53,
          order_total: 50,
          main_kind_nums: 17,
          left_num: 13,
          income_rate: 36.75
        },
        {
          user_comp: '武汉市快链创投大厦',
          car_total: 96,
          order_total: 60,
          main_kind_nums: 43,
          left_num: 13,
          income_rate: 76.34
        }
      ]
    }
  },
  methods: {
  },
  mounted () {
    getTableData().then(res => {
      this.tableData = res.data
    })
  }
}
</script>

<style lang="less" scoped>
  .wait_cell {
    color: #ff9900
  }
  .refuse_cell {
    color: #ed4014
  }
  .acc_cell {
    color: #19be6b
  }
</style>
