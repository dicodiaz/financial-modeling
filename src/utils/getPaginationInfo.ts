import { StockType } from '../redux/utils/types';

export enum PAGE_SIZES {
  '200 stocks' = '200',
  '500 stocks' = '500',
  '800 stocks' = '800',
}

const getPaginationInfo = (
  pageSize: number,
  activePage: number,
  sortedAndFilteredData: StockType[],
) => {
  const totalPages = Math.ceil(sortedAndFilteredData.length / pageSize);
  const firstShown = pageSize * (activePage - 1) + 1;
  const lastShown = Math.min(pageSize * activePage, sortedAndFilteredData.length);
  const paginationMessage = `Showing ${firstShown}${
    lastShown > firstShown ? ` - ${lastShown}` : ''
  } of ${sortedAndFilteredData.length}`;
  const paginatedData = sortedAndFilteredData.slice(
    pageSize * (activePage - 1),
    pageSize * activePage,
  );

  return { totalPages, paginationMessage, paginatedData };
};

export default getPaginationInfo;
