<template>
  <div>
    <Row :gutter="14">
      <i-col span="24">
        <tables ref="piUseTable" editable searchable border search-place="top" :columns="piUseColumns" v-model="piUseData"></tables>
      </i-col>
    </Row>
  </div>
</template>

<script>
import Tables from '_c/tables'
import { getTableData } from '@/api/data'
export default {
  name: 'use_mag',
  components: {
    Tables
  },
  data () {
    return {
      // 配额审批表的信息及内容
      piUseColumns: [
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
          title: '使用单位',
          key: 'use_comp',
          minWidth: 150,
          align: 'center',
          searchable: false
        },
        {
          title: '机器人类别',
          key: 'use_robot_kind',
          width: 250,
          align: 'center'
        },
        {
          title: '配额数目',
          key: 'peie_num',
          minWidth: 130,
          align: 'center'
        },
        {
          title: '已使用数目',
          key: 'use_num',
          minWidth: 130,
          align: 'center'
        },
        {
          title: '剩余数目',
          key: 'left_num',
          minWidth: 130,
          align: 'center'
        },
        {
          title: '操作时间',
          key: 'op_time',
          minWidth: 200,
          align: 'center'
        }
      ],
      piUseData: [
        {
          use_comp: '武地建发玺院地产',
          use_robot_kind: '智能垃圾车',
          peie_num: 50,
          use_num: 17,
          left_num: 33,
          op_time: '2019-05-24 10:21:11'
        },
        {
          use_comp: '阳逻万达广场御江（万达旗下）',
          use_robot_kind: '智能垃圾车',
          peie_num: 150,
          use_num: 35,
          left_num: 115,
          op_time: '2019-05-20 14:54:21'
        },
        {
          use_comp: '阳逻万达广场御江（万达旗下）',
          use_robot_kind: '智能快递车',
          peie_num: 50,
          use_num: 17,
          left_num: 33,
          op_time: '2019-05-26 11:21:11'
        },
        {
          use_comp: '武地建发玺院地产',
          use_robot_kind: '智能巡逻车',
          peie_num: 50,
          use_num: 17,
          left_num: 33,
          op_time: '2019-05-21 10:21:11'
        },
        {
          use_comp: '佳兆业广场天御',
          use_robot_kind: '智能垃圾车',
          peie_num: 50,
          use_num: 17,
          left_num: 33,
          op_time: '2019-05-21 10:21:11'
        },
        {
          use_comp: '恒大金碧天下',
          use_robot_kind: '智能快递车',
          peie_num: 40,
          use_num: 17,
          left_num: 23,
          op_time: '2019-05-25 13:27:11'
        },
        {
          use_comp: '联发国际度假区红韵天',
          use_robot_kind: '智能巡逻车',
          peie_num: 50,
          use_num: 17,
          left_num: 13,
          op_time: '2019-05-26 10:21:55'
        },
        {
          use_comp: '武汉融创观澜府',
          use_robot_kind: '智能垃圾车',
          peie_num: 150,
          use_num: 117,
          left_num: 33,
          op_time: '2019-05-27 15:21:11'
        },
        {
          use_comp: '武地建发玺院地产',
          use_robot_kind: '智能垃圾车',
          peie_num: 50,
          use_num: 17,
          left_num: 13,
          op_time: '2019-05-22 15:21:11'
        },
        {
          use_comp: '武地建发玺院地产',
          use_robot_kind: '智能清洁车',
          peie_num: 50,
          use_num: 17,
          left_num: 13,
          op_time: '2019-05-21 10:21:11'
        },
        {
          use_comp: '武汉融创观澜府',
          use_robot_kind: '智能巡逻车',
          peie_num: 60,
          use_num: 43,
          left_num: 13,
          op_time: '2019-05-21 10:21:11'
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
