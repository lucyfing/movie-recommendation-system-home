import { Button, Tabs, TabsProps } from 'antd'
import React, { lazy, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import './index.less'

const MovieCard = lazy(()=>import('../../components/movie-card'))


export function Introduce(
  props: {
    movieDetail: {
      doubanId: string,
      name: string,
      rate: Number,
      poster: string,
      year: string,
      description: string,
      movieTypes: Array<string>,
      languages: Array<string>,
      countries: Array<string>,
      actors: Array<string>,
      directors: Array<string>,
      dateReleased: string,
      writers: Array<string>
    }
  }
) {
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
        <p>上映时间：{props.movieDetail.dateReleased}</p>
      </div>
      <div>
        <h3>演职人员</h3>
        <p>导演：{props.movieDetail.directors.join('/')}</p>
        <p>编剧：{props.movieDetail.writers.join('/')}</p>
        <p>主演：{props.movieDetail.actors.join('/')}</p>
      </div>
    </div>
  )
}

export default function detail() {
  // 电影详细信息
  const movieDetail = {
    doubanId:"1292052",
    name:"肖申克的救赎 / The Shawshank Redemption",
    rate:9.7,
    poster:"https://wmdb.querydata.org/movie/poster/1603701754760-c50d8a.jpg",
    year:"1994",
    description:"20世纪40年代末，小有成就的青年银行家安迪（蒂姆·罗宾斯 Tim Robbins 饰）因涉嫌杀害妻子及她的情人而锒铛入狱。在这座名为鲨堡的监狱内，希望似乎虚无缥缈，终身监禁的惩罚无疑注定了安迪接下来...",
    movieTypes:["犯罪","剧情"],
    languages:["英语"],
    countries:["美国"],
    actors:["蒂姆·罗宾斯","摩根·弗里曼","鲍勃·冈顿","威廉姆·赛德勒","克兰西·布朗","吉尔·贝罗斯","马克·罗斯顿","詹姆斯·惠特摩","杰弗里·德曼","拉里·布兰登伯格","尼尔·吉恩托利","布赖恩·利比","大卫·普罗瓦尔","约瑟夫·劳格诺","祖德·塞克利拉","保罗·麦克兰尼","芮妮·布莱恩","阿方索·弗里曼","V·J·福斯特","弗兰克·梅德拉诺","马克·迈尔斯","尼尔·萨默斯","耐德·巴拉米","布赖恩·戴拉特","唐·麦克马纳斯"],
    directors:["弗兰克·德拉邦特"],
    dateReleased: "1997-11-20",
    writers: ["叶明浩", "小玲"]
  }
  
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

  const movies: Array<Object> = [
    {
      poster:'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
      name: '电影名称',
      description: 'descriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescription',
      rate: 4.5,
      doubanId: 123456 
    },
    {
      poster:'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
      name: '电影名称',
      description: 'descriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescription',
      rate: 4.5,
      doubanId: 182062  
    },
    {
      poster:'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
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

  return (
    <div className='detail-movie'>
      <div className='detail-movie-video'>
        <div className='video-box'>
          <video className='video' controls={true} preload="auto">
            <source src="https://vt1.doubanio.com/202303042343/6eea3366fcd90bc85ffeea5bbca87e7c/view/movie/M/402590258.mp4" type="video/mp4" />
          </video>
        </div>
        <div className='detail-movie-introduce'>
          <Button type="text" block className='back-home' onClick={goBack}>回到首页</Button>
          <Tabs defaultActiveKey="introduce" items={tagItems} centered destroyInactiveTabPane/>
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
