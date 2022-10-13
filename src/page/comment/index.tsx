import React, { useEffect, useState } from 'react';
import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined } from '@ant-design/icons';
import { Avatar, Button, Col, Form, Input, Tooltip } from 'antd';

import { Comments, UpdateCmt, ItemCmt } from '../../models/Comment';
import CommentsService from '../../services/comment.service';
import { toast } from 'react-toastify';
import { useAppSelector } from '../../hook';
import { StorageKeys, TYPE_MODAL } from '../../utils/constants';
import { getFromStorage } from '../../utils/storage';
import './style.scss';
import { useNavigate } from 'react-router-dom';
import { User } from '../../models/User';
import ModalComment from './modal-cmt';
import moment from 'moment';

interface Props {
  id: string | undefined;
}

const { TextArea } = Input;

export default function CommentPage({ id }: Props) {
  const [data, setData] = useState<any>();
  const accessToken = getFromStorage(StorageKeys.USER_TOKEN_KEY);
  const navigate = useNavigate();
  const [initValue, setInitValue] = useState<ItemCmt>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [type, setType] = useState<string>('');

  const { userInfo }: any = useAppSelector(state => state.user);

  const handleGetComments = async () => {
    const res = await CommentsService.getAllComments(id);
    setData(res?.data);
    console.log(res);
  };
  useEffect(() => {
    if (id) {
      handleGetComments();
    }
  }, [id]);

  const handleAddCmt = async (values: any) => {
    const res = await CommentsService.postComments(id, values);
    if (res.data.id) {
      toast.success('Create comment success');
      handleGetComments();
    }
  };

  const handleGetCmtDetail = async (idCmt: string | undefined) => {
    const res = await CommentsService.getCommentsDetail(idCmt);
    if (res.id) {
      setInitValue(res);
      setIsOpen(true);
    }
  };

  const reload = () => {
    handleGetComments();
  };

  const openModal = (id: string | undefined, type: string) => {
    handleGetCmtDetail(id);
    setType(type);
  };

  const cancelModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="cmt-page">
      <Col className="col-cmt">
        {accessToken ? (
          <div className="box-add">
            <Avatar src={userInfo?.data?.avatar?.url} />
            <Form name="normal_cmt" className="cmt-form" onFinish={handleAddCmt}>
              <Form.Item
                name="comment[content]"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Comment!',
                  },
                ]}>
                <TextArea placeholder="Enter comment" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Create
                </Button>
              </Form.Item>
            </Form>
          </div>
        ) : (
          <div className="login-cmt">
            Please
            <span className="link-a" onClick={() => navigate('/login')}>
              Login
            </span>{' '}
            to create or edit a Comment
          </div>
        )}

        <div className="comment">
          {data?.lenght && data?.map((item: any, index: number) =>
            <div key={index} className="item-comment">
              <Avatar src={item?.avatar.url} alt="Han Solo" />
              <div className="main-comment">
                <h6 className="name-user">{item.title}</h6>
                <p className="content-comment">
                  {item.content}
                </p>
                <div className="box-action">
                  <span className="create-time">Create at {moment(item?.created_at).startOf('hour').fromNow()}</span>
                  {
                    userInfo.email === item.user.email && (
                      <div className="action-edit">
                        <span className="create-time" onClick={() => openModal(item?.id, TYPE_MODAL.EDIT)}>
                          Edit Comment
                        </span>
                        <span className="create-time" onClick={() => openModal(item?.id, TYPE_MODAL.DELETE)}>
                          Delete Comment
                        </span>
                      </div>
                    )
                  }
                </div>
              </div>
            </div>
          )}
        </div>
      </Col>
      <ModalComment isModalOpen={isOpen} onCancel={cancelModal} reload={reload} initValue={initValue} type={type} />
    </div>
  );
}
