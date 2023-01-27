import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input,Tooltip } from 'antd';

const Register = (props) => {

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    }

    return (
        <>
            <h3>注册用户</h3>
            <br />
            <Form
                form={props.form || {}}
                name="normal_login"
                className="login-form"
                onFinish={onFinish}
                style={{
                    margin: '24px',
                }}
            >
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Username!',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                    ]}
                >
                    <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="密码" maxLength={20} />
                </Form.Item>
                <Form.Item>
                <Tooltip placement="top" title={"可以在dst-admin-go目录下的password文件直接修改"}>
                    <Button type="link">
                        不记得密码了
                    </Button>
                </Tooltip>
                </Form.Item>
            </Form>
        </>
    )
}
export default Register