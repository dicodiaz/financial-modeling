const formatToCurrency = (num, currency) => {
  const formatter = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency,
  });

  return formatter.format(num);
};

export default formatToCurrency;
