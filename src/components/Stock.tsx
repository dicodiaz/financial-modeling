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
    <Card
      data-testid="stock"
      role="button"
      className="rounded-0 bg-stock text-white"
      onClick={() => navigate(symbol)}
    >
      <Card.Body>
        <Card.Title>{symbol}</Card.Title>
        {Object.entries(data).map(([label, value]) => {
          if (['symbol', 'exchange'].includes(label)) {
            return null;
          }

          return <StatementItem key={label} label={label} value={value} reportedCurrency="USD" />;
        })}
      </Card.Body>
    </Card>
  );
};

export default Stock;
