import { Avatar, Menu, MenuProps } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import './index.less'
import '../../assets/index.less'

export default function index() {
  const navItems: MenuProps['items'] = [
    {
      label: '个人资料',
      key: '/user/user-information'
    },
    {
      label: '账号设置',
      key: '/user/account-setting'
    },
    {
      label: '我的收藏',
      key: '/user/user-collection'
    }
  ]
  const navigator = useNavigate()
  const onSelect: MenuProps['onSelect'] = (e) => {
    navigator(e.key)
  }

  return (
    <div className='personal-center'>
      <div className='personal-center-nav app-div-shadow'>
        <div className='avator'>
          <Avatar src="https://joesch.moe/api/v1/random?key=3" className='avator-img'/>
          <p className='avator-name'>用户名</p>
        </div>
        <Menu
          mode='inline'
          theme='light'
          items={navItems}
          className='nav'
          onSelect={onSelect}
        />
      </div>
      <div className='personal-center-content'>
        <Outlet/>
      </div>
    </div>
  )
}
