import { lazy } from 'react'
import lazy_component from '../components/lazyComponent'
const Home = lazy(() => import('../pages/home'))
const MovieRecommendation = lazy(() => import('../pages/movie-recommendation'))
const NewsInformtion = lazy(() => import('../pages/news-information'))

export default [
    {
        path: '/',
        name: '首页',
        element: lazy_component(<Home/>),
    },
    {
        path: '/movie-recommendation',
        name: '电影推荐',
        element: lazy_component(<MovieRecommendation/>)
    },
    {
        path: '/news-information',
        name: '新闻资讯',
        element: lazy_component(<NewsInformtion/>)
    },
    {
        path: '/detail/:id',
        name: '详情页',
        element: lazy_component(<Home/>)
    }
]