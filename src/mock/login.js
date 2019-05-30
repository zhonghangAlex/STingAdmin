import { getParams } from '@/libs/util'
import userLogo from '@/assets/images/logo-min.png'
const USER_MAP = {
  suoting: {
    name: 'suoting',
    user_id: '1',
    access: ['suoting', 'admin'],
    token: 'suoting',
    avatar: userLogo
  },
  admin: {
    name: 'admin',
    user_id: '2',
    access: ['admin'],
    token: 'admin',
    avatar: 'https://avatars0.githubusercontent.com/u/20942571?s=460&v=4'
  }
}

export const login = req => {
  req = JSON.parse(req.body)
  return { token: USER_MAP[req.userName].token }
}

export const getUserInfo = req => {
  const params = getParams(req.url)
  return USER_MAP[params.token]
}

export const logout = req => {
  return null
}
