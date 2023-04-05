import { Button, Checkbox, Form, Input, message } from 'antd'
import userApi from '../../api/user'


export default function Register() {
    const [form] = Form.useForm()
    const usernameRules = [
        {required: true, message: '请输入用户名!', trigger: 'blur'},
        {min: 5, max: 16, message: '长度在 5 到 16 个字符', trigger: 'blur'},
    ]
    const passwordRules = [
        {required: true, message: '请输入密码', trigger: 'blur'},
        {min: 5, max: 16, message: '长度在 5 到 16 个字符', trigger: 'blur'}
    ]
    const confirmPasswordRules = [
        {required: true, message: '请确认密码', trigger: 'blur'},
        ({getFieldValue}: typeof form) => ({
            validator(_: any, value: any) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject('请输入正确的密码');
            },
        }),
    ]
    const emailRules = [
        {required: true, type: 'email', message: '请输入合法的邮箱地址!', trigger: 'blur'}
    ]

    const onFinish = async (values: any) => {
        const params = {
            username: values.username,
            password: values.password,
            email: values.email
        }
        const resp = await userApi.createUser(params)
        if(resp.success) message.success(resp.message)
        else message.error(resp.message)
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
                label="用户名"
                name="username"
                rules={usernameRules}
                >
                <Input placeholder='请输入用户名'/>
                </Form.Item>

                <Form.Item
                label="邮箱"
                name="email"
                rules={emailRules as any}
                >
                <Input placeholder='例: example@123.com'/>
                </Form.Item>

                <Form.Item
                label="密码"
                name="password"
                rules={passwordRules}
                >
                <Input.Password placeholder='密码由5到16个a-zA-Z0-9字符组成'/>
                </Form.Item>

                <Form.Item
                label="确认密码"
                name="confirmPassword"
                dependencies={['password']}
                rules={confirmPasswordRules as any}
                >
                <Input.Password placeholder='请确认密码'/>
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
