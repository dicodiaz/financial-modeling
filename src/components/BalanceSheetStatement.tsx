import { FC } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { BalanceSheetStatementType } from '../redux/utils/types';
import StatementItem from './StatementItem';

export type BalanceSheetStatementProps = {
  data: BalanceSheetStatementType;
};

const BalanceSheetStatement: FC<BalanceSheetStatementProps> = ({ data }) => {
  const { calendarYear, reportedCurrency } = data;

  return (
    <Card data-testid="statement" className="rounded-0 bg-statement text-white">
      <Card.Body className="d-flex flex-column justify-content-center">
        <Row>
          <Col xs="auto" className="d-flex flex-column justify-content-center">
            <Card.Title className="mb-0">{calendarYear}</Card.Title>
          </Col>
          <Col>
            {Object.entries(data).map(([name, value]) => {
              if (name === 'calendarYear') {
                return null;
              }

              return (
                <StatementItem
                  key={name}
                  name={name}
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

export default BalanceSheetStatement;
