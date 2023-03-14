import React, { lazy, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import request from '../../utils/request'
import { Card, Menu } from 'antd'
import type { MenuProps } from 'antd/es/menu';
import './index.less'
import axios from 'axios';
const MovieCard = lazy(() => import('../../components/movie-card'))

export default function Home() {  
  const items: MenuProps['items'] = [
    {
      label: '2020 年上映',
      key: '2020'
    },
    {
      label: '2021',
      key: '2021'
    },
    {
      label: '2022',
      key: '2022'
    },
    {
      label: '2023',
      key: '2023'
    },
    {
      label: '2019',
      key: '2019'
    },
    {
      label: '2018',
      key: '2018'
    },
    {
      label: '2017',
      key: '2017'
    },
    {
      label: '2016',
      key: '2016'
    },
    {
      label: '2015',
      key: '2015'
    }
  ]
  // const movies: Array<Object> = [
  //   {
  //     poster:'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
  //     name: '电影名称',
  //     description: 'descriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescription',
  //     rate: 4.5,
  //     doubanId: 123456 
  //   },
  //   {
  //     poster:'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
  //     name: '电影名称',
  //     description: 'descriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescription',
  //     rate: 4.5,
  //     doubanId: 182062  
  //   },
  //   {
  //     poster:'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
  //     name: '电影名称',
  //     description: 'descriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescription',
  //     rate: 4.5,
  //     doubanId: 456895  
  //   },
  //   {
  //     poster:'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
  //     name: '电影名称',
  //     description: 'descriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescription',
  //     rate: 4.5,
  //     doubanId: 856942  
  //   },
  //   {
  //     poster:'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
  //     name: '电影名称',
  //     description: 'descriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescription',
  //     rate: 4.5,
  //     doubanId: 987456 
  //   }
  // ]

  const [movies, setMovies] = useState<Array<Object>>([])
  useEffect(()=>{
    axios.get('http://localhost:4455/api/v0/movies/').then(resp=>{
      setMovies(()=>resp.data.movies.map((movie:any)=>({
        poster: movie.poster,
        name: movie.name,
        description: movie.description,
        rate: movie.rate,
        doubanId: movie.doubanId
      })))
    })
  }, [])

  return (
    <div className='home'>
      <div className='home-year-list'>
        <Menu
          mode='inline'
          theme='light'
          items={items}
          className='menu-year'
        />
      </div>
      <div className='home-movie-list'>
        {movies.map((movie:any)=>(
          <MovieCard movie={movie} key={movie.doubanId}/>
        ))}
      </div>
    </div>
  )
}
