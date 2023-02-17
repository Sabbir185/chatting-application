import React, { useState } from 'react';
import { Form, Input } from 'antd';
import { Button, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';


const Signup = () => {
    const toast = useToast();
    const history = useHistory();
    const [picLoading, setPicLoading] = useState(false);
    const [pic, setPic] = useState();

    const postDetails = (pics) => {
        setPicLoading(true);
        if (pics === undefined) {
            toast({
                title: "Please Select an Image!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }
        if (pics.type === "image/jpeg" || pics.type === "image/png" || pics.type === "image/jpg") {
            const data = new FormData();
            data.append("file", pics);
            data.append("upload_preset", "chat-app");
            data.append("cloud_name", "dsufcux2p");
            fetch("https://api.cloudinary.com/v1_1/dsufcux2p/upload", {
                method: "POST",
                body: data,
            })
                .then((res) => res.json())
                .then((data) => {
                    setPic(data.url.toString());
                    setPicLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setPicLoading(false);
                });
        } else {
            toast({
                title: "Please Select an Image!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setPicLoading(false);
            return;
        }
    };

    const onFinish = async (values) => {
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            values.pic = pic;
            const { data } = await axios.post(
                "http://localhost:5000/api/user/registration",
                {
                    ...values
                },
                config
            );
            console.log(data);
            if (data?.error === false) {
                toast({
                    title: "Registration Successful",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom",
                });
                localStorage.setItem("userInfo", JSON.stringify(data));
                setPicLoading(false);
                history.push("/chats");
            } else {
                setPicLoading(false);
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
            setPicLoading(false);
        }
    };


    return (
        <Form
            onFinish={onFinish}
            layout='vertical'
        >
            <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please input your name!' }]}
            >
                <Input className='form-control' />
            </Form.Item>

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

            <Form.Item
                label="Confirm Password"
                name="confirmPassword"
                dependencies={["password"]}
                rules={[
                    {
                        required: true,
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue("password") === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject("Incorrect Password!")
                        }
                    })
                ]}
                hasFeedback
            >
                <Input.Password className='form-control' />
            </Form.Item>

            <Form.Item
                label="Upload Profile Image"
                name="pic"
                rules={[{ required: true, message: 'Please input your image!' }]}
            >
                <input type='file' onChange={(e) => postDetails(e.target.files[0])} />
            </Form.Item>

            <Button
                width={'100%'}
                colorScheme={'green'}
                type='submit'
                isLoading={picLoading}
            >
                Sign Up
            </Button>
        </Form>
    );
}

export default Signup;