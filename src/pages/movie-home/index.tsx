import React, { lazy, useContext, useEffect, useState } from 'react'
import { Empty, Menu } from 'antd'
import type { MenuProps } from 'antd/es/menu';
import './index.less'
import movieApi from '../../api/movie'
import { Movie } from '../../lib/app-interface';
const MovieCard = lazy(() => import('../../components/movie-card'))
import { Context } from '../../layouts';

export default function Home() {  
  const {currentType, movieList} = useContext(Context)
  const [movies, setMovies] = useState<Movie[]>([])
  const [currentYear, setCurrentYear] = useState('-1')
  const getTypeMovies = async (type?: string, year?: number) => {
    const movieList = await movieApi.getAllMovies(type, year)
    setMovies(movieList)
  }
  useEffect(() => {
    getTypeMovies(currentType, -1)
  }, [currentType])
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
    getTypeMovies(currentType, Number(e.key))
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
      { movies.length > 0 ?
        <div className='home-movie-list'>
          {movies.map((movie:Movie)=>(
            <MovieCard movie={movie} key={movie.doubanId}/>
          ))}
        </div>
        :
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} style={{margin: 'auto',marginTop:'15rem'}}/>
      }
    </div>
  )
}
