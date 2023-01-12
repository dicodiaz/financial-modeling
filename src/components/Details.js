import { useEffect, useState } from 'react';
import { Row, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { getIncomeStatementsBySymbol } from '../services/getData';
import IncomeStatement from './IncomeStatement';
import PageTemplate from './PageTemplate';

const Details = () => {
  const { symbol } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      window.scrollTo(0, 0);
      const data = await getIncomeStatementsBySymbol(symbol);
      setData(data);
    };
    fetchData();
  }, [symbol]);

  if (!data) {
    return (
      <PageTemplate title={`Income Statements - ${symbol}`} backBtn>
        <Row xs="auto" className="mx-0 justify-content-center align-items-center mt-2">
          <Spinner animation="border" />
          <p className="mb-0">Loading...</p>
        </Row>
      </PageTemplate>
    );
  }

  if (data['Error Message']) {
    return (
      <PageTemplate title={`Income Statements - ${symbol}`} backBtn>
        <Row xs="auto" className="mx-0 justify-content-center align-items-center mt-2">
          <p className="lead">Sorry, something went wrong</p>
          <p>Error Message: {data['Error Message']}</p>
        </Row>
      </PageTemplate>
    );
  }

  return (
    <PageTemplate title={`Income Statements - ${symbol}`} backBtn>
      <Row xs={1} md={2} xl={3} className="mx-0 gx-0 pt-md-2 pt-xxl-3">
        {data.map((incomeStatement) => (
          <IncomeStatement
            key={`${symbol}-${incomeStatement.calendarYear}`}
            data={incomeStatement}
          />
        ))}
      </Row>
    </PageTemplate>
  );
};

export default Details;
