import { Col, Row, Input, Button, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { DashOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Blogs, BlogsDetail } from '../../../models/Blogs';

import BlogsService from '../../../services/blogs.service';
import moment from 'moment';
import './style.scss';
import Loading from '../../../components/loading';
import { useParams } from 'react-router-dom';
import Comment from '../../comment';

export default function BlogDetailPage() {
  const param = useParams();
  const id = param.id;
  const [data, setData] = useState<BlogsDetail>();
  const [loading, setLoading] = useState(false);

  const handelGetBlogDetail = async () => {
    setLoading(true);
    const res = await BlogsService.getBlogsDetail(id);
    setData(res);
    setLoading(false);
    console.log(res);
  };

  useEffect(() => {
    if (id) {
      handelGetBlogDetail();
    }
  }, [id]);

  return (
    <div className="card-page blog-detail-page">
      <Col xs={24} md={20} lg={20} xl={18} xxl={16} className="col-page">
        <img src={data?.data?.image?.url} alt="img-blog" className="img-blog-detail" />
        <div className=" main-blog-detail">
          <h3 className="title-blog-detail">{data?.data?.title}</h3>
          <div className="content-blog">
            <CKEditor
              disabled={true}
              editor={ClassicEditor}
              data={data?.data?.content}
              config={{
                toolbar: ['bold', 'italic', 'bulletedList', '|', 'numberedList', 'alignment'],
                // removePlugins: ['Heading', 'Link'],
                isReadOnly: true,
              }}
            />
          </div>
          <div className="cmt-count">
            <p className="create-blog">{data?.data?.comments_count} comment</p>
            <p className="create-blog">Create at {moment(data?.data?.created_at).startOf('hour').fromNow()}</p>
          </div>
        </div>

        <div className="comment">
          <Comment id={id} />
        </div>
      </Col>
      <Loading loading={loading} />
    </div>
  );
}
