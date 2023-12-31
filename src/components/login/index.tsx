import { Button, Checkbox, Form, Input, message } from 'antd'
import { Rule } from 'antd/es/form';
import React from 'react'
import utils from '../../utils/index'
import userApi from '../../api/user'
import { User } from '../../lib/app-interface';
import { useNavigate } from 'react-router-dom';
import { store } from '../../redux'
import { setUser } from '../../redux/user';

export default function Login(props:{setIsModalOpen:any}) {

    const usernameRules = [
        {required: true, type: 'email', message: '请输入合法的邮箱地址!', trigger: 'blur'}
    ]
    const passwordRules = [
        {required: true, message: '请输入密码', trigger: 'blur'},
        {min: 5, max: 16, message: '长度在 5 到 16 个字符', trigger: 'blur'}
    ]

    const onFinish = async (values: any) => {
        const user: User = await userApi.homeLogin(values)
        if(Object.keys(user).length>0) {
            document.cookie = "authentication=1"
            props.setIsModalOpen(false)
            store.dispatch(setUser(user))
            window.location.reload()
        }
    };
    

    return (
        <div>
            <Form
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 15 }}
            style={{ maxWidth: 450 }}
            onFinish={onFinish}
            autoComplete="off"
            >
                <Form.Item
                label="邮箱"
                name="email"
                rules={usernameRules as any}
                >
                <Input placeholder='请输入邮箱'/>
                </Form.Item>

                <Form.Item
                label="密码"
                name="password"
                rules={passwordRules}
                >
                <Input.Password placeholder='请输入密码'/>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 6, span: 15 }}>
                <Button type="primary" htmlType="submit">
                    登录
                </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
