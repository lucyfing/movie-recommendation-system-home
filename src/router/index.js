import { lazy } from 'react'
import lazy_component from '../components/lazyComponent'
const Home = lazy(() => import('../pages/home'))
const Detail = lazy(() => import('../pages/movie/detail.tsx'))
const User = lazy(() => import('../pages/user'))

export default [
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
        element: lazy_component(<User/>)
    }
]