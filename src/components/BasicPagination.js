import PropTypes from 'prop-types';
import { Pagination } from 'react-bootstrap';

const BasicPagination = ({ active, total, onClick, message }) => {
  if (total === 0) {
    return null;
  }

  if (total <= 9) {
    return (
      <>
        <Pagination className="mb-0 px-2 pt-2 justify-content-center">
          {total > 1 && (
            <>
              <Pagination.First onClick={() => onClick(1)} disabled={active === 1} />
              <Pagination.Prev onClick={() => onClick(active - 1)} disabled={active === 1} />
            </>
          )}

          {Array.from({ length: total }, (_, i) => i + 1).map((page) => (
            <Pagination.Item
              className="w-30px"
              key={`page-${page}`}
              active={page === active}
              onClick={() => onClick(page)}
            >
              {page}
            </Pagination.Item>
          ))}

          {total > 1 && (
            <>
              <Pagination.Next onClick={() => onClick(active + 1)} disabled={active === total} />
              <Pagination.Last onClick={() => onClick(total)} disabled={active === total} />
            </>
          )}
        </Pagination>
        <p className="mb-0 pt-2 text-center">{message}</p>
      </>
    );
  }

  return (
    <>
      <Pagination className="mb-0 px-2 pt-2 justify-content-center">
        <Pagination.First onClick={() => onClick(1)} disabled={active === 1} />
        <Pagination.Prev onClick={() => onClick(active - 1)} disabled={active === 1} />

        {active <= 5 &&
          Array.from({ length: 7 }, (_, i) => i + 1).map((page) => (
            <Pagination.Item
              className="w-30px"
              key={`page-${page}`}
              active={page === active}
              onClick={() => onClick(page)}
            >
              {page}
            </Pagination.Item>
          ))}

        {active > 5 && (
          <>
            <Pagination.Item className="w-30px" onClick={() => onClick(1)}>
              1
            </Pagination.Item>
            <Pagination.Ellipsis className="w-30px" onClick={() => onClick(active - 5)} />
          </>
        )}

        {active > 5 &&
          active < total - 4 &&
          Array.from({ length: 5 }, (_, i) => i + active - 2).map((page) => (
            <Pagination.Item
              className="w-30px"
              key={`page-${page}`}
              active={page === active}
              onClick={() => onClick(page)}
            >
              {page}
            </Pagination.Item>
          ))}

        {active < total - 4 && (
          <>
            <Pagination.Ellipsis className="w-30px" onClick={() => onClick(active + 5)} />
            <Pagination.Item
              className="w-30px"
              active={active === total}
              onClick={() => onClick(total)}
            >
              {total}
            </Pagination.Item>
          </>
        )}

        {active >= total - 4 &&
          Array.from({ length: 7 }, (_, i) => i + total - 6).map((page) => (
            <Pagination.Item
              className="w-30px"
              key={`page-${page}`}
              active={page === active}
              onClick={() => onClick(page)}
            >
              {page}
            </Pagination.Item>
          ))}

        <Pagination.Next onClick={() => onClick(active + 1)} disabled={active === total} />
        <Pagination.Last onClick={() => onClick(total)} disabled={active === total} />
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
