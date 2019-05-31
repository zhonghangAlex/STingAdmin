<template>
  <div>
    <Row :gutter="14">
      <i-col span="24">
        <tables ref="piTable" editable searchable border search-place="top" :columns="piColumns" v-model="piData"></tables>
      </i-col>
    </Row>
    <Modal
      v-model="acc_dialog"
      title="同意配额申请操作"
      @on-ok="acc_confirm"
      @on-cancel="acc_cancel">
      <Form :model="accPiForm" label-position="right" :label-width="100">
        <FormItem label="申请编号">
          <Input v-model="accPiForm.acc_apply_no" disabled style="width: 300px;"></Input>
        </FormItem>
        <FormItem label="申请配额">
          <Input v-model="accPiForm.acc_apply_num" disabled style="width: 300px;"></Input>
        </FormItem>
        <FormItem label="接受配额">
          <InputNumber  v-model="accPiForm.acc_num" :precision="0" :max="accPiForm.acc_apply_num" :min="1" :step="1" placeholder="请输入同意配额的数目" style="width: 300px;"></InputNumber >
        </FormItem>
        <FormItem label="备注信息">
          <Input v-model="accPiForm.acc_apply_other" placeholder="请输入备注信息" style="width: 300px;"></Input>
        </FormItem>
      </Form>
    </Modal>
    <Modal v-model="refuse_dialog" @on-cancel="refuse_cancel" width="360">
      <p slot="header" style="color:#f60;">
        <Icon type="ios-information-circle"></Icon>
        <span>拒绝配额申请</span>
      </p>
      <div style="text-align:center">
        <p>您是否拒绝编号为{{ refusePiForm.refuse_apply_no }}的配额申请？</p>
        <p style="margin-top: 14px;"><Input v-model="refusePiForm.refuse_apply_other" placeholder="请输入备注信息" style="width: 300px;"></Input></p>
      </div>
      <div slot="footer">
        <Button type="error" size="large" long  @click="refuse_Confirm">拒绝申请</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import Tables from '_c/tables'
