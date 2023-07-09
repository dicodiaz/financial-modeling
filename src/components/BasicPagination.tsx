import { FC } from 'react';
import { Pagination } from 'react-bootstrap';

export type BasicPaginationProps = {
  active: number;
  total: number;
  onClick: (page: number) => void;
  message: string;
};

const BasicPagination: FC<BasicPaginationProps> = ({ active, total, onClick, message }) => {
  if (total === 0) {
    return null;
  }

  if (total <= 7) {
    return (
      <>
        <Pagination className="mb-0 px-2 pt-3 justify-content-center">
          {total > 1 && (
            <>
              <Pagination.First onClick={() => onClick(1)} disabled={active === 1} />
              <Pagination.Prev onClick={() => onClick(active - 1)} disabled={active === 1} />
            </>
          )}

          {Array.from({ length: total }, (_, i) => i + 1).map((page) => {
            return (
              <Pagination.Item key={page} active={page === active} onClick={() => onClick(page)}>
                {page}
              </Pagination.Item>
            );
          })}

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
      <Pagination className="mb-0 px-2 pt-3 justify-content-center">
        <Pagination.First onClick={() => onClick(1)} disabled={active === 1} />
        <Pagination.Prev onClick={() => onClick(active - 1)} disabled={active === 1} />

        {active <= 4 &&
          Array.from({ length: 5 }, (_, i) => i + 1).map((page) => {
            return (
              <Pagination.Item key={page} active={page === active} onClick={() => onClick(page)}>
                {page}
              </Pagination.Item>
            );
          })}

        {active > 4 && (
          <>
            <Pagination.Item onClick={() => onClick(1)}>1</Pagination.Item>
            <Pagination.Ellipsis onClick={() => onClick(active - 3)} />
          </>
        )}

        {active > 4 &&
          active < total - 3 &&
          Array.from({ length: 3 }, (_, i) => i + active - 1).map((page) => {
            return (
              <Pagination.Item key={page} active={page === active} onClick={() => onClick(page)}>
                {page}
              </Pagination.Item>
            );
          })}

        {active < total - 3 && (
          <>
            <Pagination.Ellipsis onClick={() => onClick(active + 3)} />
            <Pagination.Item active={active === total} onClick={() => onClick(total)}>
              {total}
            </Pagination.Item>
          </>
        )}

        {active >= total - 3 &&
          Array.from({ length: 5 }, (_, i) => i + total - 4).map((page) => {
            return (
              <Pagination.Item key={page} active={page === active} onClick={() => onClick(page)}>
                {page}
              </Pagination.Item>
            );
          })}

        <Pagination.Next onClick={() => onClick(active + 1)} disabled={active === total} />
        <Pagination.Last onClick={() => onClick(total)} disabled={active === total} />
      </Pagination>
      <p className="mb-0 pt-2 text-center">{message}</p>
    </>
  );
};

export default BasicPagination;
