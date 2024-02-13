import React from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';
import './index.less';
import { login } from '../server/login';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../redux/user';
import store from '../redux';
import { useDispatch } from 'react-redux'

type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};

const LoginForm: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onFinish = (values: any) => {
        console.log('Success:', values);
        login(values.username, values.password).then((res: any) => {
            console.log(res);
            if (res.code === 0) {
                // 登录成功后，将用户信息保存到redux中
                dispatch(setUser({
                    username: values.username,
                    isLogin: true,
                }));
                localStorage.setItem('token', '123');
                console.log(store.getState(), 'store');
                message.success('登录成功');
                // 登录成功后，跳转到首页
                navigate('/home');
            } else {
                message.error('登录失败');
            }
        })
    };
    
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <>
        <Form
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 18 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            className='login-form'
        >
            <Form.Item<FieldType>
                label="用户名"
                name="username"
                rules={[{ required: true, message: '请输入用户名!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item<FieldType>
                label="密码"
                name="password"
                rules={[{ required: true, message: '请输入密码!' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item<FieldType>
                name="remember"
                valuePropName="checked"
                wrapperCol={{ offset: 4, span: 16 }}
            >
                <Checkbox>记住密码</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    提交
                </Button>
            </Form.Item>
        </Form>
        </>
    )
};

const Login = () => (
    <div className='login-container'>
        <LoginForm />
    </div>
)

export default Login;