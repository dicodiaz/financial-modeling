import { useEffect } from 'react';
import { Col, Row, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { LinkWithSearchParams } from '../components/LinkWithSearchParams';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import { getStocks, selectStocks, selectStocksError } from '../redux/slices/stocks-slice';

const CompanyFinancialStatements = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectStocks);
  const error = useAppSelector(selectStocksError);
  const { symbol } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!data) {
      dispatch(getStocks());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return (
      <Layout title="Company Financial Statements" backBtnLink="/stocks">
        <p className="lead text-center">{error}</p>
      </Layout>
    );
  }

  if (!data) {
    return (
      <Layout title="Company Financial Statements" backBtnLink="/stocks">
        <Row xs="auto" className="mx-0 justify-content-center align-items-center mt-2">
          <Spinner animation="border" />
          <p className="mb-0">Loading...</p>
        </Row>
      </Layout>
    );
  }

  const { name: companyName } = data?.find((stock) => stock.symbol === symbol) ?? {};

  return (
    <Layout title="Company Financial Statements" backBtnLink="/stocks">
      <h2 className="h5 mb-3">
        Choose the information that you would like to see for the company <em>{companyName}</em>:
      </h2>
      <Row className="mx-0 gx-0 gy-2 justify-content-center" xs={1}>
        <Col xs={8} sm={7} md={6} lg={5} xl={4} xxl={3}>
          <LinkWithSearchParams to="income-statements" className="btn btn-outline-light w-100">
            Income Statements
          </LinkWithSearchParams>
        </Col>
        <Col className="mt-0" />
        <Col xs={8} sm={7} md={6} lg={5} xl={4} xxl={3}>
          <LinkWithSearchParams
            to="balance-sheet-statements"
            className="btn btn-outline-light w-100"
          >
            Balance Sheet Statements
          </LinkWithSearchParams>
        </Col>
        <Col className="mt-0" />
        <Col xs={8} sm={7} md={6} lg={5} xl={4} xxl={3}>
          <LinkWithSearchParams to="cash-flow-statements" className="btn btn-outline-light w-100">
            Cash Flow Statements
          </LinkWithSearchParams>
        </Col>
      </Row>
    </Layout>
  );
};

export default CompanyFinancialStatements;
