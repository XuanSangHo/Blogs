import { Button, Col, Form, Input } from 'antd';
import { useEffect, useState } from 'react';
import TitleForm from '../../../components/title-form';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import BlogsService from '../../../services/blogs.service';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../../../components/loading';
import { BlogsDetail } from '../../../models/Blogs';
import './style.scss';

export default function AddEditBlog(): JSX.Element {
  const [form] = Form.useForm();
  const [image, setImage] = useState<any>();
  const [data, setData] = useState<BlogsDetail>();
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingBtn, setLoadingBtn] = useState<boolean>(false);

  const navigate = useNavigate();
  const { id } = useParams();

  const handleFileRead = (event: any) => {
    const file = event.target.files[0];
    console.log(event);
    setImage(file);
  };

  // -----------
  const handelGetBlogDetail = async () => {
    setLoading(true);
    const res = await BlogsService.getBlogsDetail(id);
    setData(res);
    setContent(res?.data?.content);
    setLoading(false);
  };

  useEffect(() => {
    if (id) {
      handelGetBlogDetail();
    }
  }, [id]);

  const onFinish = async (values: any) => {
    const newValue = {
      ...values,
      'blog[content]': content,
      'blog[image]': image,
    };
    if (!image) {
      delete newValue['blog[image]'];
    }
    if (id) {
      setLoadingBtn(true);
      const res = await BlogsService.putBlogs(id, newValue);
      if (res.data) {
        toast.success('Update blog success!');
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
      setLoadingBtn(false);
    } else {
      setLoadingBtn(true);
      const res = await BlogsService.postBlogs(newValue);
      if (res.data) {
        toast.success('Create blog success!');
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
      setLoadingBtn(false);
    }
  };
  return (
    <div className="add-blog-page">
      <Col xs={24} md={20} lg={20} xl={18} xxl={18} className="col-blog">
        {((id && data?.data) || (!id && !data?.data)) && (
          <Form
            form={form}
            name="normal_blog"
            className="blog-form"
            layout="vertical"
            initialValues={{ 'blog[title]': data?.data?.title, 'blog[content]': data?.data?.content }}
            onFinish={onFinish}
            autoComplete="off">
            <TitleForm title={id ? 'Update Blog' : 'Create Blog'} />{' '}
            <Form.Item
              name="blog[title]"
              label="Title blog"
              rules={[
                {
                  required: true,
                  message: 'Please input Title Blog',
                },
              ]}>
              <Input placeholder="Title Blogs" />
            </Form.Item>
            <Form.Item
              name="blog[content]"
              label="Content blog"
              rules={[
                {
                  required: true,
                  message: 'Please input Content',
                },
              ]}>
              <CKEditor
                editor={ClassicEditor}
                data={data?.data?.content}
                onChange={(event: any, editor: any) => {
                  setContent(editor.getData());
                }}
              />
            </Form.Item>
            <Form.Item name="blog[image]">
              {id && data?.data && <img src={data?.data?.image?.url} className="img-blog-edit" />}
              <input id="originalFileName" type="file" accept=".jpg, .jpeg, .png" onChange={e => handleFileRead(e)} />
            </Form.Item>
            <Form.Item>
              <div className="box-btn">
                <Button type="default" onClick={() => navigate(-1)} className="login-form-button">
                  Back
                </Button>
                <Button type="primary" htmlType="submit" className="login-form-button" loading={loadingBtn}>
                  {id ? 'Update' : 'Create'}
                </Button>
              </div>
            </Form.Item>
          </Form>
        )}
      </Col>

      <Loading loading={loading} />
    </div>
  );
}
