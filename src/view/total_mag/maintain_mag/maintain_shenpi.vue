<template>
  <div>
    <tables ref="carSearchTable" editable searchable border search-place="top" :columns="carSearchColumns" v-model="carSearchData"></tables>
    <Modal
      v-model="acc_dialog"
      title="同意维修申请操作"
      @on-ok="acc_confirm"
      @on-cancel="acc_cancel">
      <Form :model="accMindForm" label-position="right" :label-width="100">
        <FormItem label="申请编号">
          <Input v-model="accMindForm.acc_apply_no" disabled style="width: 300px;"></Input>
        </FormItem>
        <FormItem label="申请维修">
          <Input v-model="accMindForm.acc_apply_num" disabled style="width: 300px;"></Input>
        </FormItem>
        <FormItem label="接受维修">
          <InputNumber  v-model="accMindForm.acc_num" :precision="0" :max="accMindForm.acc_apply_num" :min="1" :step="1" placeholder="请输入同意维修的数目" style="width: 300px;"></InputNumber >
        </FormItem>
        <FormItem label="备注信息">
          <Input v-model="accMindForm.acc_apply_other" placeholder="请输入备注信息" style="width: 300px;"></Input>
        </FormItem>
      </Form>
    </Modal>
    <Modal v-model="refuse_dialog" @on-cancel="refuse_cancel" width="360">
      <p slot="header" style="color:#f60;">
        <Icon type="ios-information-circle"></Icon>
        <span>拒绝维修申请</span>
      </p>
      <div style="text-align:center">
        <p>您是否拒绝编号为{{ refuseMindForm.refuse_apply_no }}的维修申请？</p>
        <p style="margin-top: 14px;"><Input v-model="refuseMindForm.refuse_apply_other" placeholder="请输入备注信息" style="width: 300px;"></Input></p>
      </div>
      <div slot="footer">
        <Button type="error" size="large" long  @click="refuse_Confirm">拒绝申请</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import Tables from '_c/tables'
