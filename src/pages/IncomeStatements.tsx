import { useEffect } from 'react';
import { Row, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import IncomeStatement from '../components/IncomeStatement';
import Layout from '../components/Layout';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import {
  getIncomeStatementsBySymbol,
  selectIncomeStatements,
  selectIncomeStatementsError,
} from '../redux/slices/income-statements-slice';

const IncomeStatements = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectIncomeStatements);
  const error = useAppSelector(selectIncomeStatementsError);
  const { symbol } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (symbol && !data) {
      dispatch(getIncomeStatementsBySymbol(symbol));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return (
      <Layout title={`Income Statements - ${symbol}`} backBtnLink={`/stocks/${symbol}`}>
        <p className="lead text-center">{error}</p>
      </Layout>
    );
  }

  if (!data) {
    return (
      <Layout title={`Income Statements - ${symbol}`} backBtnLink={`/stocks/${symbol}`}>
        <Row xs="auto" className="mx-0 justify-content-center align-items-center mt-2">
          <Spinner animation="border" />
          <p className="mb-0">Loading...</p>
        </Row>
      </Layout>
    );
  }

  return (
    <Layout title={`Income Statements - ${symbol}`} backBtnLink={`/stocks/${symbol}`}>
      <Row xs={1} md={2} xl={3} className="mx-0 gx-0 pt-md-2 pt-xxl-3">
        {data.map((incomeStatement) => {
          return <IncomeStatement key={incomeStatement.calendarYear} data={incomeStatement} />;
        })}
      </Row>
    </Layout>
  );
};

export default IncomeStatements;
