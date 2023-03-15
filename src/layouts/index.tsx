import React, { lazy, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Affix, Avatar, Menu, MenuProps, Modal, Tabs, TabsProps, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './index.less';
import categoryApi from '../request/category'
import lazyComponent from '../components/lazyComponent';
import category from '../request/category';
import { Category } from '../lib/app-type';
const Login = lazy(() => import('../components/login'))
const Register = lazy(() => import('../components/register'))

const { Search } = Input;

export default function DefaultLayout(
    props: {element: React.ReactElement<any, string | React.JSXElementConstructor<any>> | null}
) {
    // 导航栏
    // const menuItems: MenuProps['items'] = [
    //     {
    //     label: '喜剧',
    //     key: '/channel/comedy',
    //     },
    //     {
    //     label: '恐怖',
    //     key: '/channel/terror',
    //     },
    //     {
    //     label: '爱情',
    //     key: '/channel/love',
    //     },
    //     {
    //     label: '战争',
    //     key: '/channel/war',
    //     },
    //     {
    //     label: '悬疑',
    //     key: '/channel/suspense',
    //     }
    // ];
    const [menuItems, setMenuItems] = useState<MenuProps['items']>()
    useEffect(() => {
        const getCategories = async () => {
            const categories = await categoryApi.getAllCategory('/category/')
            setMenuItems(()=>categories.map((category: Category)=>({
                label: category.name,
                key: category.name
            })))
        }
        getCategories()
    }, [])
    const [current, setCurrent] = useState('/');
    const navigate = useNavigate();
    const onClickMenuItems: MenuProps['onClick'] = (e) => {
        setCurrent(e.key)
        navigate(`/channel/${e.key}`)
    };
    const onClickTitle = () => {
        setCurrent('/')
        navigate('/')
    };

    // 登录注册tab选项
    const [isModalOpen, setIsModalOpen] = useState(false);
    const tagItems: TabsProps['items'] = [
        {
        key: 'login',
        label: `登录`,
        children: lazyComponent(<Login/>),
        },
        {
        key: 'register',
        label: `注册`,
        children: lazyComponent(<Register/>),
        },
    ];

    // 搜索   
    const onSearch = (value: string) => console.log(value);

    return (
    <div className='app-layout'>
        <div className='app-container'>
            <Affix offsetTop={0.1} style={{width: '100%'}}>
                <div className='app-container-header'>
                    <div className='header-title'>
                        <h2 className='title' onClick={onClickTitle}>电影推荐系统</h2>
                    </div>
                    <div className='header-navigate'>
                        <Menu onClick={onClickMenuItems} selectedKeys={[current]} mode="horizontal" items={menuItems} className="header-navigate-menu"/>
                    </div>
                    <div className='header-search'>
                        <Search placeholder="请输入电影名" onSearch={onSearch} enterButton size='large' className='search-btn'/>
                    </div>
                    <div className='header-user'>
                        <Avatar icon={<UserOutlined  className='header-user-avatar'/>} onClick={()=>setIsModalOpen(true)}/>
                    </div>
                </div>
            </Affix>
            <div className='app-container-main'>
                {props.element}
            </div>
            <Modal width={450} footer={null} open={isModalOpen} onCancel={()=>setIsModalOpen(false)}>
                <Tabs defaultActiveKey="login" items={tagItems} centered destroyInactiveTabPane/>
            </Modal>
        </div>
    </div>
    )
}
