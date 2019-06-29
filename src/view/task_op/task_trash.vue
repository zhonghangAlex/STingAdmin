<template>
  <div>
    <Row :gutter="14" span="24" >
      <i-col span="24" >
        <Card :title="$route.name" style="height: 790px;">
          <Button type="primary" href="#" slot="extra" @click.native="open_drawer" size="small" style="padding: 4px 10px;">
            <Icon type="ios-analytics" :size="14"></Icon>
            数据统计
          </Button>
          <i-col span="24">
            <div id="allmap_trash" style="height: 700px; width: 100%; position: relative;"></div>
          </i-col>
          <drag-drawer v-model="drawer_vis"
                       :inner="true"
                       :transfer="false"
                       :width.sync="width_dia"
                       :min-width="1080"
                       placement="left"
                       :draggable="true"
                       :scrollable="true">
            <div slot="header">
              <Icon type="md-aperture" :size="18"></Icon>
              <b>垃圾回收转运业务数据统计</b>
            </div>
            <Row :gutter="14" span="24" >
              <i-col :md="24" :lg="12">
                <Card v-if="drawer_vis" title="各类别垃圾回收量（kg）" style="height: 340px;">
                  <!--<div slot="extra">-->
                    <!--<DatePicker :value="trashTotalDate" format="yyyy/MM/dd" type="daterange" placement="bottom-end" placeholder="请选择日期区间" style="width: 200px; margin-top: -6px;"></DatePicker>-->
                  <!--</div>-->
                  <trash-kind style="height: 250px;"></trash-kind>
                </Card>
              </i-col>
              <i-col :md="24" :lg="12">
                <Card v-if="drawer_vis" title="各业务单位垃圾回收总量排名（kg）" style="height: 340px;">
                  <div slot="extra">
                    <DatePicker :value="trashCompRateDate" format="yyyy/MM/dd" type="daterange" placement="bottom-end" placeholder="请选择日期区间" style="width: 200px; margin-top: -6px;"></DatePicker>
                  </div>
                  <trash-comp-rate style="height: 250px;"></trash-comp-rate>
                </Card>
              </i-col>
              <i-col :md="24" :lg="24">
                <Card v-if="drawer_vis" title="各业务单位具体垃圾回收数据" style="height: 340px; margin-top: 14px;">
                  <div slot="extra">
                    <Button type="primary" size="small" style="padding: 4px 10px; margin-top: -6px;">
                      企业选择
                    </Button>
                    <Select v-model="compList[0].label" style="width: 180px; margin-left: 10px; margin-top: -5px;">
                      <Option v-for="item in compList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                  </div>
                  <i-col :md="24" :lg="12">
                    <trash-detail-kind style="height: 250px;"></trash-detail-kind>
                  </i-col>
                  <i-col :md="24" :lg="12">
                    <chart-pie style="height: 250px;" :value="pieTrashData" orient="horizontal" left="center"></chart-pie>
                  </i-col>
                </Card>
              </i-col>
            </Row>
          </drag-drawer>
        </Card>
      </i-col>
    </Row>
  </div>
</template>

