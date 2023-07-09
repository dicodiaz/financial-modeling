const ACRONYMS = ['cik', 'ebitda', 'eps'];
const HYBRIDS: Record<string, string> = { ebitdaratio: 'ebitda', epsdiluted: 'eps' };
const SPECIALS: Record<string, string> = { exchangeShortName: 'Exchange' };

const formatToSentence = (label: string) => {
  if (ACRONYMS.includes(label)) {
    return label.toUpperCase();
  }

  if (Object.keys(HYBRIDS).includes(label)) {
    return `${HYBRIDS[label].toUpperCase()} ${label
      .replace(HYBRIDS[label], '')
      .replace(/^./, (str) => str.toUpperCase())}`;
  }

  if (SPECIALS[label]) {
    return SPECIALS[label];
  }

  return label
    .replace(/((?<!^)[A-Z](?![A-Z]))(?=\S)/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase());
};

export default formatToSentence;
