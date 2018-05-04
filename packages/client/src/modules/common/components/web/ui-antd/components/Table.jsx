import React from 'react';
import PropTypes from 'prop-types';
import ADTable from 'antd/lib/table';
import { Pagination } from 'antd';
import { Button } from '../components';
import paginationConfig from '../../../../../../../../../config/pagination';

// pagination accepts 'standard' and 'relay' params
const Table = ({ totalCount, handlePageChange, hasNextPage, pagination, loadMoreText, ...props }) => {
  return (
    <div>
      <ADTable pagination={false} {...props} rowKey="id" />
      {renderPagination(props.dataSource, handlePageChange, hasNextPage, pagination, totalCount, loadMoreText)}
    </div>
  );
};

const renderPagination = (dataSource, handlePageChange, hasNextPage, pagination, totalCount, loadMoreText) => {
  switch (pagination) {
    case paginationConfig.paginationTypes.relay:
      if (hasNextPage) {
        return (
          <div>
            <div>
              <small>
                ({dataSource.length} / {totalCount})
              </small>
            </div>
            <Button id="load-more" color="primary" onClick={() => handlePageChange(pagination)}>
              {loadMoreText}
            </Button>
          </div>
        );
      }
      break;
    case paginationConfig.paginationTypes.standard:
      return (
        <Pagination
          className="pagination"
          defaultCurrent={1}
          total={totalCount}
          onChange={pageNumber => handlePageChange(pagination, pageNumber)}
        />
      );
  }
};

Table.propTypes = {
  children: PropTypes.node,
  dataSource: PropTypes.array,
  totalCount: PropTypes.number,
  handlePageChange: PropTypes.func,
  hasNextPage: PropTypes.bool,
  pagination: PropTypes.string,
  loadMoreText: PropTypes.string
};

export default Table;
