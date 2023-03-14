import React, { useState } from 'react'
import './index.less'
import '../../assets/index.less'
import MovieCard from '../../components/movie-card'
import { Pagination } from 'antd'
import type { PaginationProps } from 'antd'

export default function index() {
  const collectionMovies: Array<Object> = [
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
  const [current, setCurrent] = useState(1)
  const onChange: PaginationProps['onChange'] = (page) => {
    setCurrent(page)
  };
  return (
    <div className='personal-collection app-div-shadow'>
      <div className='collection-list'>
        {collectionMovies.map((movie:any)=>(
          <MovieCard movie={movie} key={movie.doubanId} minWidth='7rem' height='13rem'/>
        ))}
      </div>
      <div className='collection-pagination'>
        <Pagination defaultPageSize={10} current={current} onChange={onChange} total={100} showSizeChanger={false}/>
      </div>
    </div>
  )
}
