import React, { lazy, useEffect, useState } from 'react'
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

export default function Home() {  
  const items: MenuProps['items'] = [
    {
      label: '2020',
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

  const [movies, setMovies] = useState<Array<Movie>>([])
  useEffect(() => {
    const getMovies = async () => {
      const moviesList = await movieApi.getAllMovies('/movies/')
      setMovies(moviesList)
    }
    getMovies()
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
        {movies.map((movie:Movie)=>(
          <MovieCard movie={movie} key={movie.doubanId}/>
        ))}
      </div>
    </div>
  )
}
