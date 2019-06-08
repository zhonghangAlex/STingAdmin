<template>
  <div>
    <Row :gutter="14">
      <i-col span="24">
        <tables ref="userTable" editable searchable border search-place="top" :columns="userColumns" v-model="userData"></tables>
      </i-col>
    </Row>
    <Modal
      v-model="details_dialog"
      title="公司路面清扫业务详情"
      @on-ok="details_confirm"
      @on-cancel="details_dialog = false">
      <Form :model="detailsPiForm" label-position="right" :label-width="100">
        <FormItem label="单位编号">
          <Input v-model="detailsPiForm.details_user_no" disabled style="width: 300px;"></Input>
        </FormItem>
        <FormItem label="单位名称">
          <Input v-model="detailsPiForm.details_user_comp" disabled style="width: 300px;"></Input>
        </FormItem>
        <FormItem label="单位状态">
          <Input v-model="detailsPiForm.details_user_status" disabled style="width: 300px;"></Input>
        </FormItem>
        <FormItem label="备注信息">
          <Input v-model="detailsPiForm.details_user_other" disabled style="width: 300px;"></Input>
        </FormItem>
        <FormItem label="最后操作时间">
          <Input v-model="detailsPiForm.details_user_op_time" disabled style="width: 300px;"></Input>
        </FormItem>
        <FormItem label="营运车辆数">
          <chart-pie style="height: 200px; width: 300px;" :value="pieData" orient="horizontal" left="center"></chart-pie>
        </FormItem>
      </Form>
    </Modal>
    <Modal v-model="Delete_dialog" @on-cancel="Delete_cancel" width="360">
      <p slot="header" style="color:#f60;">
        <Icon type="ios-information-circle"></Icon>
        <span>信息删除</span>
      </p>
      <div style="text-align:center">
        <p>您是否删除编号为{{ DeletePiForm.Delete_user_no }}的公司信息？</p>
      </div>
      <div slot="footer">
        <Button type="error" size="large" long  @click="Delete_Confirm">删除信息</Button>
      </div>
    </Modal>
    <Modal v-model="Change_dialog" @on-cancel="Change_cancel" width="360" title="状态变更">
      <div style="text-align:center">
        <p>您是否变更编号为{{ ChangePiForm.Change_user_no }}的公司的使用状态？</p>
      </div>
      <div slot="footer">
        <Button type="primary" size="large" long  @click="Change_Confirm">确认变更</Button>
      </div>
    </Modal>
    <Modal v-model="Reset_dialog" @on-cancel="Reset_cancel" width="360" title="重置密码">
      <div style="text-align:center">
        <p>您是否重置编号为{{ ResetPiForm.Reset_user_no }}的公司的账号密码？</p>
      </div>
      <div slot="footer">
        <Button type="primary" size="large" long  @click="Reset_Confirm">确认重置</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import Tables from '_c/tables'
