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
          title: '车辆运行总时长',
          key: 'car_use_time',
          minWidth: 130,
          align: 'center',
          render: (h, params) => {
            return h('span', {
            }, params.row.car_use_time + '小时')
          }
        },
        {
          title: '已进行过的维护批次',
          key: 'maintain_times',
          minWidth: 130,
          align: 'center'
        }
      ],
      userOpData: [
        {
          user_comp: '佳兆业广场天御',
          car_total: 13,
          order_total: 50,
          car_use_time: 1634,
          maintain_times: 2,
          income_rate: 32.51
        },
        {
          user_comp: '恒为世家国际旅游中心',
          car_total: 20,
          order_total: 52,
          car_use_time: 1431,
          maintain_times: 3,
          income_rate: 59.54
        },
        {
          user_comp: '联发国际度假区红韵天',
          car_total: 12,
          order_total: 12,
          car_use_time: 2217,
          maintain_times: 2,
          income_rate: 73.51
        },
        {
          user_comp: '武地建发玺院地产',
          car_total: 14,
          order_total: 54,
          car_use_time: 1718,
          maintain_times: 3,
          income_rate: 27.55
        },
        {
          user_comp: '阳逻万达广场御江',
          car_total: 8,
          order_total: 126,
          car_use_time: 3537,
          maintain_times: 2,
          income_rate: 43.63
        },
        {
          user_comp: '建发地产集团',
          car_total: 13,
          order_total: 50,
          car_use_time: 3354,
          maintain_times: 5,
          income_rate: 83.19
        },
        {
          user_comp: '武汉市瑞安大江苑会所',
          car_total: 5,
          order_total: 50,
          car_use_time: 1181,
          maintain_times: 3,
          income_rate: 22.34
        },
        {
          user_comp: '武汉融创国际会务中心',
          car_total: 8,
          order_total: 150,
          car_use_time: 1417,
          maintain_times: 3,
          income_rate: 22.91
        },
        {
          user_comp: '武汉市深度科学研究中心',
          car_total: 4,
          order_total: 44,
          car_use_time: 1319,
          maintain_times: 6,
          income_rate: 45.77
        },
        {
          user_comp: '武汉市邬所创投',
          car_total: 9,
          order_total: 50,
          car_use_time: 1578,
          maintain_times: 5,
          income_rate: 36.75
        },
        {
          user_comp: '武汉市快链创投大厦',
          car_total: 2,
          order_total: 60,
          car_use_time: 765,
          maintain_times: 6,
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
