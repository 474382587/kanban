import { Button } from 'antd';
import { Form } from 'antd';
import Input from 'antd/es/input/Input';
import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Item = Form.Item;

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const onSubmit = async () => {
    const res = await axios.post(
      'https://lambent-phoenix-5a89bb.netlify.app/.netlify/functions/auth/login',
      {
        data: {
          ...form.getFieldsValue(),
        },
      }
    );
    console.log(res);

    if (res?.data?.token) {
      localStorage.setItem('token', res.data.token);
      toast.success('Login successful');
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } else {
      console.log('not success');
      toast.warn('Something wrong with login');
    }
  };

  return (
    <div>
      <Form form={form}>
        <Item label="Username" name="username">
          <Input placeholder="enter your username" />
        </Item>
        <Item label="Password" name="password">
          <Input placeholder="enter your password" />
        </Item>
        <Button
          onClick={() => {
            onSubmit();
          }}
        >
          Login
        </Button>
      </Form>
    </div>
  );
};

export default Login;
