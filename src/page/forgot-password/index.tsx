import React, { useState } from 'react';
import './style.scss';
import TitleForm from '../../components/title-form';
import { Button, Col, Form, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import ResetPasswordService from '../../services/resetPassword.service';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
  const navigator = useNavigate();
  const domain = `${window.location.origin}/reset_password`;
  const [showTxt, setShowTxt] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = async (values: any) => {
    const newValue = {
      ...values,
      reset_password_url: domain,
    };
    setLoading(true);
    const res = await ResetPasswordService.postResetPass(newValue);
    if (res === null) {
      setShowTxt(true);
    }
    setLoading(false);
  };
  return (
    <div className="card-page">
      <Col xs={24} md={12} lg={12} xl={10} xxl={10} className="col-page">
        <Form
          name="normal_login"
          layout="vertical"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}>
          <TitleForm title={'Reset Password'} />
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
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="E-mail" />
          </Form.Item>
          {showTxt && <Form.Item>Please check your Email to reset your password!</Form.Item>}
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button" loading={loading}>
              Reset Password
            </Button>
            <span className="link-a" onClick={() => navigator('/login')}>
              Login
            </span>
          </Form.Item>
        </Form>
      </Col>
    </div>
  );
}
