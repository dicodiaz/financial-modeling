import PropTypes from 'prop-types';
import { Pagination } from 'react-bootstrap';

const BasicPagination = ({ active, total, onClick, message }) => {
  if (total === 0) {
    return null;
  }

  return (
    <>
      <Pagination className="mb-0 px-2 pt-2 justify-content-center">
        {total > 1 && (
          <>
            <Pagination.First onClick={() => onClick(1)} disabled={active === 1} />
            <Pagination.Prev onClick={() => onClick(active - 1)} disabled={active === 1} />
          </>
        )}
        <Pagination.Item className="w-30px" active={active === 1} onClick={() => onClick(1)}>
          1
        </Pagination.Item>
        {active === 5 && (
          <Pagination.Item className="w-30px" onClick={() => onClick(2)}>
            2
          </Pagination.Item>
        )}
        {active > 5 && (
          <Pagination.Ellipsis className="w-30px" onClick={() => onClick(active - 5)} />
        )}

        {Array.from({ length: 5 }, (_, i) => i + active - 2).map((page) => {
          if (page <= 1 || page >= total) {
            return null;
          }

          return (
            <Pagination.Item
              className="w-30px"
              key={`page-${page}`}
              active={page === active}
              onClick={() => onClick(page)}
            >
              {page}
            </Pagination.Item>
          );
        })}

        {active < total - 4 && (
          <Pagination.Ellipsis className="w-30px" onClick={() => onClick(active + 5)} />
        )}
        {active === total - 4 && (
          <Pagination.Item className="w-30px" onClick={() => onClick(total - 1)}>
            {total - 1}
          </Pagination.Item>
        )}
        {total > 1 && (
          <>
            <Pagination.Item
              className="w-30px"
              active={active === total}
              onClick={() => onClick(total)}
            >
              {total}
            </Pagination.Item>
            <Pagination.Next onClick={() => onClick(active + 1)} disabled={active === total} />
            <Pagination.Last onClick={() => onClick(total)} disabled={active === total} />
          </>
        )}
      </Pagination>
      <p className="mb-0 pt-2 text-center">{message}</p>
    </>
  );
};

BasicPagination.propTypes = {
  active: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};

export default BasicPagination;
