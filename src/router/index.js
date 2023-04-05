import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import lazyComponent from '../components/lazyComponent'
import authRoute from '../components/authRoute'
const Home = lazy(() => import('../pages/movie-home'))
const Detail = lazy(() => import('../pages/movie-detail/detail.tsx'))
const Search = lazy(() => import('../pages/movie-search'))
const User = lazy(() => import('../pages/user'))
const UserInformation = lazy(() => import('../pages/user-information'))
const AccountSetting = lazy(() => import('../pages/account-setting'))
const UserCollection = lazy(() => import('../pages/user-collection'))

export default [
    {
        path: '/',
        name: '首页',
        element: lazyComponent(<Home/>),
    },
    {
        path: '/channel/:id',
        name: '首页',
        element: lazyComponent(<Home/>),
    },
    {
        path: '/detail/:id',
        name: '详情页',
        element: lazyComponent(<Detail/>)
    },
    {
        path: '/search',
        name: '搜索',
        element: lazyComponent(<Search/>)
    },
    {
        path: '/user',
        name: '个人中心',
        element: authRoute(<User/>),
        children: [
            {
                path: 'user-information',
                name: '个人资料',
                element: lazyComponent(<UserInformation/>)
            },
            {
                path: 'account-setting',
                name: '账号设置',
                element: lazyComponent(<AccountSetting/>)
            },
            {
                path: 'user-collection',
                name: '我的收藏',
                element: lazyComponent(<UserCollection/>)
            }
        ]
    },
    {
        path: '*',
        element: <Navigate to='/' element={lazyComponent(<Home/>)}/>
    }
]