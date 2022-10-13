import React, { useState, useEffect } from 'react';
import { Col, Divider, Row } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import TitleForm from '../../components/title-form';
import { Login } from '../../models/User';
import { UsersService } from '../../services/user.service';
import { StorageKeys, ClientId, LOGIN_TYPE } from '../../utils/constants';
import { saveToStorage } from '../../utils/storage';

import './style.scss';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hook';
import { toast } from 'react-toastify';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';

export default function LoginPage(): JSX.Element {
  const UserApi = new UsersService();
  const dispatch = useAppDispatch();
  const navigator = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: ClientId,
        scope: '',
      });
    }
    gapi.load('client:auth2', start);
  }, []);

  const onSuccess = async (res: any) => {
    if (res) {
      const value = {
        token_type: 'Bearer',
        access_token: res.accessToken,
      };

      const response = await UserApi.loginGoogle(value);
      saveToStorage(StorageKeys.USER_TOKEN_KEY, response.data.token);
      saveToStorage(StorageKeys.LOGIN_TYPE, LOGIN_TYPE.GOOGLE);

      UserApi.userInfor(dispatch);
      toast.success('Login Google success');
      setTimeout(() => {
        navigator('/');
      }, 2000);
    }
  };

  const onFailure = (res: any) => {
    toast.error('Login Google failure');
  };

  const onFinish = async (values: Login) => {
    try {
      setLoading(true);
      const res = await UserApi.login(values);
      if (res.data.token) {
        saveToStorage(StorageKeys.USER_TOKEN_KEY, res.data.token);
        saveToStorage(StorageKeys.LOGIN_TYPE, LOGIN_TYPE.EMAIL);
        UserApi.userInfor(dispatch);
        toast.success('Login success');
        setLoading(false);
        setTimeout(() => {
          navigator('/');
        }, 2000);
      }
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };
  return (
    <div className="card-page">
      <Col xs={24} md={16} lg={12} xl={10} xxl={10} className="col-page col-login ">
        <Form
          name="normal_login"
          layout="vertical"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}>
          <TitleForm title={'Login'} />
          <Form.Item
            name="email"
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
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Please input your Password!' }]}>
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <span className="link-a" onClick={() => navigator('/forgot-password')}>
              Forgot password
            </span>
          </Form.Item>

          <Form.Item className="box-btn-login">
            <Button type="primary" htmlType="submit" className="login-form-button" loading={loading}>
              Log in
            </Button>
            <div id="signIngg" style={{ margin: '10px 0px' }}>
              <GoogleLogin
                clientId={ClientId}
                buttonText="Login with Google"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                // isSignedIn={true}
              />
            </div>
            <div className="link">
              <span>Or</span>
              <span className="link-a" onClick={() => navigator('/register')}>
                register now!
              </span>
            </div>
          </Form.Item>
        </Form>
      </Col>
    </div>
  );
}
