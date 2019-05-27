<template>
  <div>
    <Row :gutter="14" >
      <i-col span="24">
        <Card :title="$route.name">
          <Tabs>
            <TabPane v-for="(item, index) in car_data" :label="item.label" :icon="item.icon" :key="`item-${index}`">
              <Row :gutter="20">
                <i-col v-for="(card_item, card_index) in item.details" :xs="12" :md="8" :lg="6" :key="`card_item-${card_index}`" style="height: 200px;">
                  <infor-card color="#3e6ec7" :icon="card_item.icon" :icon-size="46">
                    <count-to :end="card_item.num" count-class="count-style">
                      <span v-if="card_index === 3" slot="right">&nbsp;%</span>
                    </count-to>
                    <p>{{ card_item.label }}</p>
                    <Progress style="width: 80%;" v-if="card_index === 3" :percent="card_item.num" status="active" />
                  </infor-card>
                </i-col>
              </Row>
            </TabPane>
          </Tabs>
        </Card>
      </i-col>
    </Row>
    <Row :gutter="14" style="margin-top: 14px;">
      <i-col span="18">
        <Card>
          <line-use style="height: 400px;"></line-use>
        </Card>
      </i-col>
      <i-col span="6">
        <Card>
          <p slot="title">车辆维修排名</p>
          <div style="height: 350px;">
            <Table height="350" stripe :columns="mind_columns" :data="mind_data"></Table>
          </div>
        </Card>
      </i-col>
    </Row>
  </div>
</template>

<script>
import InforCard from '_c/info-card'
import CountTo from '_c/count-to'
import lineUse from '_c/charts/lineUse'

export default {
  name: 'car_use_data',
  components: {
    InforCard,
    CountTo,
    lineUse
  },
  data () {
    return {
      car_data: [
        {
          label: '垃圾车',
          icon: 'md-trash',
          details: [
            { num: 322, label: '车辆总数', icon: 'ios-keypad' },
            { num: 280, label: '在线车辆', icon: 'md-done-all' },
            { num: 42, label: '维修车辆', icon: 'md-construct' },
            { num: 86.97, label: '车辆使用率', icon: 'md-star-half' }
          ]
        },
        {
          label: '快递车',
          icon: 'md-archive',
          details: [
            { num: 107, label: '车辆总数', icon: 'ios-keypad' },
            { num: 67, label: '在线车辆', icon: 'md-done-all' },
            { num: 40, label: '维修车辆', icon: 'md-construct' },
            { num: 62.62, label: '车辆使用率', icon: 'md-star-half' }
          ]
        },
        {
          label: '清扫车',
          icon: 'md-snow',
          details: [
            { num: 213, label: '车辆总数', icon: 'ios-keypad' },
            { num: 156, label: '在线车辆', icon: 'md-done-all' },
            { num: 57, label: '维修车辆', icon: 'md-construct' },
            { num: 73.24, label: '车辆使用率', icon: 'md-star-half' }
          ]
        }
      ],

      mind_columns: [
        {
          title: '序号',
          key: 'index',
          width: '60px',
          align: 'center',
          render: (h, params) => {
            return h('div', {
              style: {
                backgroundColor: (params.index <= 2) ? '#3e6ec7' : '#808080',
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
          title: '公司名称',
          key: 'comp_name',
          align: 'center'
        },
        {
          title: '维修数目',
          key: 'mind_num',
          width: '70px',
          align: 'center',
          sortable: true,
          sortType: 'desc'
        }
      ],

      mind_data: [
        {
          comp_name: '阳逻万达广场御江（万达旗下）',
          mind_num: 37
        },
        {
          comp_name: '大华公园华府',
          mind_num: 30
        },
        {
          comp_name: '地铁盛观尚城',
          mind_num: 26
        },
        {
          comp_name: '联发国际度假区红韵天',
          mind_num: 24
        },
        {
          comp_name: '恒大金碧天下',
          mind_num: 20
        },
        {
          comp_name: '翡翠中心润玺',
          mind_num: 18
        },
        {
          comp_name: '佳兆业广场天御',
          mind_num: 15
        },
        {
          comp_name: '武汉融创观澜府',
          mind_num: 15
        },
        {
          comp_name: '武地建发玺院地产',
          mind_num: 12
        }
      ]
    }
  }
}
</script>

<style lang="less">
.count-style {
  font-size: 50px;
}
</style>
