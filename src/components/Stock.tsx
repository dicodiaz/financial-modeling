import { FC } from 'react';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { StockType } from '../redux/utils/types';
import StatementItem from './StatementItem';

export type StockProps = {
  data: StockType;
};

const Stock: FC<StockProps> = ({ data }) => {
  const navigate = useNavigate();
  const { symbol } = data;

  return (
    <Card role="button" className="rounded-0 bg-stock text-white" onClick={() => navigate(symbol)}>
      <Card.Body>
        <Card.Title>{symbol}</Card.Title>
        {Object.entries(data).map(([name, value]) => {
          if (['symbol', 'exchange'].includes(name)) {
            return null;
          }

          return <StatementItem key={name} name={name} value={value} reportedCurrency="USD" />;
        })}
      </Card.Body>
    </Card>
  );
};

export default Stock;
