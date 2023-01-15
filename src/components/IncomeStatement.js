import PropTypes from 'prop-types';
import { Card, Col, Row } from 'react-bootstrap';
import formatToCurrency from '../utils/formatToCurrency';

const IncomeStatement = ({ data }) => {
  const {
    calendarYear,
    reportedCurrency,
    period,
    cik,
    ebitda,
    eps,
    incomeBeforeTax,
    netIncome,
    operatingIncome,
    link,
    finalLink,
  } = data;

  return (
    <Card className="rounded-0 h-100 bg-income-statement" data-testid="income-statement">
      <Card.Body className="d-flex flex-column justify-content-center">
        <Row>
          <Col xs={2} className="d-flex flex-column justify-content-center">
            <Card.Title className="mb-0">{calendarYear}</Card.Title>
          </Col>
          <Col xs={10}>
            <Row xs={1}>
              <Col>Reported Currency: {reportedCurrency}</Col>
              <Col>Period: {period}</Col>
              <Col>CIK: {cik}</Col>
              <Col>EBITDA: {formatToCurrency(ebitda, reportedCurrency)}</Col>
              <Col>EPS: {eps}</Col>
              <Col>Income Before Tax: {formatToCurrency(incomeBeforeTax, reportedCurrency)}</Col>
              <Col>Net Income: {formatToCurrency(netIncome, reportedCurrency)}</Col>
              <Col>Operating Income: {formatToCurrency(operatingIncome, reportedCurrency)}</Col>
              <Col>
                <a href={link} target="_blank" rel="noreferrer">
                  Link
                </a>
              </Col>
              <Col>
                <a href={finalLink} target="_blank" rel="noreferrer">
                  Final Link
                </a>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

IncomeStatement.propTypes = {
  data: PropTypes.shape({
    calendarYear: PropTypes.string,
    reportedCurrency: PropTypes.string,
    period: PropTypes.string,
    cik: PropTypes.string,
    ebitda: PropTypes.number,
    eps: PropTypes.number,
    incomeBeforeTax: PropTypes.number,
    netIncome: PropTypes.number,
    operatingIncome: PropTypes.number,
    link: PropTypes.string,
    finalLink: PropTypes.string,
  }).isRequired,
};

export default IncomeStatement;
