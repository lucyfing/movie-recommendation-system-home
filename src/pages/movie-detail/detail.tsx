import { Button, message, Tabs, TabsProps } from 'antd'
import { HeartOutlined, StarOutlined } from '@ant-design/icons'
import React, { lazy, useCallback, useEffect, useState } from 'react'
import {useLocation, useNavigate, useSearchParams} from 'react-router-dom'
import './index.less'
import { Movie } from '../../lib/app-interface'
import movieApi from '../../api/movie'
import userApi from '../../api/user'

const MovieCard = lazy(()=>import('../../components/movie-card'))


export function Introduce(
  props: {
    movieDetail: Movie
  }
) {
  useEffect(()=>{
    console.log(props.movieDetail.languages)
  }, [])
  return (
    <div className='introduce-content'>
      <div className='poster'>
        <img src={props.movieDetail.poster} alt="海报" className='poster-img'/>
        <h3 className='poster-name'>{props.movieDetail.name}</h3>
      </div>
      <div>
        <h3>概述</h3>
        {props.movieDetail.description}
      </div>
      <div>
        <h3>影片信息</h3>
        <p>类型：{props.movieDetail.movieTypes.join('/')}</p>
        <p>制片地区/国家：{props.movieDetail.countries.join('/')}</p>
        <p>语言：{props.movieDetail.languages.join('/')}</p>
      </div>
      <div>
        <h3>演职人员</h3>
        <p>导演：{props.movieDetail.directors.join('/')}</p>
        <p>主演：{props.movieDetail.actors.join('/')}</p>
      </div>
    </div>
  )
}

export default function detail() {
  // 电影详细信息
  const location = useLocation()
  const [movieDetail, setMovieDetail] = useState<Movie>(()=>JSON.parse(location.state.movieDetail))
  const tagItems: TabsProps['items'] = [
    {
    key: 'introduce',
    label: `简介`,
    children: <Introduce movieDetail={movieDetail}/>,
    }
  ];

  const navigate = useNavigate()
  const goBack = () => {
    let type = 'commedy'
    if(!!localStorage.getItem('type')) {
      type = localStorage.getItem('type')!
    }
    navigate(`/channel/${type}`)
  }

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')!))
  const [votes, setVotes] = useState(0)
  const updateCollection = async (doubanId: string, _id?:string, add?: number) => {
    const params = {
      _id: _id || '',
      doubanId: doubanId,
      collection: add || 0
    }
    const {collection, collectionVotes} = await userApi.collectionMovie(params)
    setVotes(collectionVotes)
    setChooseColletion(collection)
  }
  useEffect(()=>{
    updateCollection(movieDetail.doubanId, user._id)
  }, [])

  const movies: Array<Object> = [
    {
      poster:'https://img2.doubanio.com/view/photo/s_ratio_poster/public/p1675053073.webp',
      name: '电影名称',
      description: 'descriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescription',
      rate: 4.5,
      doubanId: 123456 
    },
    {
      poster:'https://img2.doubanio.com/view/photo/s_ratio_poster/public/p1675053073.webp',
      name: '电影名称',
      description: 'descriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescription',
      rate: 4.5,
      doubanId: 182062  
    },
    {
      poster:'https://img2.doubanio.com/view/photo/s_ratio_poster/public/p1675053073.webp',
      name: '电影名称',
      description: 'descriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescription',
      rate: 4.5,
      doubanId: 456895  
    },
    {
      poster:'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
      name: '电影名称',
      description: 'descriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescription',
      rate: 4.5,
      doubanId: 856942  
    },
    {
      poster:'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
      name: '电影名称',
      description: 'descriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescription',
      rate: 4.5,
      doubanId: 987456 
    }
  ]

  const [chooseColletion, setChooseColletion] = useState(false)
  // 点击收藏
  const onCollection = () => {
    if(!!user) {
      setChooseColletion(!chooseColletion)
    } else {
      message.warning('请先登录')
    }
  }
  useEffect(()=>{
    let timer: any = null
    timer = setTimeout(async() => {
      let collection = 0
      if(chooseColletion) collection = 1
      if(!chooseColletion) collection = -1
      await updateCollection(movieDetail.doubanId, user._id, collection)
    }, 1000)
    return () => {
      clearTimeout(timer)
    }
  }, [chooseColletion])


  return (
    <div className='detail-movie'>
      <div className='detail-movie-video'>
        <div className='video-box'>
          <video
            className='video'
            controls={true}
            preload="auto"
          >
            <source src={movieDetail?.video} type="video/mp4" />
          </video>
          <div className='video-choose'>
            <Button
              type='link'
              icon={<StarOutlined />}
              className={chooseColletion?'is-choose': 'not-choose'}
              onClick={onCollection}
            ></Button>
            <span>{votes}</span>
          </div>
        </div>
        <div className='detail-movie-introduce'>
          <Button
            type="text"
            block 
            className='back-home' 
            onClick={goBack}
          >回到首页</Button>
          <Tabs
            defaultActiveKey="introduce" 
            items={tagItems} 
            centered 
            destroyInactiveTabPane
          />
        </div>
      </div>
      <div className='detail-movie-recommend'>
        <h2 className='recommend-title'>为你推荐</h2>
        {movies.map((movie: any)=>(
          <MovieCard movie={movie} key={movie.doubanId}/>
        ))}
      </div>
    </div>
  )
}
