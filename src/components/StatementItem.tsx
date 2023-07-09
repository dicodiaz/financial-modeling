import { FC } from 'react';
import formatToCurrency from '../utils/formatToCurrency';
import formatToPercentage from '../utils/formatToPercentage';
import formatToSentence from '../utils/formatToSentence';

export type StatementItemProps = {
  label: string;
  value: string | number;
  reportedCurrency: string;
};

const StatementItem: FC<StatementItemProps> = ({ label, value, reportedCurrency }) => {
  if (label === 'calendarYear') {
    return null;
  }

  if (/link/i.test(label)) {
    if (typeof value === 'number') {
      return null;
    }

    return (
      <p className="mb-0">
        <a href={value} target="_blank" rel="noreferrer">
          {formatToSentence(label)}
        </a>
      </p>
    );
  }

  const formattedLabel = formatToSentence(label);
  const formattedValue =
    typeof value === 'number'
      ? /ratio/i.test(label)
        ? formatToPercentage(value)
        : formatToCurrency(value, reportedCurrency)
      : value;

  return (
    <div>
      <p className="mb-0 fw-bold">{formattedLabel}</p>
      <p className="mb-0 ps-2 small fst-italic">{formattedValue}</p>
    </div>
  );
};

export default StatementItem;
