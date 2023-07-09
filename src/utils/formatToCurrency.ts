const formatToCurrency = (value: number, currency: string) => {
  const formatter = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency,
    maximumSignificantDigits: 6,
  });

  return formatter.format(value);
};

export default formatToCurrency;