export default {
  name: 'maintain_shenpi',
  components: {
    Tables
  },
  data () {
    return {
      carSearchColumns: [
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
          title: '申请编号',
          key: 'apply_no',
          minWidth: 150,
          align: 'center',
          searchable: false,
          render: (h, params) => {
            return h('Tag', {
              props: {
                color: (params.row.apply_kind === '智能垃圾车') ? '#3e6ec7' : ((params.row.apply_kind === '智能快递车') ? '#c44474' : ((params.row.apply_kind === '智能清扫车') ? '#44b8c4' : '#ff9024')),
                type: 'dot'
              }
            }, params.row.apply_no)
          }
        },
        {
          title: '申请类别',
          key: 'apply_kind',
          width: 150,
          align: 'center'
        },
        {
          title: '申请单位',
          key: 'apply_comp',
          minWidth: 130,
          align: 'center'
        },
        {
          title: '申请数量',
          key: 'apply_num',
          minWidth: 80,
          align: 'center'
        },
        {
          title: '实际通过数量',
          key: 'acc_num',
          minWidth: 100,
          align: 'center'
        },
        {
          title: '审核状态',
          key: 'apply_status',
          minWidth: 130,
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
          title: '申请时间',
          key: 'apply_time',
          minWidth: 130,
          align: 'center'
        },
        {
          title: '审核备注',
          key: 'apply_other',
          minWidth: 130,
          align: 'center'
        },
        {
          title: '操作',
          key: 'action',
          minWidth: 130,
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
      carSearchData: [
        {
          apply_no: 'DINGA3132',
          apply_kind: '智能垃圾车',
          apply_comp: '大华公园华府',
          apply_num: 2,
          acc_num: 0,
          apply_time: '2019-05-18 13:33:51',
          apply_status: '未审核',
          apply_other: '暂无备注信息'
        },
        {
          apply_no: 'DINGD3552',
          apply_kind: '智能巡逻车',
          apply_comp: '阳寻万景广场御江',
          apply_num: 1,
          acc_num: 1,
          apply_time: '2019-05-19 15:53:51',
          apply_status: '审核通过',
          apply_other: '暂无备注信息'
        },
        {
          apply_no: 'DINGA6432',
          apply_kind: '智能垃圾车',
          apply_comp: '阳寻万景广场御江',
          apply_num: 1,
          acc_num: 1,
          apply_time: '2019-05-07 13:33:51',
          apply_status: '审核通过',
          apply_other: '暂无备注信息'
        },
        {
          apply_no: 'DINGA2451',
          apply_kind: '智能垃圾车',
          apply_comp: '大华公园华府',
          apply_num: 3,
          acc_num: 0,
          apply_time: '2019-05-01 18:34:51',
          apply_status: '已拒绝',
          apply_other: '暂无备注信息'
        },
        {
          apply_no: 'DINGB1691',
          apply_kind: '智能快递车',
          apply_comp: '大华公园华府',
          apply_num: 2,
          acc_num: 0,
          apply_time: '2019-05-11 09:32:11',
          apply_status: '未审核',
          apply_other: '暂无备注信息'
        },
        {
          apply_no: 'DINGA1352',
          apply_kind: '智能垃圾车',
          apply_comp: '武汉建成玉玺地质',
          apply_num: 1,
          acc_num: 1,
          apply_time: '2019-05-15 15:13:56',
          apply_status: '审核通过',
          apply_other: '暂无备注信息'
        },
        {
          apply_no: 'DINGD1526',
          apply_kind: '智能巡逻车',
          apply_comp: '武汉融创国际会务中心',
          apply_num: 2,
          acc_num: 1,
          apply_time: '2019-05-18 13:33:51',
          apply_status: '审核通过',
          apply_other: '暂无备注信息'
        },
        {
          apply_no: 'DINGD1122',
          apply_kind: '智能巡逻车',
          apply_comp: '联发国际度假区红韵天',
          apply_num: 2,
          acc_num: 0,
          apply_time: '2019-05-18 13:33:51',
          apply_status: '已拒绝',
          apply_other: '暂无备注信息'
        },
        {
          apply_no: 'DINGA3132',
          apply_kind: '智能垃圾车',
          apply_comp: '武汉融创国际会务中心',
          apply_num: 1,
          acc_num: 0,
          apply_time: '2019-03-18 16:33:51',
          apply_status: '未审核',
          apply_other: '暂无备注信息'
        },
        {
          apply_no: 'DINGB1132',
          apply_kind: '智能快递车',
          apply_comp: '武汉融创国际会务中心',
          apply_num: 1,
          acc_num: 0,
          apply_time: '2019-03-18 16:33:51',
          apply_status: '未审核',
          apply_other: '暂无备注信息'
        }
      ],
      // 同意维修相关
      acc_dialog: false,
      index: 0,
      accMindForm: {
        acc_apply_no: '',
        acc_apply_num: 0,
        acc_num: 1,
        acc_apply_other: ''
      },
      // 拒绝维修相关
      refuse_dialog: false,
      refuseMindForm: {
        refuse_apply_no: '',
        refuse_apply_num: 0,
        refuse_apply_other: ''
      }
    }
  },
  methods: {
    // 下方是维修审批表的信息及内容
    // 同意审批
    showAccDialog (index) {
      this.index = index
      this.acc_dialog = true
      this.accMindForm.acc_apply_no = this.carSearchData[index].apply_no
      this.accMindForm.acc_apply_num = this.carSearchData[index].apply_num
    },
    acc_confirm () {
      this.carSearchData[this.index].apply_status = '已审批'
      this.carSearchData[this.index].acc_num = this.accMindForm.acc_num
      this.carSearchData[this.index].apply_other = this.accMindForm.acc_apply_other
      this.$Message.success(`编号为:${this.carSearchData[this.index].apply_no}的申请审核成功！`)
      this.acc_cancel()
    },
    acc_cancel () {
      this.acc_dialog = false
      this.accMindForm.acc_apply_no = ''
      this.accMindForm.acc_apply_num = 0
      this.accMindForm.acc_num = 1
      this.accMindForm.acc_apply_other = ''
    },
    // 拒绝审批
    showRefuseDialog (index) {
      this.index = index
      this.refuse_dialog = true
      this.refuseMindForm.refuse_apply_no = this.carSearchData[index].apply_no
      this.refuseMindForm.refuse_apply_num = this.carSearchData[index].apply_num
    },
    refuse_Confirm () {
      this.carSearchData[this.index].apply_status = '已拒绝'
      this.carSearchData[this.index].apply_other = this.refuseMindForm.refuse_apply_other
      this.$Message.success(`编号为:${this.carSearchData[this.index].apply_no}的申请已拒绝！`)
      this.refuse_cancel()
    },
    refuse_cancel () {
      this.refuse_dialog = false
      this.refuseMindForm.refuse_apply_no = ''
      this.refuseMindForm.refuse_apply_num = 0
      this.refuseMindForm.refuse_apply_other = ''
    }
  }
}
</script>

<style scoped>

</style>
