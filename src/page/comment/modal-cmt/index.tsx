import { Button, Form, Input, Modal } from 'antd';
import React, { useState } from 'react';
import { ItemCmt, UpdateCmt } from '../../../models/Comment';
import { TYPE_MODAL } from '../../../utils/constants';
import CommentsService from '../../../services/comment.service';
import { toast } from 'react-toastify';

type Props = {
  isModalOpen: boolean;
  onCancel: () => void;
  reload: () => void;
  initValue: ItemCmt | undefined;
  type: string;
};

const { TextArea } = Input;

export default function ModalComment({ isModalOpen, onCancel, reload, initValue, type }: Props) {
  const [value, setValue] = useState<string | undefined>(initValue?.content);

  const handleSubmit = async () => {
    if (!initValue?.id) return;
    if (type === TYPE_MODAL.DELETE) {
      await CommentsService.deleteComments(initValue?.id);
      toast.success('Delete Comment success');
      onCancel();
      reload();
    } else {
      const newValue = {
        'comment[content]': value,
      };
      console.log(newValue);
      await CommentsService.putComments(initValue?.id, newValue);
      toast.success('Update Comment success');
      onCancel();
      reload();
    }
  };

  return (
    <div>
      <Modal
        title={type === TYPE_MODAL.DELETE ? 'Delete Blog' : 'Update Blog'}
        open={isModalOpen}
        okText={type === TYPE_MODAL.DELETE ? 'Delete' : 'Update'}
        onOk={handleSubmit}
        onCancel={onCancel}>
        {type === TYPE_MODAL.DELETE ? (
          <h4 className="q-delete">Are you sure Delete?</h4>
        ) : (
          <Form name="normal_cmt" className="cmt-form" onFinish={handleSubmit}>
            <Form.Item
              name="comment[content]"
              rules={[
                {
                  required: true,
                  message: 'Please input your Comment!',
                },
              ]}>
              <TextArea defaultValue={value} onChange={e => setValue(e.target.value)} placeholder="Enter comment" />
            </Form.Item>
          </Form>
        )}
      </Modal>
    </div>
  );
}
