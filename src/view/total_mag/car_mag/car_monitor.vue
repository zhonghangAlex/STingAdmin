<template>
  <div>
    <Row :gutter="14" span="24" >
      <i-col span="6">
        <Card title="机器人数量比例" style="height: 388px;">
          <robot-rate style="height: 300px;"></robot-rate>
        </Card>
        <Card title="客户单位使用率排名（%）" style="height: 388px; margin-top: 14px;">
          <cus-rate style="height: 300px;"></cus-rate>
        </Card>
      </i-col>
      <i-col span="18" >
        <Card :title="$route.name" style="height: 790px;">
          <i-col span="24">
            <div id="allmap" style="height: 700px; width: 100%; position: relative;"></div>
          </i-col>
        </Card>
      </i-col>
    </Row>
  </div>
</template>

<script>
import BMap from 'BMap'
import robotRate from '_c/charts/robotRate'
import cusRate from '_c/charts/cusRate'
import trashLogo from '@/assets/images/net_logo/net_logo_blue.png'
import sweepLogo from '@/assets/images/net_logo/net_logo_green.png'
import packageLogo from '@/assets/images/net_logo/net_logo_red.png'
import noUseLogo from '@/assets/images/net_logo/net_logo_gray.png'
export default {
  name: 'car_monitor',
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
      markerClusterer: {}
    }
  },
  components: {
    robotRate,
    cusRate
  },
  methods: {
    // 添加图例
    addMarker (point) {
      let use_img = [
        trashLogo,
        sweepLogo,
        packageLogo,
        noUseLogo
      ]
      let myIcon = new BMap.Icon(use_img[parseInt(Math.random() * 3.5)], new BMap.Size(55, 55), {
        offset: new BMap.Size(10, 55), // 指定定位位置
        imageOffset: new BMap.Size(0, 0) // 设置图片偏移
      })
      this.markers.push(new BMap.Marker(point, { icon: myIcon }))
      // map.addOverlay(markers)
    }
  },
  mounted () {
    // 百度地图API初始化
    let map = new BMap.Map('allmap')
    map.centerAndZoom(new BMap.Point(114.353903, 30.522285), 18)
    map.addControl(new BMap.MapTypeControl({
      mapTypes: [
        BMAP_NORMAL_MAP,
        BMAP_HYBRID_MAP
      ] })
    )
    map.setCurrentCity('武汉')
    map.enableScrollWheelZoom(true)

    // 创建地图标注
    for (let i = 0; i < this.point_arr.length; i++) {
      this.addMarker(this.point_arr[i])
    }
    this.markerClusterer = new BMapLib.MarkerClusterer(map, { markers: this.markers })

    // 定义左下角图例控件类
    function ZoomControl () {
      this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT
      this.defaultOffset = new BMap.Size(20, 520)
    }
    ZoomControl.prototype = new BMap.Control()
    ZoomControl.prototype.initialize = function (map) {
      // 创建一个DOM元素
      let div = document.createElement('div')
      // 添加文字说明
      let img_trash = '<div style="margin-bottom: 5px;"><span style="width: 13px; height: 10px; border-radius: 3px; background-color: #3e6ec7; display: inline-block;"></span><span style="display: inline-block; float: right;">在线垃圾车</span><br></div>'
      let img_package = '<div style="margin-bottom: 5px;"><span style="width: 13px; height: 10px; border-radius: 3px; background-color: #c44474; display: inline-block;"></span><span style="display: inline-block; float: right;">在线快递车</span><br></div>'
      let img_sweep = '<div style="margin-bottom: 5px;"><span style="width: 13px; height: 10px; border-radius: 3px; background-color: #44b8c4; display: inline-block;"></span><span style="display: inline-block; float: right;">在线快递车</span><br></div>'
      let img_nouse = '<div style="margin-bottom: 5px;"><span style="width: 13px; height: 10px; border-radius: 3px; background-color: #7c818b; display: inline-block;"></span><span style="display: inline-block; float: right;">未连接车辆</span><br></div>'
      let img_stop = '<div style=""><span style="width: 13px; height: 10px; border-radius: 3px; background-color: #ff9024; display: inline-block;"></span><span style="display: inline-block; float: right;">停车区</span></div>'
      div.innerHTML = img_trash + img_package + img_sweep + img_nouse + img_stop
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
        map.setCenter(new BMap.Point(114.353903, 30.522285))
      }
      loadCount = loadCount + 1
    })
  }
}
</script>

<style scoped>

</style>
