import React, { useState } from 'react';
import { Col, Divider, Row, Button, Checkbox, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import TitleForm from '../../components/title-form';
import { MAX_PASSWORD, MIN_PASSWORD } from '../../utils/constants';

import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { UsersService } from '../../services/user.service';

import './style.scss';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Register(): JSX.Element {
  const UserApi = new UsersService();
  const [avatar, setAvatar] = useState<any>();
  const navigator = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileRead = (event: any) => {
    const file = event.target.files[0];
    setAvatar(file);
  };

  // -----------
  const onFinish = async (values: any) => {
    delete values.password_new;
    if (!avatar) {
      delete values['user[avatar]'];
    }
    const newValue = {
      ...values,
      'user[avatar]': avatar,
    };
    setLoading(true);
    const res = await UserApi.register(newValue);
    if (res) {
      toast.success('Register success!');
      setTimeout(() => {
        navigator('/login');
      }, 2000);
    }
    setLoading(false);
  };
  return (
    <div className="card-page">
      <Col xs={24} md={20} lg={16} xl={12} xxl={12} className="col-page col-register">
        <Form name="normal_register" layout="vertical" className="register-form" onFinish={onFinish}>
          <TitleForm title={'Register'} />
          <Form.Item
            name="user[email]"
            label="Email"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}>
            <Input maxLength={50} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="user[name]"
            label="Username"
            rules={[
              {
                required: true,
                message: 'Please input your User name!',
              },
            ]}>
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="user[password]"
            label="Password"
            rules={[
              { required: true, message: 'Please input your Password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || +getFieldValue('user[password]').length > MIN_PASSWORD) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Minimum password length is 8!'));
                },
              }),
            ]}>
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              minLength={MIN_PASSWORD}
              maxLength={MAX_PASSWORD}
            />
          </Form.Item>
          <Form.Item
            name="password_new"
            label="Confirm Password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('user[password]') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords that you entered do not match!'));
                },
              }),
            ]}>
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              maxLength={MAX_PASSWORD}
            />
          </Form.Item>
          <Form.Item>
            <Form.Item noStyle>If you already have an account, please</Form.Item>

            <span className="link-a" onClick={() => navigator('/login')}>
              Login
            </span>
          </Form.Item>

          <Form.Item name="user[avatar]">
            <input id="originalFileName" type="file" accept=".jpg, .jpeg, .png" onChange={e => handleFileRead(e)} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button" loading={loading}>
              Register
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </div>
  );
}