import { getTableData } from '@/api/data'
import { ChartPie } from '_c/charts'
export default {
  name: 'userno_mag',
  components: {
    Tables,
    ChartPie
  },
  data () {
    return {
      // 表的信息及内容
      userColumns: [
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
          title: '使用单位账号',
          key: 'user_no',
          minWidth: 150,
          align: 'center',
          searchable: false
        },
        {
          title: '使用单位名称',
          key: 'user_comp',
          minWidth: 200,
          align: 'center'
        },
        {
          title: '操作',
          key: 'action',
          minWidth: 200,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small',
                  disabled: true
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.showdetailsDialog(params.index)
                  }
                }
              }, '编辑'),
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small',
                  disabled: !!(params.row.user_status === '禁止使用')
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.showChangeDialog(params.index)
                  }
                }
              }, (params.row.user_status === '正常使用') ? '暂停' : '启用'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.showDeleteDialog(params.index)
                  }
                }
              }, '删除'),
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.showResetDialog(params.index)
                  }
                }
              }, '重置密码'),
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                },
                on: {
                  click: () => {
                    this.showdetailsDialog(params.index)
                  }
                }
              }, '查看详情')
            ])
          }
        },
        {
          title: '状态',
          key: 'user_status',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('Tag', {
              props: {
                color: (params.row.user_status === '暂停使用') ? '#ff9900' : ((params.row.user_status === '禁止使用') ? '#ed4014' : '#19be6b'),
                type: 'dot'
              }
            }, params.row.user_status)
          }
        },
        {
          title: '操作备注',
          key: 'user_other',
          width: 200,
          align: 'center'
        },
        {
          title: '最后操作时间',
          key: 'user_op_time',
          width: 200,
          align: 'center'
        }
      ],
      userData: [
        {
          user_no: 'USER12301',
          user_status: '暂停使用',
          user_kind: '公司申报',
          user_comp: '武汉市快浪车辆有限公司',
          user_op_time: '2019-05-21 10:21:11',
          user_other: '无备注信息'
        },
        {
          user_no: 'USER12971',
          user_status: '禁止使用',
          user_kind: '公司申报',
          user_comp: '湖州德清立通（韵达）快递',
          user_op_time: '2019-05-21 13:19:11',
          user_other: '重置密码'
        },
        {
          user_no: 'USER19124',
          user_status: '暂停使用',
          user_kind: '个体申报',
          user_comp: '武汉市南国花园社区管理会',
          user_op_time: '2019-05-01 16:53:11',
          user_other: '公司信息变更'
        },
        {
          user_no: 'USER11351',
          user_status: '暂停使用',
          user_kind: '公司申报',
          user_comp: '武汉市快浪车辆有限公司',
          user_op_time: '2019-05-21 19:21:11',
          user_other: '无备注信息'
        },
        {
          user_no: 'USER16361',
          user_status: '正常使用',
          user_kind: '公司申报',
          user_comp: '武汉市智刚车辆科技有限公司',
          user_op_time: '2019-05-25 10:11:11',
          user_other: '无备注信息'
        },
        {
          user_no: 'USER12307',
          user_status: '正常使用',
          user_kind: '公司申报',
          user_comp: '武汉市快浪车辆有限公司',
          user_op_time: '2019-03-12 09:11:11',
          user_other: '无备注信息'
        },
        {
          user_no: 'USER13663',
          user_status: '暂停使用',
          user_kind: '个体申报',
          user_comp: '武汉市松涛苑社区管理会',
          user_op_time: '2019-05-28 22:17:21',
          user_other: '无备注信息'
        },
        {
          user_no: 'USER12349',
          user_status: '正常使用',
          user_kind: '公司申报',
          user_comp: '武汉市神龙汽车制造有限公司',
          user_op_time: '2019-05-29 12:11:11',
          user_other: '无备注信息'
        },
        {
          user_no: 'USER12501',
          user_status: '正常使用',
          user_kind: '公司申报',
          user_comp: '武汉市快浪车辆有限公司',
          user_op_time: '2019-03-12 09:11:11',
          user_other: '无备注信息'
        },
        {
          user_no: 'USER22300',
          user_status: '暂停使用',
          user_kind: '个体申报',
          user_comp: '武汉市君华苑物业管理中心',
          user_op_time: '2019-05-28 22:17:21',
          user_other: '无备注信息'
        }
      ],
      // 同意配额相关
      details_dialog: false,
      index: 0,
      detailsPiForm: {
        details_user_no: '',
        details_user_comp: '',
        details_user_status: '',
        details_user_other: '',
        details_user_op_time: ''
      },
      // 删除信息相关
      Delete_dialog: false,
      DeletePiForm: {
        Delete_user_no: ''
      },
      // 变更信息相关
      Change_dialog: false,
      ChangePiForm: {
        Change_user_no: ''
      },
      // 重置密码相关
      Reset_dialog: false,
      ResetPiForm: {
        Reset_user_no: ''
      },
      // 车辆数量
      pieData: [
        { value: 13, name: '智能清洁车' },
        { value: 17, name: '其他智能车' }
      ]
    }
  },
  methods: {
    // 详情相关
    showdetailsDialog (index) {
      this.index = index
      this.details_dialog = true
      this.detailsPiForm.details_user_no = this.userData[index].user_no
      this.detailsPiForm.details_user_comp = this.userData[index].user_comp
      this.detailsPiForm.details_user_status = this.userData[index].user_status
      this.detailsPiForm.details_user_other = this.userData[index].user_other
      this.detailsPiForm.details_user_op_time = this.userData[index].user_op_time
    },
    details_confirm () {
      this.details_dialog = false
    },
    // 删除信息
    showDeleteDialog (index) {
      this.index = index
      this.Delete_dialog = true
      this.DeletePiForm.Delete_user_no = this.userData[index].user_no
    },
    Delete_Confirm () {
      this.userData[this.index].user_status = '禁止使用'
      console.log('此处为前端实现会报错误，需要使用ajax异步请求后台')
      try {
        this.userData.splice(this.index, 1)
      } catch (e) {
        // console.log(e)
      }
      this.$Message.success(`编号为:${this.userData[this.index].user_no}的公司信息已删除！`)
      this.Delete_cancel()
    },
    Delete_cancel () {
      this.Delete_dialog = false
      this.DeletePiForm.Delete_user_no = ''
    },
    // 变更信息
    showChangeDialog (index) {
      this.index = index
      this.Change_dialog = true
      this.ChangePiForm.Change_user_no = this.userData[index].user_no
    },
    Change_Confirm () {
      this.userData[this.index].user_status = (this.userData[this.index].user_status === '正常使用') ? '暂停使用' : '正常使用'
      this.$Message.success(`编号为:${this.userData[this.index].user_no}的公司信息已变更！`)
      this.Change_cancel()
    },
    Change_cancel () {
      this.Change_dialog = false
      this.ChangePiForm.Change_user_no = ''
    },
    // 重置密码
    showResetDialog (index) {
      this.index = index
      this.Reset_dialog = true
      this.ResetPiForm.Reset_user_no = this.userData[index].user_no
    },
    Reset_Confirm () {
      this.$Message.success(`编号为:${this.userData[this.index].user_no}的公司用户密码已重置！`)
      this.Reset_cancel()
    },
    Reset_cancel () {
      this.Reset_dialog = false
      this.ResetPiForm.Reset_user_no = ''
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
  .Delete_cell {
    color: #ed4014
  }
  .details_cell {
    color: #19be6b
  }
</style>
