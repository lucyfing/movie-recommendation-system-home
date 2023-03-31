import { useEffect } from 'react'
import { Navigate, Navigator } from 'react-router-dom'
import Home from '../pages/movie-home'
import lazyComponent from './lazyComponent'

export default function authRoute(children: any) {
  return (
    <>
        {!!localStorage.getItem('user')?
            lazyComponent(children)
            :
            <Navigate to='/' replace/>
        }
    </>
  )
}