<script>
import BMap from 'BMap'
import trashKind from '_c/charts/trashKind'
import trashCompRate from '_c/charts/trashCompRate'
import trashDetail from '_c/charts/trashDetailKind'
import { ChartPie } from '_c/charts'
import trashLogo from '@/assets/images/net_logo/net_logo_blue.png'
import sweepLogo from '@/assets/images/net_logo/net_logo_green.png'
import packageLogo from '@/assets/images/net_logo/net_logo_red.png'
import guardLogo from '@/assets/images/net_logo/net_logo_orange.png'
import noUseLogo from '@/assets/images/net_logo/net_logo_gray.png'
import DragDrawer from '_c/drag-drawer'
import Tables from '_c/tables'
import TrashDetailKind from '../../components/charts/trashDetailKind'
export default {
  name: 'task_trash',
  data () {
    return {
      // mock坐标点
      point_arr: [
        new BMap.Point(114.353903, 30.522285),
        new BMap.Point(114.354922, 30.522791),
        new BMap.Point(114.353709, 30.522985),
        new BMap.Point(114.355174, 30.521889),
        new BMap.Point(114.353817, 30.520971),
        new BMap.Point(114.355228, 30.520987),
        new BMap.Point(114.353647, 30.52255),
        new BMap.Point(114.354365, 30.521578),
        new BMap.Point(114.354527, 30.521757),
        new BMap.Point(114.354221, 30.523289),
        new BMap.Point(114.354347, 30.521158),
        new BMap.Point(114.350107, 30.522775),
        new BMap.Point(114.350107, 30.522775),
        new BMap.Point(114.349299, 30.522612),
        new BMap.Point(114.351122, 30.523172),
        new BMap.Point(114.350278, 30.522316),
        new BMap.Point(114.349667, 30.523701),
        new BMap.Point(114.349685, 30.523483),
        new BMap.Point(114.352245, 30.519517),
        new BMap.Point(114.353817, 30.519478),
        new BMap.Point(114.353242, 30.518855),
        new BMap.Point(114.354653, 30.519081),
        new BMap.Point(114.354707, 30.518194),
        new BMap.Point(114.352461, 30.517362),
        new BMap.Point(114.354446, 30.518451),
        new BMap.Point(114.354419, 30.523328),
        new BMap.Point(114.354374, 30.522713),
        new BMap.Point(114.354563, 30.522231),
        new BMap.Point(114.353467, 30.521399),
        new BMap.Point(114.352847, 30.522954),
        new BMap.Point(114.355771, 30.522499),
        new BMap.Point(114.35591, 30.521387)
      ],
      // 坐标点存储
      markers: [],
      // 坐标点聚合定义
      markerClusterer: {},
      // 抽屉控制
      drawer_vis: false,
      width_dia: 1080,
      // 选择排名时间
      trashCompRateDate: ['2019-06-01', '2019-06-10'],
      // trashTotalDate: ['2019-06-01', '2019-06-10'],
      // 公司信息
      compList: [
        {
          value: '建发玺院',
          label: '建发玺院'
        },
        {
          value: '佳兆天御',
          label: '佳兆天御'
        },
        {
          value: '武汉融创',
          label: '武汉融创'
        },
        {
          value: '翡翠中心',
          label: '翡翠中心'
        },
        {
          value: '恒为旅行',
          label: '恒为旅行'
        },
        {
          value: '红韵天',
          label: '红韵天'
        },
        {
          value: '地铁尚城',
          label: '地铁尚城'
        },
        {
          value: '大华华府',
          label: '大华华府'
        },
        {
          value: '百江玉玺',
          label: '百江玉玺'
        }
      ],
      // 公司类别饼状图
      pieTrashData: [
        { value: 207, name: '废纸' },
        { value: 322, name: '玻璃' },
        { value: 613, name: '金属' },
        { value: 220, name: '塑料' },
        { value: 120, name: '布料' }
      ]
    }
  },
  components: {
    TrashDetailKind,
    trashKind,
    trashCompRate,
    ChartPie,
    trashDetail,
    DragDrawer,
    Tables
  },
  methods: {
    // 添加图例
    addMarker (point) {
      let use_img = [
        trashLogo,
        sweepLogo,
        packageLogo,
        guardLogo,
        noUseLogo
      ]
      let myIcon = new BMap.Icon(use_img[parseInt(Math.random() * 1)], new BMap.Size(55, 55), {
        offset: new BMap.Size(10, 55), // 指定定位位置
        imageOffset: new BMap.Size(0, 0) // 设置图片偏移
      })
      this.markers.push(new BMap.Marker(point, { icon: myIcon }))
      // map.addOverlay(markers)
    },
    // 抽屉操作
    open_drawer () {
      this.drawer_vis = true
    }
  },
  mounted () {
    // 百度地图API初始化
    let map = new BMap.Map('allmap_trash')
    map.centerAndZoom(new BMap.Point(114.358393, 30.518778), 18)
    map.addControl(new BMap.MapTypeControl({
      mapTypes: [
        BMAP_NORMAL_MAP,
        BMAP_HYBRID_MAP
      ] })
    )
    map.setCurrentCity('武汉')
    map.enableScrollWheelZoom(true)

    // 指定创建地图标注
    for (let i = 0; i < this.point_arr.length; i++) {
      this.addMarker(this.point_arr[i])
    }
    // 随机创建地图标注
    for (let i = 0; i < 60; i++) {
      this.addMarker(new BMap.Point(114.352006 + Math.random() * 0.014364, 30.520318 - Math.random() * 0.003531))
    }
    this.markerClusterer = new BMapLib.MarkerClusterer(map, { markers: this.markers })

    // 定义左下角图例控件类
    function ZoomControl () {
      this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT
      this.defaultOffset = new BMap.Size(20, 590)
    }
    ZoomControl.prototype = new BMap.Control()
    ZoomControl.prototype.initialize = function (map) {
      // 创建一个DOM元素
      let div = document.createElement('div')
      // 添加文字说明
      let img_trash = '<div style="margin-bottom: 5px;"><span style="width: 13px; height: 10px; border-radius: 3px; background-color: #3e6ec7; display: inline-block;"></span><span style="display: inline-block; float: right;">在线垃圾车</span><br></div>'
      div.innerHTML = img_trash
      // 设置样式
      div.style.cursor = 'pointer'
      div.style.width = '120px'
      div.style.backgroundColor = '#ffffff'
      div.style.borderRadius = '6px'
      div.style.padding = '10px'
      div.style.color = '#444444'
      // 添加DOM元素到地图中
      map.getContainer().appendChild(div)
      // 将DOM元素返回
      return div
    }
    let myZoomCtrl = new ZoomControl()
    map.addControl(myZoomCtrl)

    // 解决坐标偏移的问题
    let loadCount = 1
    map.addEventListener('tilesloaded', function () {
      if (loadCount === 1) {
        map.setCenter(new BMap.Point(114.358393, 30.518778))
      }
      loadCount = loadCount + 1
    })
  }
}
</script>

<style scoped>

</style>
