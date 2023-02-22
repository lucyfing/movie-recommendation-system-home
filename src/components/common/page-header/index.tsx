import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { Affix, Menu, Input, Avatar, Modal, Tabs } from 'antd'
import type { MenuProps, TabsProps  } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './index.less'
import Login from '../../login';
import Register from '../../register';

const { Search } = Input

export default function PageHeader() {

  // 导航栏选项
  const menuItems: MenuProps['items'] = [
    {
      label: '首页',
      key: '/',
    },
    {
      label: '电影推荐',
      key: '/movie-recommendation',
    },
    {
      label: '新闻资讯',
      key: '/news-information',
    },
  ];
  const [current, setCurrent] = useState('/');
  const onClickMenuItems: MenuProps['onClick'] = (e) => {
    setCurrent(e.key)
    navigate(e.key)
  };

  const [isModalOpen, setIsModalOpen] = useState(false)
  // 登录注册tab选项
  const tagItems: TabsProps['items'] = [
    {
      key: 'login',
      label: `登录`,
      children: <Login/>,
    },
    {
      key: 'register',
      label: `注册`,
      children: <Register/>,
    },
  ];
  const navigate = useNavigate()

  const onSearch = (value: string) => console.log(value);


  return (
    <>
      <Affix offsetTop={0.1}>
        <div className='app-container-header'>
            <div className='header-title'>
                <h2 className='title' onClick={()=>navigate('/')}>电影推荐系统</h2>
            </div>
            <div className='header-navigate'>
                <Menu onClick={onClickMenuItems} selectedKeys={[current]} mode="horizontal" items={menuItems} />
            </div>
            <div className='header-search'>
                <Search placeholder="input search text" onSearch={onSearch} enterButton className='search-btn'/>
            </div>
            <div className='header-user'>
                <Avatar icon={<UserOutlined  className='header-user-avatar'/>} onClick={()=>setIsModalOpen(true)}/>
            </div>
        </div>
      </Affix>
      <Modal width={450} footer={null} open={isModalOpen} onCancel={()=>setIsModalOpen(false)}>
        <Tabs defaultActiveKey="login" items={tagItems} centered destroyInactiveTabPane/>
      </Modal>
    </>
  )
}
