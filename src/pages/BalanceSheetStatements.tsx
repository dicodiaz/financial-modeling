import { useEffect } from 'react';
import { Row, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import BalanceSheetStatement from '../components/BalanceSheetStatement';
import Layout from '../components/Layout';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import {
  getBalanceSheetStatementsBySymbol,
  selectBalanceSheetStatements,
  selectBalanceSheetStatementsError,
} from '../redux/slices/balance-sheet-statements-slice';

const BalanceSheetStatements = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectBalanceSheetStatements);
  const error = useAppSelector(selectBalanceSheetStatementsError);
  const { symbol } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (symbol && !data) {
      dispatch(getBalanceSheetStatementsBySymbol(symbol));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return (
      <Layout title={`Balance Sheet Statements - ${symbol}`} backBtnLink={`/stocks/${symbol}`}>
        <p className="lead text-center">{error}</p>
      </Layout>
    );
  }

  if (!data) {
    return (
      <Layout title={`Balance Sheet Statements - ${symbol}`} backBtnLink={`/stocks/${symbol}`}>
        <Row xs="auto" className="mx-0 justify-content-center align-items-center mt-2">
          <Spinner animation="border" />
          <p className="mb-0">Loading...</p>
        </Row>
      </Layout>
    );
  }

  return (
    <Layout title={`Balance Sheet Statements - ${symbol}`} backBtnLink={`/stocks/${symbol}`}>
      <Row xs={1} md={2} xl={3} className="mx-0 gx-0 pt-md-2 pt-xxl-3">
        {data.map((balanceSheetStatement) => {
          return (
            <BalanceSheetStatement
              key={balanceSheetStatement.calendarYear}
              data={balanceSheetStatement}
            />
          );
        })}
      </Row>
    </Layout>
  );
};

export default BalanceSheetStatements;
