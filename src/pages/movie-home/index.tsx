import React, { lazy, useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import request from '../../utils/request'
import { Card, Menu } from 'antd'
import type { MenuProps } from 'antd/es/menu';
import './index.less'
import axios from 'axios';
import { getRequest } from '../../request/axios';
import movieApi from '../../request/movie'
import { Movie } from '../../lib/app-type';
const MovieCard = lazy(() => import('../../components/movie-card'))
import { Context } from '../../layouts';
import { type } from 'os';

export default function Home() {  
  const type = useContext(Context)
  const [movies, setMovies] = useState<Movie[]>([])
  const [currentYear, setCurrentYear] = useState('-1')
  const getTypeMovies = async (type: string, year: number) => {
    const movieList = await movieApi.getAllMovies(`/movies/?type=${type==='/'?'':type}&&year=${year===-1?'':year}`)
    setMovies(movieList)
  }
  useEffect(() => {
    getTypeMovies(type, -1)
    console.log(movies.length)
  }, [type])
  // 获取时间
  const getYears = () => {
    const years: MenuProps['items'] = []
    for(let i=2023; i>2009; i--) {
      years.push({label: String(i), key: i})
    }
    years.push({label: '更早', key: 2009})
    years.unshift({label: '全部', key: -1})
    return years
  }

  const onClickYears: MenuProps['onClick'] = async (e) => {
    setCurrentYear(e.key)
    getTypeMovies(type, Number(e.key))
  }

  return (
    <div className='home'>
      <div className='home-year-list'>
        <Menu
          mode='inline'
          theme='light'
          items={getYears()}
          className='menu-year scrollbar-style'
          onClick={onClickYears}
          selectedKeys={[currentYear]}
        />
      </div>
      <div className='home-movie-list'>
        {movies.map((movie:Movie)=>(
          <MovieCard movie={movie} key={movie.doubanId}/>
        ))}
      </div>
    </div>
  )
}
