import { FC } from 'react';
import formatToCurrency from '../utils/formatToCurrency';
import formatToPercentage from '../utils/formatToPercentage';
import formatToSentence from '../utils/formatToSentence';

export type StatementItemProps = {
  name: string;
  value: string | number;
  reportedCurrency: string;
};

const StatementItem: FC<StatementItemProps> = ({ name, value, reportedCurrency }) => {
  if (/link/i.test(name)) {
    if (typeof value === 'number') {
      return null;
    }

    return (
      <p className="mb-0">
        <a href={value} target="_blank" rel="noreferrer">
          {formatToSentence(name)}
        </a>
      </p>
    );
  }

  const formattedName = formatToSentence(name);
  const formattedValue =
    typeof value === 'number'
      ? /ratio/i.test(name)
        ? formatToPercentage(value)
        : formatToCurrency(value, reportedCurrency)
      : value;

  return (
    <div>
      <p className="mb-0 fw-bold">{formattedName}</p>
      <p className="mb-0 ps-2 small fst-italic">{formattedValue}</p>
    </div>
  );
};

export default StatementItem;
