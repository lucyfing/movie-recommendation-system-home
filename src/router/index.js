import { lazy } from 'react'
import lazy_component from '../components/lazyComponent'
const Home = lazy(() => import('../pages/movie-home'))
const Detail = lazy(() => import('../pages/movie-detail/detail.tsx'))
const User = lazy(() => import('../pages/user'))
const UserInformation = lazy(() => import('../pages/user-information'))
const AccountSetting = lazy(() => import('../pages/account-setting'))
const UserCollection = lazy(() => import('../pages/user-collection'))

export default [
    {
        path: '/',
        name: '首页',
        navigator: '/channel/commedy',
        element: lazy_component(<Home/>),
    },
    {
        path: '/channel/:id',
        name: '首页',
        element: lazy_component(<Home/>),
    },
    {
        path: '/detail/:id',
        name: '详情页',
        element: lazy_component(<Detail/>)
    },
    {
        path: '/user',
        name: '个人中心',
        navigator: '/user-information',
        element: lazy_component(<User/>),
        children: [
            {
                path: 'user-information',
                name: '个人资料',
                element: lazy_component(<UserInformation/>)
            },
            {
                path: 'account-setting',
                name: '账号设置',
                element: lazy_component(<AccountSetting/>)
            },
            {
                path: 'user-collection',
                name: '我的收藏',
                element: lazy_component(<UserCollection/>)
            }
        ]
    }
]