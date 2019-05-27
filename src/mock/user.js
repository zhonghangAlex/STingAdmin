import Mock from 'mockjs'
import { doCustomTimes } from '@/libs/util'
const Random = Mock.Random

export const getMessageInit = () => {
  let unreadList = []
  doCustomTimes(3, () => {
    unreadList.push(Mock.mock({
      title: '索汀科技内部管理通知',
      create_time: '@date',
      msg_id: Random.increment(100)
    }))
  })
  let readedList = []
  doCustomTimes(4, () => {
    readedList.push(Mock.mock({
      title: '索汀科技内部管理通知',
      create_time: '@date',
      msg_id: Random.increment(100)
    }))
  })
  let trashList = []
  doCustomTimes(2, () => {
    trashList.push(Mock.mock({
      // title: Random.cword(10, 15),
      title: '索汀科技内部管理通知',
      create_time: '@date',
      msg_id: Random.increment(100)
    }))
  })
  return {
    unread: unreadList,
    readed: readedList,
    trash: trashList
  }
}

export const getContentByMsgId = () => {
  return `<divcourier new',="" monospace;font-weight:="" normal;font-size:="" 12px;line-height:="" 18px;white-space:="" pre;"="">
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;武汉索汀科技有限公司（以下简称索汀）计划成立于2019年10月，是一家定位于社区类可控环境下智能移动空间定制化服务的高科技企业。索汀拥有基于“1＋n”智能机器人底盘的核心技术，同时提供社区智能服务机器人定制研发和智慧社区综合运营两大服务，具备独立研发、产品供应、技术服务和平台运营能力，目前已研发出智能垃圾回收机器人、智能巡逻机器人、智能快递机器人、智能清扫机器人等产品，专注于为垃圾回收市场、道路清扫市场、快递投放市场、安防巡逻市场以及拓展市场提供高水平的智慧社区服务解决方案，从而构建高效可靠、低成本、可复制的智慧社区服务新模式，推动智慧社区服务和智慧社区的协同发展，实现企业价值。
              <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;企业愿景：社区功能型服务机器人技术领航者。
              <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;企业使命：专注智慧社区服务，助推智能科技生活 。
              <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;企业精神：乐观向上，积极主动，顺应潮流，勇于创新。 
              <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;企业理念：主动承担社会责任，营造智慧社区新气象。
            </p>
          </divcourier>`
}

export const hasRead = () => {
  return true
}

export const removeReaded = () => {
  return true
}

export const restoreTrash = () => {
  return true
}

export const messageCount = () => {
  return 3
}
