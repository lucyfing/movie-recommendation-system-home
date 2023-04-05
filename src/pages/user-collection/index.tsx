import React, { useEffect, useState } from 'react'
import './index.less'
import '../../assets/index.less'
import MovieCard from '../../components/movie-card'
import { Empty, Pagination } from 'antd'
import type { PaginationProps } from 'antd'
import userApi from '../../api/user'
import { Movie } from '../../lib/app-interface'

export default function index() {

  const [collectionMovies, setCollectionMovies] = useState<Array<Movie>>([])
  const [current, setCurrent] = useState(1)
  const [page,setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const [totalData, setTotalData] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')!))
  const onChange: PaginationProps['onChange'] = (page) => {
    setCurrent(page)
    getList(user._id, page, pageSize)
  };
  const getList = async (_id: string, page: number, pageSize: number) => {
    const {list, currentPage, totalPages, totalData} = await userApi.getCollectionList({_id, page, pageSize})
    setTotalPage(totalPages)
    setTotalData(totalData)
    setCurrent(currentPage)
    setCollectionMovies(list)
  }

  useEffect(()=>{
    getList(user._id, page, pageSize)
  }, [])


  return (
    <div className='personal-collection app-div-shadow'>
      { collectionMovies.length > 0 ?
        <div className='collection-list'>
          {collectionMovies.map((movie:any)=>(
            <MovieCard
              movie={movie} 
              key={movie.doubanId} 
              minWidth='7rem' 
              height='13rem'
            />
          ))}
        </div>
        :
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} style={{margin: 'auto',marginTop:'15rem'}}/>
      }
      <div className='collection-pagination'>
        <Pagination 
          defaultPageSize={pageSize} 
          current={current} 
          onChange={onChange} 
          total={totalData} 
          showSizeChanger={false}
          showTotal={(totalData, range) => `共 ${totalData} 条，${range[0]}-${range[1]} 条`}
        />
      </div>
    </div>
  )
}
