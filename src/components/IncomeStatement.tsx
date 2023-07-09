import { FC } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { IncomeStatementType } from '../redux/utils/types';
import StatementItem from './StatementItem';

export type IncomeStatementProps = {
  data: IncomeStatementType;
};

const IncomeStatement: FC<IncomeStatementProps> = ({ data }) => {
  const { calendarYear, reportedCurrency } = data;

  return (
    <Card className="rounded-0 bg-statement text-white" data-testid="statement">
      <Card.Body className="d-flex flex-column justify-content-center">
        <Row>
          <Col xs="auto" className="d-flex flex-column justify-content-center">
            <Card.Title className="mb-0">{calendarYear}</Card.Title>
          </Col>
          <Col>
            {Object.entries(data).map(([label, value]) => {
              return (
                <StatementItem
                  key={label}
                  label={label}
                  value={value}
                  reportedCurrency={reportedCurrency}
                />
              );
            })}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default IncomeStatement;
