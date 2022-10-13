import { ArrowDownOutlined, ArrowUpOutlined, DashOutlined } from '@ant-design/icons';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { Button, Col, Empty, Input, Modal, Popover, Row, Select } from 'antd';
import { useEffect, useState } from 'react';
import { Blogs } from '../../models/Blogs';

import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../../components/loading';
import PaginationPage from '../../components/pagination';
import { useAppSelector } from '../../hook';
import BlogsService from '../../services/blogs.service';
import { debounce } from '../../utils/common';
import { SORT } from '../../utils/constants';
import './style.scss';

const { Option } = Select;

export default function HomePage() {
  const navigate = useNavigate();
  const [data, setData] = useState<Blogs>();
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<string>(SORT.DESC);
  const [sortBy, setSortBy] = useState<string>('created_at');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [idBlog, setIdBlog] = useState<string | number>();
  const { userInfo } = useAppSelector(state => state.user);
  const [timeout, setTimeOut] = useState(null);

  const opitonSort = [
    {
      label: 'ID',
      value: 'id',
    },
    {
      label: 'Title',
      value: 'title',
    },
    {
      label: 'Content',
      value: 'content',
    },
    {
      label: 'Created at',
      value: 'created_at',
    },
    {
      label: 'Updated at',
      value: 'updated_at',
    },
  ];

  const handleChangePage = (valuePage: number, valuePageSize: number) => {
    setPage(valuePage);
    setPageSize(valuePageSize);
  };

  const handleSortBy = (value: string) => {
    setSortBy(value);
  };

  const handelGetBlog = async () => {
    setLoading(!search && true);
    const res = await BlogsService.getAllBlogs(page, pageSize, search, sortBy, sortDirection);
    setData(res);
    setLoading(false);
  };

  useEffect(() => {
    if (search) {
      debounce(timeout, setTimeOut, handelGetBlog);
    } else {
      handelGetBlog();
    }
  }, [page, pageSize, search, sortBy, sortDirection]);

  const showModal = (id: string | number) => {
    setIsModalOpen(true);
    setIdBlog(id);
  };

  const handleOk = async () => {
    if (idBlog) {
      await BlogsService.deleteBlogs(idBlog);
      toast.success('Delete blog success!');
      handelGetBlog();
      setIsModalOpen(false);
    }
  };

  const content = (id: string | number) => (
    <div className="box-content">
      <div className="btn-add" onClick={() => navigate(`/edit/${id}`)}>
        Edit
      </div>
      <div className="btn-add" onClick={() => showModal(id)}>
        Delete
      </div>
    </div>
  );

  return (
    <div className="blog-page">
      <Row gutter={24} className="row-search">
        <Col xs={24} md={24} lg={24} xl={16} xxl={16} className="block-search">
          <Button type="primary" className="btn-search" onClick={() => navigate('/add')}>
            Create
          </Button>
          <Input type="text" placeholder="Search" onChange={e => setSearch(e.target.value)} />
        </Col>

        <Col xs={24} md={24} lg={24} xl={8} xxl={8} className="block-sort">
          <div className="left-sort">
            <span className="title-sort">Sort by:</span>
            <Select defaultValue={sortBy} style={{ width: 120 }} onChange={handleSortBy}>
              {opitonSort.map((item, index) => (
                <Option key={index} value={item.value}>
                  {item.label}
                </Option>
              ))}
            </Select>
          </div>
          <div className="right-sort">
            <div
              className={`${sortDirection === SORT.DESC && 'active-btn-sort'} btn-sort`}
              onClick={() => setSortDirection(SORT.DESC)}>
              <ArrowDownOutlined />
            </div>
            <div
              className={`${sortDirection === SORT.ASC && 'active-btn-sort'} btn-sort`}
              onClick={() => setSortDirection(SORT.ASC)}>
              <ArrowUpOutlined />
            </div>
          </div>
        </Col>
      </Row>
      {data?.data?.items && data?.data?.items.length > 0 ? (
        data?.data.items.map((item, index) => (
          <div className="item-blog" key={index}>
            <Row gutter={24}>
              <Col
                xs={16}
                md={8}
                lg={6}
                xl={4}
                xxl={4}
                className="col-blog-img"
                onClick={() => navigate(`/${item.id}`)}>
                <img src={item?.image?.url} alt="img-blog" className="img-blog" />
              </Col>

              <Col xs={24} md={20} lg={18} xl={20} xxl={20}>
                <div className="left-blog">
                  <div className="col-blog-main">
                    <h4 className="title-blog" onClick={() => navigate(`/${item.id}`)}>
                      {item?.title}
                    </h4>
                    <Popover placement="bottomRight" content={content(item?.id)} trigger="click">
                      <DashOutlined />
                    </Popover>
                  </div>
                  <div className="content-blog" onClick={() => navigate(`/${item.id}`)}>
                    <CKEditor
                      disabled={true}
                      editor={ClassicEditor}
                      data={item?.content}
                      config={{
                        toolbar: ['bold', 'italic', 'bulletedList', '|', 'numberedList', 'alignment'],
                        // removePlugins: ['Heading', 'Link'],
                        isReadOnly: true,
                      }}
                    />
                  </div>
                  <div className="cmt-count">
                    <p className="create-blog">{item?.comments_count} comment</p>
                    <p className="create-blog">Create at {moment(item?.created_at).startOf('hour').fromNow()}</p>
                  </div>
                </div>
                <div className="more-blog"></div>
              </Col>
            </Row>
          </div>
        ))
      ) : (
        <div className="empty">
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        </div>
      )}
      <PaginationPage
        currentPage={page}
        totalPages={data?.pagination?.count}
        pageSize={pageSize}
        onChange={handleChangePage}
      />
      <Modal title="Delete Blog" open={isModalOpen} onOk={() => handleOk()} onCancel={() => setIsModalOpen(false)}>
        <h4 className="q-delete">Are you sure Delete?</h4>
      </Modal>
      <Loading loading={loading} />
    </div>
  );
}
