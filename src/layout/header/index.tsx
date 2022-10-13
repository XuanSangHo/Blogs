import React, { useEffect } from 'react';
import { Avatar, Button, Popover } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import './style.scss';
import { useAppDispatch, useAppSelector } from '../../hook';
import { getFromStorage } from '../../utils/storage';
import { StorageKeys, ClientId, LOGIN_TYPE } from '../../utils/constants';
import { UsersService } from '../../services/user.service';
import { handleLogout } from '../../utils/common';
import { useNavigate } from 'react-router-dom';
import { GoogleLogout } from 'react-google-login';

export default function Header() {
  const UserApi = new UsersService();
  const accessToken = getFromStorage(StorageKeys.USER_TOKEN_KEY);
  const loginType = getFromStorage(StorageKeys.LOGIN_TYPE);
  const { userInfo }: any = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken && !userInfo.id) {
      UserApi.userInfor(dispatch);
    }
  }, [accessToken]);

  const onLogoutSuccess = () => {
    console.log('Logout success');
    handleLogout();
  };

  const handleLogoutUser = async () => {
    if (loginType === LOGIN_TYPE.EMAIL) {
      await UserApi.logout();
      handleLogout();
    } else {
      onLogoutSuccess();
    }
  };
  const content = (
    <div className="content-header">
      <div className="btn-logout" onClick={() => navigate('/profile')}>
        Profile
      </div>
      <div className="btn-logout" onClick={() => handleLogoutUser()}>
        Log out
      </div>
    </div>
  );

  return (
    <div className="header-page">
      {accessToken ? (
        <div className="box-header">
          <Avatar src={userInfo?.data?.avatar.url} />
          <span className="username">{userInfo?.data?.name}</span>
          <Popover placement="bottomRight" content={content} trigger="click">
            <DownOutlined />
          </Popover>
        </div>
      ) : (
        <div className="header-public">
          <Button type="primary" onClick={() => navigate('/login')} className="btn-login">
            Login
          </Button>
          <Button type="default" onClick={() => navigate('/register')}>
            Register
          </Button>
        </div>
      )}
      <div style={{ display: 'none' }}>
        <GoogleLogout clientId={ClientId} onLogoutSuccess={onLogoutSuccess} />
      </div>
    </div>
  );
}
