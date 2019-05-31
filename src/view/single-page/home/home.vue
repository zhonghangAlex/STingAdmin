<template>
  <div>
    <Row :gutter="20">
      <i-col :xs="12" :md="8" :lg="4" v-for="(infor, i) in inforCardData" :key="`infor-${i}`" style="height: 120px;padding-bottom: 10px;">
        <infor-card shadow :color="infor.color" :icon="infor.icon" :icon-size="36">
          <count-to :end="infor.count" count-class="count-style"/>
          <p>{{ infor.title }}</p>
        </infor-card>
      </i-col>
    </Row>
    <Row :gutter="20" style="margin-top: 10px;">
      <i-col :md="24" :lg="8" style="margin-bottom: 20px;">
        <Card shadow>
          <chart-pie style="height: 600px;" :value="pieData" text="智能车辆运营比例"></chart-pie>
        </Card>
      </i-col>
      <!--<i-col :md="24" :lg="16" style="margin-bottom: 20px;">-->
        <!--<Card shadow>-->
          <!--<chart-bar style="height: 600px;" :value="barData" text="每周新增配额统计"/>-->
        <!--</Card>-->
      <!--</i-col>-->
      <i-col :md="24" :lg="16" style="margin-bottom: 20px;">
        <Card shadow>
          <calendar style="height: 600px;"></calendar>
        </Card>
      </i-col>
    </Row>
  </div>
</template>

<script>
import InforCard from '_c/info-card'
import CountTo from '_c/count-to'
import { ChartPie, ChartBar } from '_c/charts'
import Calendar from '_c/charts/calendar'
export default {
  name: 'home',
  components: {
    InforCard,
    CountTo,
    ChartPie,
    ChartBar,
    Calendar
  },
  data () {
    return {
      inforCardData: [
        { title: '客户数量', icon: 'logo-snapchat', count: 32, color: '#19be6b' },
        { title: '已下发配额', icon: 'md-options', count: 862, color: '#ff9900' },
        { title: '智能垃圾车在用', icon: 'md-trash', count: 322, color: '#ed3f14' },
        { title: '智能快递车在用', icon: 'md-archive', count: 107, color: '#E46CBB' },
        { title: '智能清洁车在用', icon: 'md-snow', count: 213, color: '#9A66E4' },
        { title: '智能巡逻车再用', icon: 'md-hand', count: 220, color: '#2d8cf0' }
      ],
      pieData: [
        { value: 107, name: '智能快递车' },
        { value: 322, name: '智能垃圾车' },
        { value: 213, name: '智能清洁车' },
        { value: 220, name: '智能巡逻车' }
      ]
    }
  },
  mounted () {
    //
  }
}
</script>

<style lang="less">
.count-style{
  font-size: 50px;
}
</style>
