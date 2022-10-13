import React from 'react';
import { Pagination } from 'antd';

import './style.scss';

interface Props {
  currentPage: number;
  totalPages: number | undefined;
  pageSize: number | undefined;
  onChange: (page: number, pageSize: number) => void;
}

export default function PaginationPage({ currentPage, totalPages, pageSize, onChange }: Props): JSX.Element {
  return (
    <div className="pagination-page">
      <Pagination current={currentPage} total={totalPages} defaultPageSize={pageSize} onChange={onChange} />
    </div>
  );
}
