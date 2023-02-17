import React, { useState } from 'react';
import { Form, Input } from 'antd';
import { Button, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';


const Login = () => {
    const [form] = Form.useForm();
    const toast = useToast();
    const history = useHistory();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            const { data } = await axios.post(
                "http://localhost:5000/api/user/login",
                {
                    ...values
                },
                config
            );
            console.log(data);
            if (data?.error === false) {
                toast({
                    title: "Login Successful",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom",
                });
                localStorage.setItem("userInfo", JSON.stringify(data));
                setLoading(false);
                history.push("/chats");
            } else {
                setLoading(false);
                toast({
                    title: "Something happened wrong!",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom",
                });
            }

        } catch (error) {
            toast({
                title: "Error Occured!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
        }
    };

    return (
        <Form
            form={form}
            onFinish={onFinish}
            layout='vertical'
        >
            <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}
            >
                <Input type='email' className='form-control' />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password className='form-control' />
            </Form.Item>
 
            <Button width={'100%'} colorScheme={'green'} type='submit' isLoading={loading} >Login</Button>
            <Button width={'100%'} colorScheme={'red'} type='submit' mt='3' onClick={() => {
                console.log("hi")
                form.resetFields();
                form.setFieldsValue({ email: "user@chat.com", password: "123456" })
            }}>Get Demo Credentials</Button>
        </Form>
    );
};
export default Login;