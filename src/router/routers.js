import Main from '@/components/main'
import parentView from '@/components/parent-view'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 *  href: 需要跳转的网页
 * }
 */

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: true,
          title: '首页',
          notCache: true,
          icon: 'md-home'
        },
        component: () => import('@/view/single-page/home')
      }
    ]
  },
  {
    path: '/total_mag',
    name: '综合管理',
    meta: {
      icon: 'logo-buffer',
      title: '综合管理'
    },
    component: Main,
    children: [
      {
        path: 'peie_mag',
        name: '配额管理',
        meta: {
          access: ['suoting'],
          icon: 'md-options',
          showAlways: true,
          title: '配额管理'
        },
        component: parentView,
        children: [
          {
            path: 'shen_pi',
            name: '配额审批',
            meta: {
              icon: 'md-radio-button-on',
              title: '配额审批'
            },
            component: () => import('@/view/total_mag/peie_mag/shenpi.vue')
          },
          {
            path: 'use_mag',
            name: '配额使用管理',
            meta: {
              icon: 'md-radio-button-on',
              title: '配额使用管理'
            },
            component: () => import('@/view/total_mag/peie_mag/use_mag.vue')
          }
        ]
      },
      {
        path: 'table_mag',
        name: '报表中心',
        meta: {
          access: ['suoting'],
          icon: 'md-stats',
          showAlways: true,
          title: '报表中心'
        },
        component: parentView,
        children: [
          {
            path: 'car_use_data',
            name: '车辆使用统计',
            meta: {
              icon: 'md-radio-button-on',
              title: '车辆使用统计'
            },
            component: () => import('@/view/total_mag/table_mag/car_use_data.vue')
          },
          {
            path: 'product_maintain_data',
            name: '产品维护统计',
            meta: {
              icon: 'md-radio-button-on',
              title: '产品维护统计'
            },
            component: () => import('@/view/total_mag/table_mag/product_maintain_data.vue')
          }
        ]
      },
      {
        path: 'car_mag',
        name: '车辆管理',
        meta: {
          access: ['suoting'],
          icon: 'md-car',
          showAlways: true,
          title: '车辆管理'
        },
        component: parentView,
        children: [
          {
            path: 'car_monitor',
            name: '车辆监控',
            meta: {
              icon: 'md-radio-button-on',
              title: '车辆监控'
            },
            component: () => import('@/view/total_mag/car_mag/car_monitor.vue')
          },
          {
            path: 'car_search',
            name: '车辆查询',
            meta: {
              icon: 'md-radio-button-on',
              title: '车辆查询'
            },
            component: () => import('@/view/total_mag/car_mag/car_search.vue')
          }
        ]
      },
      {
        path: 'maintain_mag',
        name: '维护管理',
        meta: {
          access: ['suoting'],
          icon: 'ios-construct',
          showAlways: true,
          title: '维护管理'
        },
        component: parentView,
        children: [
          {
            path: 'maintain_shenpi',
            name: '维护审批',
            meta: {
              icon: 'md-radio-button-on',
              title: '维护审批'
            },
            component: () => import('@/view/total_mag/maintain_mag/maintain_shenpi.vue')
          }
        ]
      }
    ]
  },
  {
    path: '/task_op',
    name: '业务操作',
    meta: {
      icon: 'ios-stats',
      title: '业务操作'
    },
    component: Main,
    children: [
      {
        path: 'task_set',
        name: '业务设置',
        meta: {
          icon: 'ios-settings',
          title: '业务设置'
        },
        component: () => import('@/view/task_op/task_set.vue')
      },
      {
        path: 'task_trash',
        name: '垃圾回收业务',
        meta: {
          icon: 'md-trash',
          title: '垃圾回收业务'
        },
        component: () => import('@/view/task_op/task_trash.vue')
      },
      {
        path: 'task_package',
        name: '快递投放业务',
        meta: {
          icon: 'md-archive',
          title: '快递投放业务'
        },
        component: () => import('@/view/task_op/task_package.vue')
      },
      {
        path: 'task_sweep',
        name: '社区清扫业务',
        meta: {
          icon: 'md-snow',
          title: '社区清扫业务'
        },
        component: () => import('@/view/task_op/task_sweep.vue')
      },
      {
        path: 'task_guard',
        name: '社区巡逻业务',
        meta: {
          icon: 'md-hand',
          title: '社区巡逻业务'
        },
        component: () => import('@/view/task_op/task_guard.vue')
      }
    ]
  },
  {
    path: '/user_mag',
    name: '用户管理',
    meta: {
      icon: 'logo-snapchat',
      title: '用户管理'
    },
    component: Main,
    children: [
      {
        path: 'trash_user_mag',
        name: '垃圾回收业务用户管理',
        meta: {
          access: ['suoting'],
          icon: 'md-trash',
          showAlways: true,
          title: '垃圾回收业务用户管理'
        },
        component: parentView,
        children: [
          {
            path: 'trash_userno_mag',
            name: '垃圾投放用户账号管理',
            meta: {
              icon: 'md-radio-button-on',
              title: '用户账号管理'
            },
            component: () => import('@/view/user_mag/trash_user_mag/userno_mag.vue')
          },
          {
            path: 'trash_userop_mag',
            name: '垃圾投放用户运营管理',
            meta: {
              icon: 'md-radio-button-on',
              title: '用户运营管理'
            },
            component: () => import('@/view/user_mag/trash_user_mag/userop_mag.vue')
          }
        ]
      },
      {
        path: 'package_user_mag',
        name: '末端派送业务用户管理',
        meta: {
          access: ['suoting'],
          icon: 'md-archive',
          showAlways: true,
          title: '末端派送业务用户管理'
        },
        component: parentView,
        children: [
          {
            path: 'package_userno_mag',
            name: '派送用户账号管理',
            meta: {
              icon: 'md-radio-button-on',
              title: '用户账号管理'
            },
            component: () => import('@/view/user_mag/package_user_mag/userno_mag.vue')
          },
          {
            path: 'package_userop_mag',
            name: '派送用户运营管理',
            meta: {
              icon: 'md-radio-button-on',
              title: '用户运营管理'
            },
            component: () => import('@/view/user_mag/package_user_mag/userop_mag.vue')
          }
        ]
      },
      {
        path: 'sweep_user_mag',
        name: '路面清扫业务用户管理',
        meta: {
          access: ['suoting'],
          icon: 'md-snow',
          showAlways: true,
          title: '路面清扫业务用户管理'
        },
        component: parentView,
        children: [
          {
            path: 'sweep_userno_mag',
            name: '清扫用户账号管理',
            meta: {
              icon: 'md-radio-button-on',
              title: '用户账号管理'
            },
            component: () => import('@/view/user_mag/sweep_user_mag/userno_mag.vue')
          },
          {
            path: 'sweep_userop_mag',
            name: '清扫用户运营管理',
            meta: {
              icon: 'md-radio-button-on',
              title: '用户运营管理'
            },
            component: () => import('@/view/user_mag/sweep_user_mag/userop_mag.vue')
          }
        ]
      },
      {
        path: 'sweep_user_mag',
        name: '社区巡逻业务用户管理',
        meta: {
          access: ['suoting'],
          icon: 'md-hand',
          showAlways: true,
          title: '社区巡逻业务用户管理'
        },
        component: parentView,
        children: [
          {
            path: 'sweep_userno_mag',
            name: '巡逻用户账号管理',
            meta: {
              icon: 'md-radio-button-on',
              title: '用户账号管理'
            },
            component: () => import('@/view/user_mag/guard_user_mag/userno_mag.vue')
          },
          {
            path: 'sweep_userop_mag',
            name: '巡逻用户运营管理',
            meta: {
              icon: 'md-radio-button-on',
              title: '用户运营管理'
            },
            component: () => import('@/view/user_mag/guard_user_mag/userop_mag.vue')
          }
        ]
      }
    ]
  },
  {
    path: '/message',
    name: 'message',
    component: Main,
    meta: {
      hideInBread: true,
      hideInMenu: true
    },
    children: [
      {
        path: 'message_page',
        name: 'message_page',
        meta: {
          icon: 'md-notifications',
          title: '消息中心'
        },
        component: () => import('@/view/single-page/message/index.vue')
      }
    ]
  },
  {
    path: '/error_store',
    name: 'error_store',
    meta: {
      hideInBread: true
    },
    component: Main,
    children: [
      {
        path: 'error_store_page',
        name: 'error_store_page',
        meta: {
          icon: 'ios-bug',
          title: '系统错误测试'
        },
        component: () => import('@/view/error-store/error-store.vue')
      }
    ]
  },
  {
    path: '/error_logger',
    name: 'error_logger',
    meta: {
      hideInBread: true,
      hideInMenu: true
    },
    component: Main,
    children: [
      {
        path: 'error_logger_page',
        name: 'error_logger_page',
        meta: {
          icon: 'ios-bug',
          title: '错误收集'
        },
        component: () => import('@/view/single-page/error-logger.vue')
      }
    ]
  },
  {
    path: '/argu',
    name: 'argu',
    meta: {
      hideInMenu: true
    },
    component: Main,
    children: [
      {
        path: 'params/:id',
        name: 'params',
        meta: {
          icon: 'md-flower',
          title: route => `{{ params }}-${route.params.id}`,
          notCache: true,
          beforeCloseName: 'before_close_normal'
        },
        component: () => import('@/view/argu-page/params.vue')
      },
      {
        path: 'query',
        name: 'query',
        meta: {
          icon: 'md-flower',
          title: route => `{{ query }}-${route.query.id}`,
          notCache: true
        },
        component: () => import('@/view/argu-page/query.vue')
      }
    ]
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  }
]
