import { Button, Col, Form, Input } from 'antd';
import React, { useState, useEffect } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import TitleForm from '../../components/title-form';
import { MIN_PASSWORD } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';
import ResetPasswordService from '../../services/resetPassword.service';
import { ResetPassword, UpdatePassword } from '../../models/ResetPassword';
import { toast } from 'react-toastify';

function ResetPasswordPage() {
  const queryParams = new URLSearchParams(window.location.search);
  const token = queryParams.get('token');
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [loading, setLoading] = useState<boolean>(false);

  const handleVerifyToken = async () => {
    try {
      const res = await ResetPasswordService.getResetPass(token);
      if (res.data) {
        setData(res.data);
      }
    } catch (error: any) {
      navigate('/forgot-password');
    }
  };

  useEffect(() => {
    if (token) {
      handleVerifyToken();
    } else {
      navigate('/forgot-password');
    }
  }, [token]);

  const handleSubmit = async (values: any) => {
    const newValue: UpdatePassword = {
      password: values.password,
      token,
    };
    setLoading(true);
    const res = await ResetPasswordService.putResetPass(newValue);
    if (res === null) {
      toast.success('Reset password success');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }
    setLoading(false);
  };

  return (
    <div className="card-page">
      <Col xs={24} md={12} lg={12} xl={10} xxl={10} className="col-page">
        <Form name="normal_login" layout="vertical" className="login-form" onFinish={handleSubmit}>
          <TitleForm title={'Reset Password'} />
          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: 'Please input your Password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || +getFieldValue('password').length > MIN_PASSWORD) {
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
                  if (!value || getFieldValue('password') === value) {
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
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button" loading={loading}>
              Reset Password
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </div>
  );
}

export default ResetPasswordPage;
