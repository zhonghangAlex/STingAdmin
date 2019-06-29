<template>
  <div>
    <tables ref="carSearchTable" editable searchable border search-place="top" :columns="carSearchColumns" v-model="carSearchData"></tables>
  </div>
</template>

<script>
import Tables from '_c/tables'
import trashPic from '@/assets/images/car/trash.png'
import packagePic from '@/assets/images/car/package.png'
import policePic from '@/assets/images/car/police.png'
export default {
  name: 'car_search',
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
          title: '车辆编号',
          key: 'car_no',
          minWidth: 150,
          align: 'center',
          searchable: false,
          render: (h, params) => {
            return h('Tag', {
              props: {
                color: (params.row.car_robot_kind === '智能垃圾车') ? '#3e6ec7' : ((params.row.car_robot_kind === '智能快递车') ? '#c44474' : ((params.row.car_robot_kind === '智能清扫车') ? '#44b8c4' : '#ff9024')),
                type: 'dot'
              }
            }, params.row.car_no)
          }
        },
        {
          title: '产品类别',
          key: 'car_robot_kind',
          width: 150,
          align: 'center'
        },
        {
          title: '所属单位',
          key: 'own_comp',
          minWidth: 130,
          align: 'center'
        },
        {
          title: '当前所在区域',
          key: 'now_area',
          minWidth: 130,
          align: 'center'
        },
        {
          title: '当前状态',
          key: 'now_status',
          minWidth: 130,
          align: 'center'
        },
        {
          title: '投入工作时间',
          key: 'start_work_time',
          minWidth: 130,
          align: 'center'
        },
        {
          title: '累计工作时长',
          key: 'total_time',
          minWidth: 130,
          align: 'center'
        },
        {
          title: '维护检修次数',
          key: 'mind_times',
          minWidth: 130,
          align: 'center'
        },
        {
          title: '车辆图片',
          key: 'car_pic',
          minWidth: 130,
          align: 'center',
          render: (h, params) => {
            return h('img', {
              attrs: {
                src: params.row.car_pic
              },
              style: {
                width: '100px'
              },
              props: {
                preview: '4',
                previewText: '图片预览'
              }
            })
          }
        }
      ],
      carSearchData: [
        {
          car_no: 'STA3132',
          car_robot_kind: '智能垃圾车',
          own_comp: '大华公园华府',
          now_area: '大华公园华府小区',
          now_status: '在线正常工作',
          start_work_time: '2019-05-18 13:33:51',
          total_time: 379,
          mind_times: 0,
          car_pic: trashPic
        },
        {
          car_no: 'STD3552',
          car_robot_kind: '智能巡逻车',
          own_comp: '阳寻万景广场御江',
          now_area: '万达新科园',
          now_status: '在线正常工作',
          start_work_time: '2019-05-19 15:53:51',
          total_time: 359,
          mind_times: 0,
          car_pic: policePic
        },
        {
          car_no: 'STA6432',
          car_robot_kind: '智能垃圾车',
          own_comp: '阳寻万景广场御江',
          now_area: '万达新科园',
          now_status: '在线正常工作',
          start_work_time: '2019-05-07 13:33:51',
          total_time: 1233,
          mind_times: 1,
          car_pic: trashPic
        },
        {
          car_no: 'STA2451',
          car_robot_kind: '智能垃圾车',
          own_comp: '大华公园华府',
          now_area: '大华公园华府小区',
          now_status: '在线正常工作',
          start_work_time: '2019-05-01 18:34:51',
          total_time: 1779,
          mind_times: 2,
          car_pic: packagePic
        },
        {
          car_no: 'STB1691',
          car_robot_kind: '智能快递车',
          own_comp: '大华公园华府',
          now_area: '大华公园华府小区',
          now_status: '在线正常工作',
          start_work_time: '2019-05-11 09:32:11',
          total_time: 863,
          mind_times: 0,
          car_pic: packagePic
        },
        {
          car_no: 'STA1352',
          car_robot_kind: '智能垃圾车',
          own_comp: '武汉建成玉玺地质',
          now_area: '御景名门高档小区',
          now_status: '在线正常工作',
          start_work_time: '2019-05-15 15:13:56',
          total_time: 379,
          mind_times: 0,
          car_pic: trashPic
        },
        {
          car_no: 'STD1526',
          car_robot_kind: '智能巡逻车',
          own_comp: '武汉融创观澜府',
          now_area: '南国花园',
          now_status: '在线正常工作',
          start_work_time: '2019-05-18 13:33:51',
          total_time: 379,
          mind_times: 0,
          car_pic: policePic
        },
        {
          car_no: 'STD1122',
          car_robot_kind: '智能巡逻车',
          own_comp: '联发国际度假区红韵天',
          now_area: '红韵天度假区中心',
          now_status: '在线正常工作',
          start_work_time: '2019-05-18 13:33:51',
          total_time: 379,
          mind_times: 0,
          car_pic: policePic
        },
        {
          car_no: 'STA3132',
          car_robot_kind: '智能垃圾车',
          own_comp: '武汉融创国际会务中心',
          now_area: '南国花园',
          now_status: '在线正常工作',
          start_work_time: '2019-03-18 16:33:51',
          total_time: 4379,
          mind_times: 2,
          car_pic: trashPic
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
