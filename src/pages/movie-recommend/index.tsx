import React, { lazy, useContext, useEffect, useState } from 'react'
import { Empty } from 'antd'
import './index.less'
import movieApi from '../../api/movie'
import { Movie } from '../../lib/app-interface';
import { store } from '../../redux'
const MovieCard = lazy(() => import('../../components/movie-card'))
import { Context } from '../../layouts';

export default function Home() {  
  const [movies, setMovies] = useState<Movie[]>([])
  useEffect(() => {
    const getRecommendMovies = async (_id?: string) => {
        const data = await movieApi.recommendAllMovies({_id})
        setMovies(data)
    }
    getRecommendMovies(store.getState().user._id)
  }, [])


  return (
    <div className='recommend'>
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
