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
  const [paginatedData, setPaginatedData] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!data) {
      dispatch(getSymbolListFromAPI());
    }
  }, []);

  useEffect(() => {
    if (data) {
      const newFilteredData = data.filter((symbol) =>
        symbol.toLowerCase().startsWith(symbolValue.toLowerCase()),
      );
      setFilteredData(newFilteredData);
      const newPaginatedData = newFilteredData.slice(
        PAGE_SIZE * (activePage - 1),
        PAGE_SIZE * activePage,
      );
      setPaginatedData(newPaginatedData);
    }
  }, [data, activePage, symbolValue]);

  useEffect(() => {
    setActivePage(1);
  }, [symbolValue]);

  const handlePageClick = (page) => {
    setActivePage(page);
  };

  if (!paginatedData) {
    return (
      <PageTemplate title="Financial Statements Symbols">
        <Row xs="auto" className="mx-0 justify-content-center align-items-center mt-2">
          <Spinner animation="border" />
          <p className="mb-0">Loading...</p>
        </Row>
      </PageTemplate>
    );
  }

  const totalPages = Math.ceil(filteredData.length / PAGE_SIZE);
  const firstShown = PAGE_SIZE * (activePage - 1) + 1;
  const lastShown =
    PAGE_SIZE * activePage < filteredData.length ? PAGE_SIZE * activePage : filteredData.length;
  const paginationMessage = `Showing ${firstShown}${
    lastShown > firstShown ? ` - ${lastShown}` : ''
  } of ${filteredData.length}`;

  return (
    <PageTemplate title="Financial Statements Symbols">
      <SearchBar value={symbolValue} onChange={onSymbolChange} clear={symbolClear} />
      <BasicPagination
        active={activePage}
        total={totalPages}
        onClick={handlePageClick}
        message={paginationMessage}
      />

      <Row xs={2} md={3} lg={4} xl={5} className="mx-0 gx-0 pt-2">
        {paginatedData.map((symbol) => (
          <Symbol key={symbol.id} data={symbol} />
        ))}
      </Row>
    </PageTemplate>
  );
};

export default Home;
