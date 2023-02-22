import { Button, Checkbox, Form, Input } from 'antd'
import React from 'react'

export default function Register() {

    const usernameRules = [
        {required: true, message: '请输入用户名!', trigger: 'blur'},
        {min: 5, max: 16, message: '长度在 5 到 16 个字符', trigger: 'blur'},
    ]
    const passwordRules = [
        {required: true, message: '请输入密码', trigger: 'blur'},
        {min: 5, max: 16, message: '长度在 5 到 16 个字符', trigger: 'blur'}
    ]

    const onFinish = (values: any) => {
    console.log('Success:', values);
    };
    
    const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    };

    return (
        <div>
            <Form
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 15 }}
            style={{ maxWidth: 450 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            >
                <Form.Item
                label="用户名"
                name="username"
                rules={usernameRules}
                >
                <Input placeholder='请输入用户名'/>
                </Form.Item>

                <Form.Item
                label="密码"
                name="password"
                rules={passwordRules}
                >
                <Input.Password placeholder='请输入5到16个字符'/>
                </Form.Item>

                <Form.Item
                label="确认密码"
                name="confirm_password"
                rules={passwordRules}
                >
                <Input.Password placeholder='请确认密码'/>
                </Form.Item>

                <Form.Item
                label="邮箱"
                name="email"
                rules={passwordRules}
                >
                <Input placeholder='例: example@123.com'/>
                </Form.Item>

                <Form.Item
                label="手机号"
                name="phone"
                rules={passwordRules}
                >
                <Input placeholder="例: 18955552312"/>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 6, span: 15 }}>
                <Button type="primary" htmlType="submit">
                    注册
                </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