import { getTableData } from '@/api/data'
export default {
  name: 'shenpi',
  components: {
    Tables
  },
  data () {
    return {
      // 配额审批表的信息及内容
      piColumns: [
        {
          title: '序号',
          width: 60,
          key: 'index',
          align: 'center',
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
          title: '申请编号',
          key: 'apply_no',
          minWidth: 150,
          align: 'center',
          searchable: false
        },
        {
          title: '申请配额',
          key: 'apply_num',
          width: 100,
          align: 'center'
        },
        {
          title: '实际通过配额',
          key: 'acc_num',
          width: 130,
          align: 'center'
        },
        {
          title: '审核状态',
          key: 'apply_status',
          minWidth: 200,
          align: 'center',
          render: (h, params) => {
            return h('Tag', {
              props: {
                color: (params.row.apply_status === '未审核') ? '#ff9900' : ((params.row.apply_status === '已拒绝') ? '#ed4014' : '#19be6b'),
                type: 'dot'
              }
            }, params.row.apply_status)
          }
        },
        {
          title: '申请类别',
          key: 'apply_kind',
          width: 100,
          align: 'center'
        },
        {
          title: '申请单位',
          key: 'apply_comp',
          minWidth: 200,
          align: 'center'
        },
        {
          title: '申请时间',
          key: 'apply_time',
          width: 200,
          align: 'center'
        },
        {
          title: '审核备注',
          key: 'apply_other',
          width: 200,
          align: 'center'
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px',
                  display: (params.row.apply_status === '未审核') ? 'inline-block' : 'none'
                },
                on: {
                  click: () => {
                    this.showAccDialog(params.index)
                  }
                }
              }, '同意'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                style: {
                  display: (params.row.apply_status === '未审核') ? 'inline-block' : 'none'
                },
                on: {
                  click: () => {
                    this.showRefuseDialog(params.index)
                  }
                }
              }, '拒绝')
            ])
          }
        }
      ],
      piData: [
        {
          apply_no: 'STPE12301',
          apply_num: 18,
          acc_num: 0,
          apply_status: '未审核',
          apply_kind: '公司申报',
          apply_comp: '武汉市快浪车辆有限公司',
          apply_time: '2019-05-21 10:21:11',
          apply_other: '无备注信息'
        },
        {
          apply_no: 'STPE12971',
          apply_num: 5,
          acc_num: 0,
          apply_status: '已拒绝',
          apply_kind: '公司申报',
          apply_comp: '湖州德清立通（韵达）快递',
          apply_time: '2019-05-21 13:19:11',
          apply_other: '超过额定标准'
        },
        {
          apply_no: 'STPE19124岁',
          apply_num: 118,
          acc_num: 0,
          apply_status: '未审核',
          apply_kind: '个体申报',
          apply_comp: '武汉市南国花园社区管理会',
          apply_time: '2019-05-01 16:53:11',
          apply_other: '无备注信息'
        },
        {
          apply_no: 'STPE11351',
          apply_num: 27,
          acc_num: 0,
          apply_status: '未审核',
          apply_kind: '公司申报',
          apply_comp: '武汉市快浪车辆有限公司',
          apply_time: '2019-05-21 19:21:11',
          apply_other: '无备注信息'
        },
        {
          apply_no: 'STPE16361',
          apply_num: 18,
          acc_num: 18,
          apply_status: '审核通过',
          apply_kind: '公司申报',
          apply_comp: '武汉市智刚车辆科技有限公司',
          apply_time: '2019-05-25 10:11:11',
          apply_other: '无备注信息'
        },
        {
          apply_no: 'STPE12307',
          apply_num: 20,
          acc_num: 10,
          apply_status: '审核通过',
          apply_kind: '公司申报',
          apply_comp: '武汉市快浪车辆有限公司',
          apply_time: '2019-03-12 09:11:11',
          apply_other: '无备注信息'
        },
        {
          apply_no: 'STPE13663',
          apply_num: 60,
          acc_num: 0,
          apply_status: '未审核',
          apply_kind: '个体申报',
          apply_comp: '武汉市松涛苑社区管理会',
          apply_time: '2019-05-28 22:17:21',
          apply_other: '无备注信息'
        },
        {
          apply_no: 'STPE12349',
          apply_num: 55,
          acc_num: 55,
          apply_status: '审核通过',
          apply_kind: '公司申报',
          apply_comp: '武汉市神龙汽车制造有限公司',
          apply_time: '2019-05-29 12:11:11',
          apply_other: '无备注信息'
        },
        {
          apply_no: 'STPE12501',
          apply_num: 20,
          acc_num: 10,
          apply_status: '审核通过',
          apply_kind: '公司申报',
          apply_comp: '武汉市快浪车辆有限公司',
          apply_time: '2019-03-12 09:11:11',
          apply_other: '无备注信息'
        },
        {
          apply_no: 'STPE22300',
          apply_num: 60,
          acc_num: 0,
          apply_status: '未审核',
          apply_kind: '个体申报',
          apply_comp: '武汉市君华苑物业管理中心',
          apply_time: '2019-05-28 22:17:21',
          apply_other: '无备注信息'
        }
      ],
      // 同意配额相关
      acc_dialog: false,
      index: 0,
      accPiForm: {
        acc_apply_no: '',
        acc_apply_num: 0,
        acc_num: 1,
        acc_apply_other: ''
      },
      // 拒绝配额相关
      refuse_dialog: false,
      refusePiForm: {
        refuse_apply_no: '',
        refuse_apply_num: 0,
        refuse_apply_other: ''
      }
    }
  },
  methods: {
    // 下方是配额审批表的信息及内容
    // 同意审批
    showAccDialog (index) {
      this.index = index
      this.acc_dialog = true
      this.accPiForm.acc_apply_no = this.piData[index].apply_no
      this.accPiForm.acc_apply_num = this.piData[index].apply_num
    },
    acc_confirm () {
      this.piData[this.index].apply_status = '已审批'
      this.piData[this.index].acc_num = this.accPiForm.acc_num
      this.piData[this.index].apply_other = this.accPiForm.acc_apply_other
      this.$Message.success(`编号为:${this.piData[this.index].apply_no}的申请审核成功！`)
      this.acc_cancel()
    },
    acc_cancel () {
      this.acc_dialog = false
      this.accPiForm.acc_apply_no = ''
      this.accPiForm.acc_apply_num = 0
      this.accPiForm.acc_num = 1
      this.accPiForm.acc_apply_other = ''
    },
    // 拒绝审批
    showRefuseDialog (index) {
      this.index = index
      this.refuse_dialog = true
      this.refusePiForm.refuse_apply_no = this.piData[index].apply_no
      this.refusePiForm.refuse_apply_num = this.piData[index].apply_num
    },
    refuse_Confirm () {
      this.piData[this.index].apply_status = '已拒绝'
      this.piData[this.index].apply_other = this.refusePiForm.refuse_apply_other
      this.$Message.success(`编号为:${this.piData[this.index].apply_no}的申请已拒绝！`)
      this.refuse_cancel()
    },
    refuse_cancel () {
      this.refuse_dialog = false
      this.refusePiForm.refuse_apply_no = ''
      this.refusePiForm.refuse_apply_num = 0
      this.refusePiForm.refuse_apply_other = ''
    }
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
