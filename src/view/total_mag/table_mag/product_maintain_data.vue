<template>
  <div>
    <Row :gutter="14">
      <i-col span="24">
        <tables ref="productTable" editable searchable border search-place="top" :columns="productColumns" v-model="productData"></tables>
      </i-col>
    </Row>
  </div>
</template>

<script>
import Tables from '_c/tables'
import { getTableData } from '@/api/data'
export default {
  name: 'product_maintain_data',
  components: {
    Tables
  },
  data () {
    return {
      // 配额审批表的信息及内容
      productColumns: [
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
          key: 'cus_comp',
          minWidth: 150,
          align: 'center',
          searchable: false
        },
        {
          title: '维护批次',
          key: 'maintain_index',
          width: 250,
          align: 'center'
        },
        {
          title: '维护种类',
          key: 'maintain_kind',
          minWidth: 130,
          align: 'center'
        },
        {
          title: '待维护升级产品数目',
          key: 'wait_maintain_num',
          minWidth: 130,
          align: 'center'
        },
        {
          title: '维护时间',
          key: 'maintain_time',
          minWidth: 130,
          align: 'center'
        },
        {
          title: '备注',
          key: 'other',
          minWidth: 200,
          align: 'center'
        }
      ],
      productData: [
        {
          cus_comp: '武地建发玺院地产',
          maintain_index: '2019-311',
          maintain_kind: 4,
          wait_maintain_num: 21,
          maintain_time: '2019-05-21 22:19:16',
          other: '暂无备注信息'
        },
        {
          cus_comp: '佳兆业广场天御',
          maintain_index: '2019-255',
          maintain_kind: 4,
          wait_maintain_num: 6,
          maintain_time: '2019-05-24 10:21:11',
          other: '暂无备注信息'
        },
        {
          cus_comp: '武汉融创观澜府',
          maintain_index: '2019-266',
          maintain_kind: 1,
          wait_maintain_num: 15,
          maintain_time: '2019-05-12 06:21:11',
          other: '暂无备注信息'
        },
        {
          cus_comp: '翡翠中心润玺',
          maintain_index: '2019-231',
          maintain_kind: 1,
          wait_maintain_num: 21,
          maintain_time: '2019-01-24 12:41:21',
          other: '暂无备注信息'
        },
        {
          cus_comp: '恒大金碧天下',
          maintain_index: '2019-325',
          maintain_kind: 2,
          wait_maintain_num: 17,
          maintain_time: '2019-06-24 15:21:11',
          other: '暂无备注信息'
        },
        {
          cus_comp: '联发国际度假区红韵天',
          maintain_index: '2019-197',
          maintain_kind: 3,
          wait_maintain_num: 18,
          maintain_time: '2019-05-14 10:11:11',
          other: '暂无备注信息'
        },
        {
          cus_comp: '地铁盛观尚城',
          maintain_index: '2019-199',
          maintain_kind: 2,
          wait_maintain_num: 22,
          maintain_time: '2019-03-24 12:24:11',
          other: '暂无备注信息'
        },
        {
          cus_comp: '大华公园华府',
          maintain_index: '2019-287',
          maintain_kind: 4,
          wait_maintain_num: 36,
          maintain_time: '2019-04-24 10:21:11',
          other: '暂无备注信息'
        },
        {
          cus_comp: '阳逻万达广场御江（万达旗下）',
          maintain_index: '2019-290',
          maintain_kind: 4,
          wait_maintain_num: 47,
          maintain_time: '2019-05-24 10:21:11',
          other: '暂无备注信息'
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
