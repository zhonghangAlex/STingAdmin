<template>
  <div>
    <Row :gutter="14" >
      <i-col span="24">
        <Card :title="$route.name">
        </Card>
      </i-col>
    </Row>
  </div>
</template>

<script>
export default {
  name: 'car_monitor_data',
  data () {
    return {
      data: []
    }
  },
  mounted () {
  }
}
</script>

<style scoped>

</style>
