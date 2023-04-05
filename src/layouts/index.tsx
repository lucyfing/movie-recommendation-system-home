import React, { createContext, lazy, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Affix, Avatar, Menu, MenuProps, Modal, Tabs, TabsProps, Input, Popover, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './index.less';
import '../assets/index.less'
import categoryApi from '../api/category'
import movieApi from '../api/movie';
import lazyComponent from '../components/lazyComponent';
import { Category, Movie, User } from '../lib/app-interface';
import { useSelector, useDispatch } from 'react-redux'
import { store } from '../redux/index'
const Login = lazy(() => import('../components/login'))
const Register = lazy(() => import('../components/register'))

const { Search } = Input
export const Context = createContext<any>({})

export default function DefaultLayout(
    props: {element: React.ReactElement<any, string | React.JSXElementConstructor<any>> | null}
) {
    // 导航栏
    const [menuItems, setMenuItems] = useState<MenuProps['items']>()
    // 电影列表
    const [movieList, setMovieList] = useState<Array<Movie>>([])
    useEffect(() => {
        const getCategories = async () => {
            const categories = await categoryApi.getAllCategory()
            setMenuItems(()=>categories.map((category: Category)=>({
                label: category.name,
                key: category.name
            })))
        }
        getCategories()
    }, [])

    const [currentType, setCurrentType] = useState('')
    const navigate = useNavigate()
    const onClickMenuItems: MenuProps['onClick'] = async (e) => {
        setCurrentType(e.key)
        navigate(`/channel/${e.key}`)
    };
    const onClickTitle = () => {
        setCurrentType('')
        navigate('/')
    };
    // 监听url的channel是否合法
    const location = useLocation()
    const rightPath = (path: string) => {
        const categoryList: any = menuItems ? menuItems.map((item)=>item?.key) : []
        path = decodeURI(path)
        if(!categoryList.includes(path.slice(path.lastIndexOf('/')+1)) && path.includes('channel')) return false
        if(path.includes('user') && (!!!document.cookie || document.cookie.split(';')[0] !== 'authentication=1')) {
            localStorage.removeItem('user') 
            return false
        }
        return true
    }
    useEffect(()=>{
        if(!rightPath(location.pathname)) navigate('/')
    }, [menuItems, location.pathname])

    // 登录注册tab选项
    const [isModalOpen, setIsModalOpen] = useState(false);
    const tagItems: TabsProps['items'] = [
        {
        key: 'login',
        label: `登录`,
        children: lazyComponent(<Login setIsModalOpen={setIsModalOpen}/>),
        },
        {
        key: 'register',
        label: `注册`,
        children: lazyComponent(<Register/>),
        },
    ];

    // 搜索   
    const onSearch = async(value: string) => {
        const movies = await movieApi.getFilterMovies(value)
        setCurrentType('')
        setMovieList(movies)
        navigate('/search')
    };

    const [loginOutopen, setLoginOutOpen] = useState(false);
    // 点击头像
    const clickavatar = () => {
        if(!!localStorage.getItem('user')) setLoginOutOpen(true)
        else setIsModalOpen(true)
    }
    const loginOut = () => {
        localStorage.removeItem('user')
        setLoginOutOpen(false)
        navigate('/')
        window.location.reload()
    }
    const goCenter = () => {
        navigate('/user')
        setLoginOutOpen(false)
    }
    const avatarContent = () => (
        <>
            <Button
              type='text'
              style={{width:'100%'}}
              onClick={goCenter}
            >个人中心</Button>
            <Button 
              type='text'
              style={{width:'100%'}}
              onClick={loginOut}
            >退出</Button>
        </>
    )

    // 获取user
    const currentUser: User = store.getState().user

    return (
    <div className='app-layout'>
        <div className='app-container'>
            <Affix offsetTop={0.1} style={{width: '100%'}}>
                <div className='app-container-header'>
                    <div className='header-title'>
                        <h2 className='title' onClick={onClickTitle}>电影推荐系统</h2>
                    </div>
                    <div className='header-navigate'>
                        <Menu onClick={onClickMenuItems} selectedKeys={[currentType]} mode="horizontal" items={menuItems} className="header-navigate-menu"/>
                    </div>
                    <div className='header-search'>
                        <Search placeholder="请输入电影名" onSearch={onSearch} enterButton size='large' className='search-btn'/>
                    </div>
                    <div className='header-user'>
                        <Avatar src={currentUser.avatar||null} onClick={clickavatar}/>
                    </div>
                    <Popover
                        trigger="click"
                        open={loginOutopen}
                        onOpenChange={()=>setLoginOutOpen(false)}
                        content={avatarContent}
                    >
                    </Popover>
                </div>
            </Affix>
           <Context.Provider value={{currentType, movieList}}>
                <div className='app-container-main'>
                    {props.element}
                </div>
           </Context.Provider>
            <Modal width={450} footer={null} open={isModalOpen} onCancel={()=>setIsModalOpen(false)}>
                <Tabs defaultActiveKey="login" items={tagItems} centered destroyInactiveTabPane/>
            </Modal>
        </div>
    </div>
    )
}

