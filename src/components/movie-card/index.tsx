import { Card } from 'antd'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Movie } from '../../lib/app-interface'
import './index.less'
const { Meta } = Card

export default function index(props:{
    movie: Movie,
    minWidth?: string | number | undefined,
    height?: string | number | undefined
}) {
    const navigate = useNavigate()
    const location = useLocation()
    const onClickCard = (movie: Movie) => {
        if(location.pathname.includes('/channel')) {
            const types = location.pathname.split('/')
            const type = types[types.length-1]
            localStorage.setItem('type', type)
        }
        navigate(`/detail/${movie.doubanId}`, {
            state: {
                movieDetail: JSON.stringify(movie)
            }
        })
      }
    return (
        <Card
            className='home-movie-card'
            style={{minWidth: props.minWidth, height: props.height}}
            bodyStyle={{padding:'5px'}}
            cover={
                <img
                alt="电影"
                src={props.movie.poster}
                style={{height:'8rem'}}
                />
            }
            onClick={() => onClickCard(props.movie)}
        >
            <Meta
                title={props.movie.name}
                description={props.movie.description}
                className='home-movie-card-meta'
            />
            <span className='home-movie-card-rate'>{props.movie.rate}</span>
        </Card>
    )
}
