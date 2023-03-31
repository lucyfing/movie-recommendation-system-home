import { Avatar, Button, Col, Divider, Form, Input, message, Row, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import React, { useEffect, useRef, useState } from 'react'
import './index.less'
import '../user-information/index.less'
import '../../assets/index.less'
import utils from '../../utils'
import { User } from '../../lib/app-interface'
import userApi from '../../api/user'
import { postRequest } from '../../api/axios'
const { TextArea } = Input


export default function index() {
  const [user, setUser] = useState<User>(JSON.parse(localStorage.getItem('user')!))
  const [form] = Form.useForm()

  const handleReset = () => {
    form.resetFields(); // 重置表单中所有字段的值和状态
  }

  const onFinish = async (form: any) => {
    // if(!utils.validCaptcha(form.captcha)) {
    //   message.error('请输入6位验证码')
    // }

    if(!utils.validUsername(form.password)) {
      message.error('请输入正确密码格式')
    } else if(!utils.validUsername(form.password)) {
      message.error('新密码格式不正确')
    } else {
      form.email = user.email
      await userApi.updatePwd({...form})
    }

  }


  const [countdown, setCountdown] = useState(0);
  // 发送验证码的请求
  const handleSendCode = () => {
    // ...

    setCountdown(60); // 设置倒计时时间
  };

  useEffect(() => {
    let timer: any = null
    if (countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [countdown]);

  return (
    <div className='account-setting app-div-shadow'>
      <Form form={form} onFinish={onFinish}>
        <Form.Item name="email" label="邮 箱">
          <Input type='text' defaultValue={user.email} bordered={false} disabled/>
        </Form.Item>
        {/* <Form.Item label="验证码">
          <Row gutter={10}>
            <Col span={15}>
              <Form.Item
                name="captcha"
                noStyle
              >
                <Input maxLength={6} minLength={6} placeholder='请输入6位验证码'/>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Button disabled={countdown > 0} onClick={handleSendCode} type='primary'>
                {countdown > 0 ? `${countdown}s` : '获取验证码'}
              </Button>
            </Col>
          </Row>
        </Form.Item> */}
        <Form.Item name="password" label="旧密码" required>
          <Input.Password placeholder='请输入旧密码' maxLength={15} minLength={5}/>
        </Form.Item>
        <Form.Item name="newPassword" label="新密码" required>
          <Input.Password placeholder='请输入由A-Za-z0-9组成的5-15位字符' maxLength={15} minLength={5}/>
        </Form.Item>
        <Form.Item>
          <Row gutter={10}>
            <Col span={8}>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
            </Col>
            <Col span={8}>
              <Button htmlType="button" onClick={handleReset}>
                重置
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </div>
  )
}
