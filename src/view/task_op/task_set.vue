<template>
  <div>
    <Row :gutter="14">
      <i-col span="24">
        <tables ref="taskSetTable" editable searchable border search-place="top" :columns="taskSetColumns" v-model="taskSetData"></tables>
      </i-col>
    </Row>
  </div>
</template>

<script>
import Tables from '_c/tables'
import { getTableData } from '@/api/data'
export default {
  name: 'task_set',
  components: {
    Tables
  },
  data () {
    return {
      // 表的信息及内容
      taskSetColumns: [
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
          title: '垃圾回收业务',
          key: 'trash_task',
          width: 250,
          align: 'center',
          render: (h, params) => {
            return h('i-switch', {
              props: {
                value: params.row.trash_task
              },
              on: {
                'on-change': (value) => {
                  if (!value) {
                    this.$Message.success(`${params.row.user_comp}的垃圾回收业务关闭成功！`)
                  } else {
                    this.$Message.success(`${params.row.user_comp}的垃圾回收业务开启成功！`)
                  }
                }
              }
            })
          }
        },
        {
          title: '快递投放业务',
          key: 'package_task',
          minWidth: 130,
          align: 'center',
          render: (h, params) => {
            return h('i-switch', {
              props: {
                value: params.row.package_task
              },
              on: {
                'on-change': (value) => {
                  if (!value) {
                    this.$Message.success(`${params.row.user_comp}的快递投放业务关闭成功！`)
                  } else {
                    this.$Message.success(`${params.row.user_comp}的快递投放业务开启成功！`)
                  }
                }
              }
            })
          }
        },
        {
          title: '智能安防业务',
          key: 'security_task',
          minWidth: 130,
          align: 'center',
          render: (h, params) => {
            return h('i-switch', {
              props: {
                value: params.row.security_task
              },
              on: {
                'on-change': (value) => {
                  if (!value) {
                    this.$Message.success(`${params.row.user_comp}的智能安防业务关闭成功！`)
                  } else {
                    this.$Message.success(`${params.row.user_comp}的智能安防业务开启成功！`)
                  }
                }
              }
            })
          }
        },
        {
          title: '道路清扫业务',
          key: 'sweep_task',
          minWidth: 130,
          align: 'center',
          render: (h, params) => {
            return h('i-switch', {
              props: {
                value: params.row.sweep_task
              },
              on: {
                'on-change': (value) => {
                  if (!value) {
                    this.$Message.success(`${params.row.user_comp}的道路清扫业务关闭成功！`)
                  } else {
                    this.$Message.success(`${params.row.user_comp}的道路清扫业务开启成功！`)
                  }
                }
              }
            })
          }
        },
        {
          title: '定期维护业务',
          key: 'maintain_task',
          minWidth: 200,
          align: 'center',
          render: (h, params) => {
            return h('i-switch', {
              props: {
                value: params.row.maintain_task
              },
              on: {
                'on-change': (value) => {
                  if (!value) {
                    this.$Message.success(`${params.row.user_comp}的定期维护业务关闭成功！`)
                  } else {
                    this.$Message.success(`${params.row.user_comp}的定期维护业务开启成功！`)
                  }
                }
              }
            })
          }
        },
        {
          title: '定制化数据分析',
          key: 'data_task',
          minWidth: 200,
          align: 'center',
          render: (h, params) => {
            return h('i-switch', {
              props: {
                value: params.row.data_task
              },
              on: {
                'on-change': (value) => {
                  if (!value) {
                    this.$Message.success(`${params.row.user_comp}的定制化数据分析业务关闭成功！`)
                  } else {
                    this.$Message.success(`${params.row.user_comp}的定制化数据分析业务开启成功！`)
                  }
                }
              }
            })
          }
        }
      ],
      taskSetData: [
        {
          user_comp: '武汉建成玉玺地质',
          trash_task: true,
          package_task: true,
          security_task: false,
          sweep_task: true,
          maintain_task: false,
          data_task: true
        },
        {
          user_comp: '武汉市快浪车辆有限公司',
          trash_task: true,
          package_task: true,
          security_task: true,
          sweep_task: true,
          maintain_task: true,
          data_task: true
        },
        {
          user_comp: '湖州速通立达快递',
          trash_task: true,
          package_task: false,
          security_task: true,
          sweep_task: true,
          maintain_task: true,
          data_task: true
        },
        {
          user_comp: '武汉市南国花园社区管理会',
          trash_task: true,
          package_task: false,
          security_task: true,
          sweep_task: false,
          maintain_task: true,
          data_task: true
        },
        {
          user_comp: '武汉市智刚车辆科技有限公司',
          trash_task: true,
          package_task: true,
          security_task: false,
          sweep_task: false,
          maintain_task: false,
          data_task: false
        },
        {
          user_comp: '武汉市松涛苑社区管理会',
          trash_task: true,
          package_task: true,
          security_task: true,
          sweep_task: true,
          maintain_task: false,
          data_task: false
        },
        {
          user_comp: '阳寻万景广场御江',
          trash_task: true,
          package_task: true,
          security_task: true,
          sweep_task: true,
          maintain_task: true,
          data_task: false
        },
        {
          user_comp: '武汉市瑞安大江苑会所',
          trash_task: true,
          package_task: true,
          security_task: false,
          sweep_task: true,
          maintain_task: false,
          data_task: true
        },
        {
          user_comp: '佳兆业广场天御',
          trash_task: true,
          package_task: false,
          security_task: true,
          sweep_task: true,
          maintain_task: true,
          data_task: true
        },
        {
          user_comp: '恒为世家国际旅游中心',
          trash_task: true,
          package_task: true,
          security_task: true,
          sweep_task: true,
          maintain_task: false,
          data_task: true
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
