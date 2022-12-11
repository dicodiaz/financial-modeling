import { useEffect, useState } from 'react';
import { Row, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import useInputHook from '../hooks/inputHook';
import { getSymbolListFromAPI } from '../redux/ducks/financialModeling';
import BasicPagination from './BasicPagination';
import PageTemplate from './PageTemplate';
import SearchBar from './SearchBar';
import Symbol from './Symbol';

const PAGE_SIZE = 500;

const Home = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.financialModelingReducer.symbolList);
  const { value: symbolValue, onChange: onSymbolChange, clear: symbolClear } = useInputHook('');
  const [activePage, setActivePage] = useState(1);
  const [filteredData, setFilteredData] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!data) {
      dispatch(getSymbolListFromAPI());
    }
  }, []);

  useEffect(() => {
    if (data) {
      const newFilteredData = data.slice(PAGE_SIZE * (activePage - 1), PAGE_SIZE * activePage);
      setFilteredData(newFilteredData);
    }
  }, [data, activePage]);

  const handlePageClick = (page) => {
    setActivePage(page);
  };

  if (!filteredData) {
    return (
      <PageTemplate title="Financial Statements Symbols">
        <Row xs="auto" className="mx-0 justify-content-center align-items-center mt-2">
          <Spinner animation="border" />
          <p className="mb-0">Loading...</p>
        </Row>
      </PageTemplate>
    );
  }

  const totalPages = Math.ceil(data.length / PAGE_SIZE);
  const firstShown = PAGE_SIZE * (activePage - 1) + 1;
  const lastShown = PAGE_SIZE * activePage < data.length ? PAGE_SIZE * activePage : data.length;

  return (
    <PageTemplate title="Financial Statements Symbols">
      <SearchBar value={symbolValue} onChange={onSymbolChange} clear={symbolClear} />
      <BasicPagination active={activePage} total={totalPages} onClick={handlePageClick} />
      <p className="mb-0 pt-2 text-center">
        Showing {firstShown} - {lastShown} of {data.length}
      </p>
      <Row xs={2} md={3} lg={4} xl={5} className="mx-0 gx-0 pt-2">
        {filteredData
          .filter((symbol) => symbol.toLowerCase().startsWith(symbolValue.toLowerCase()))
          .map((symbol) => (
            <Symbol key={symbol.id} data={symbol} />
          ))}
      </Row>
    </PageTemplate>
  );
};

export default Home;
