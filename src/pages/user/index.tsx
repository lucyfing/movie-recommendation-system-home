import React from 'react'
import { Outlet } from 'react-router-dom'
import './index.less'

export default function index() {
  return (
    <div className='personal-center'>
      <div className='personal-center-nav'>
        
      </div>
      <div className='personal-center-content'>
        <Outlet/>
      </div>
    </div>
  )
}
