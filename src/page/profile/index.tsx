import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hook';
import { getFromStorage } from '../../utils/storage';
import { MIN_PASSWORD, StorageKeys } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';
import { Button, Col, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import TitleForm from '../../components/title-form';
import { UsersService } from '../../services/user.service';
import { toast } from 'react-toastify';
import { LOGIN_TYPE } from '../../utils/constants';
import './style.scss';

export default function Profile() {
  const UserApi = new UsersService();
  const accessToken = getFromStorage(StorageKeys.USER_TOKEN_KEY);
  const loginType = getFromStorage(StorageKeys.LOGIN_TYPE);
  const navigator = useNavigate();
  const dispatch = useAppDispatch();
  const { userInfo }: any = useAppSelector(state => state.user);

  const [avatar, setAvatar] = useState<any>();
  const [disabled, setDisabled] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setDisabled(loginType === LOGIN_TYPE.GOOGLE ? true : false);
    if (!accessToken) {
      navigator('/');
    }
  }, []);

  const handleFileRead = (event: any) => {
    const file = event.target.files[0];
    setAvatar(file);
  };

  const handleSubmit = async (values: any) => {
    delete values.password_new;
    const newValue = {
      ...values,
      'me[avatar]': avatar,
    };

    if (!values['me[passord']) {
      delete values['me[passord'];
    }

    if (!avatar) {
      delete newValue['me[avatar]'];
    }
    setLoading(true);
    const res = await UserApi.updateUser(newValue);
    if (res) {
      UserApi.userInfor(dispatch);
      toast.success('Update user success!');
    }
    setLoading(false);
  };

  return (
    <div className="card-page profile-page">
      <Col xs={24} md={20} lg={16} xl={12} xxl={10} className="col-page">
        {userInfo.data && (
          <Form
            name="normal"
            layout="vertical"
            className="register-form"
            initialValues={{ 'me[email]': userInfo?.data?.email, 'me[name]': userInfo?.data?.name }}
            onFinish={handleSubmit}>
            <TitleForm title={'Profile'} />
            <Form.Item
              name="me[email]"
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
              <Input
                disabled={disabled}
                maxLength={50}
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              name="me[name]"
              label="Username"
              rules={[
                {
                  required: true,
                  message: 'Please input your name!',
                },
              ]}>
              <Input
                disabled={disabled}
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>

            <Form.Item
              name="user[password]"
              label="Password"
              rules={[
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
                disabled={disabled}
                minLength={MIN_PASSWORD}
              />
            </Form.Item>
            <Form.Item
              name="password_new"
              label="Confirm Password"
              rules={[
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
                disabled={disabled}
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item name="me[avatar]">
              <img src={userInfo?.data?.avatar?.url} className="img-avatar" />
              <input
                disabled={disabled}
                id="originalFileName"
                type="file"
                accept=".jpg, .jpeg, .png"
                onChange={e => handleFileRead(e)}
              />
            </Form.Item>
            <Form.Item>
              <div className="box-btn">
                <Button type="default" onClick={() => navigator(-1)} className="login-form-button">
                  Back
                </Button>
                {!disabled && (
                  <Button type="primary" htmlType="submit" className="login-form-button" loading={loading}>
                    Update Profile
                  </Button>
                )}
              </div>
            </Form.Item>
          </Form>
        )}
      </Col>
    </div>
  );
}
