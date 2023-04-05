import React, {useContext} from 'react'
import './index.less'
import { Context } from '../../layouts'
import { Movie } from '../../lib/app-interface'
import { useNavigate } from 'react-router-dom'
import { Empty } from 'antd'

export default function index() {
    const {movieList} = useContext(Context)
    const navigate = useNavigate()
    const onClick = (movie: Movie) => {
        navigate(`/detail/${movie.doubanId}`, {
            state: {
                movieDetail: JSON.stringify(movie)
            }
        })
    }
    return (
        <div className='search-movies'>
            {
                movieList.length > 0 ?
                movieList.map((movie: Movie)=>(
                    <div className='movie-card'>
                        <img src={movie.poster} alt={movie.name} className='movie-poster' onClick={()=>onClick(movie)}/>
                        <div className='movie-content'>
                            <h3 className='title' onClick={()=>onClick(movie)}>{movie.name}</h3>
                            <p>{movie.dateReleased}&nbsp;.&nbsp;{movie.countries[0].split(',').join(' ')}&nbsp;.&nbsp;{movie.languages.join(' ')}&nbsp;.&nbsp;{movie.movieTypes.join(' ')}</p>
                            <p><b>简介: </b>{movie.description}</p>
                            <p><b>导演：</b>{movie.directors.join(' ')}</p>
                            <p><b>编剧：</b>{movie.writers.join(' ')}</p>
                            <p title={movie.actors.join(' ')} className='actor'><b>主演：</b>{movie.actors.join(' ')}</p>
                        </div>
                    </div>
                ))
                :
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} style={{margin: 'auto',marginTop:'15rem'}}/>
            }
        </div>
  )
}