import { FC, useEffect, useState } from 'react';
import { Row, Spinner } from 'react-bootstrap';
import BasicPagination, { BasicPaginationProps } from '../components/BasicPagination';
import BasicSelect, { BasicSelectProps } from '../components/BasicSelect';
import Layout from '../components/Layout';
import SearchBar from '../components/SearchBar';
import Stock from '../components/Stock';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import useInput from '../hooks/use-input';
import useSelect from '../hooks/use-select';
import {
  setBalanceSheetStatements,
  setBalanceSheetStatementsError,
} from '../redux/slices/balance-sheet-statements-slice';
import {
  setCashFlowStatements,
  setCashFlowStatementsError,
} from '../redux/slices/cash-flow-statements-slice';
import {
  setIncomeStatements,
  setIncomeStatementsError,
} from '../redux/slices/income-statements-slice';
import { getStocks, selectStocks, selectStocksError } from '../redux/slices/stocks-slice';
import { StockState, STOCK_EXCHANGES, STOCK_TYPES } from '../redux/utils/types';
import getPaginationInfo, { PAGE_SIZES } from '../utils/getPaginationInfo';
import sortStocks, { SORT_TYPES } from '../utils/sortStocks';

const Home: FC = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectStocks);
  const error = useAppSelector(selectStocksError);
  const {
    value: searchValue,
    debouncedValue: debouncedSearchValue,
    onChange: onSearchChange,
    clear: searchClear,
  } = useInput({ searchParam: 'search', debounce: 150 });
  const { value: sortType, onChange: onSortTypeChange } = useSelect('a-z');
  const { value: exchangeValue, onChange: onExchangeChange } = useSelect('all');
  const { value: typeValue, onChange: onTypeChange } = useSelect('all');
  const [pageSize, setPageSize] = useState(200);
  const [activePage, setActivePage] = useState(1);
  const [sortedAndFilteredData, setSortedAndFilteredData] = useState<StockState['stocks']>();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(setIncomeStatements());
    dispatch(setIncomeStatementsError());
    dispatch(setBalanceSheetStatements());
    dispatch(setBalanceSheetStatementsError());
    dispatch(setCashFlowStatements());
    dispatch(setCashFlowStatementsError());
    if (!data) {
      dispatch(getStocks());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data) {
      setActivePage(1);
      const newSortedAndFilteredData = sortStocks(
        data.filter((stock) => {
          return (
            (stock.symbol.toLowerCase().startsWith(searchValue.toLowerCase()) ||
              stock.name.toLowerCase().startsWith(searchValue.toLowerCase())) &&
            (exchangeValue === 'all' || stock.exchangeShortName === exchangeValue) &&
            (typeValue === 'all' || stock.type === typeValue)
          );
        }),
        sortType,
      );

      setSortedAndFilteredData(newSortedAndFilteredData);
    }
  }, [data, debouncedSearchValue, exchangeValue, typeValue, sortType]);

  if (error) {
    return (
      <Layout title="Company Stocks Symbols">
        <p className="lead text-center">{error}</p>
      </Layout>
    );
  }

  if (!sortedAndFilteredData) {
    return (
      <Layout title="Company Stocks Symbols">
        <Row xs="auto" className="mx-0 justify-content-center align-items-center mt-2">
          <Spinner animation="border" />
          <p className="mb-0">Loading...</p>
        </Row>
      </Layout>
    );
  }

  const { totalPages, paginationMessage, paginatedData } = getPaginationInfo(
    pageSize,
    activePage,
    sortedAndFilteredData,
  );

  const handlePageClick: BasicPaginationProps['onClick'] = (page) => {
    setActivePage(page);
  };

  const handlePageSizeChange: BasicSelectProps['onChange'] = (e) => {
    setActivePage(1);
    setPageSize(Number(e.currentTarget.value));
  };

  return (
    <Layout title="Company Stocks Symbols">
      <SearchBar value={searchValue} onChange={onSearchChange} clear={searchClear} />
      <Row xs={2} sm={3} md={4} className="pt-2 justify-content-center">
        <BasicSelect
          data={SORT_TYPES}
          label="Sort by"
          value={sortType}
          onChange={onSortTypeChange}
        />
        <BasicSelect
          data={STOCK_EXCHANGES}
          label="Filter by exchange"
          value={exchangeValue}
          onChange={onExchangeChange}
          optionAll
        />
        <BasicSelect
          data={STOCK_TYPES}
          label="Filter by type"
          value={typeValue}
          onChange={onTypeChange}
          optionAll
        />
        <BasicSelect
          data={PAGE_SIZES}
          label="Page size"
          value={`${pageSize}`}
          onChange={handlePageSizeChange}
        />
      </Row>
      <BasicPagination
        active={activePage}
        total={totalPages}
        onClick={handlePageClick}
        message={paginationMessage}
      />
      <Row xs={2} md={3} lg={4} xl={5} className="mx-0 gx-0 pt-2">
        {paginatedData.map((stock) => (
          <Stock key={stock.symbol} data={stock} />
        ))}
      </Row>
    </Layout>
  );
};

export default Home;
