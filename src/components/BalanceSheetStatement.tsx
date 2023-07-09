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
    <Card className="rounded-0 bg-statement" data-testid="statement">
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

export default BalanceSheetStatement;
