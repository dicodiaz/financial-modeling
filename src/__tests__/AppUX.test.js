import { fireEvent, render, within } from '@testing-library/react';
import fetchMock from 'fetch-mock';
import { Provider } from 'react-redux';
import App from '../App';
import store from '../redux/store';
import { API_KEY, BASE_URL } from '../services/getData';
import mockIncomeStatements from '../__mocks__/mockIncomeStatements';
import mockSymbolList from '../__mocks__/mockSymbolList';

describe('testing UX for the whole App', () => {
  global.scrollTo = jest.fn();
  fetchMock.get(`${BASE_URL}income-statement/ETH?apikey=${API_KEY}`, () => mockIncomeStatements);
  fetchMock.get(
    `${BASE_URL}financial-statement-symbol-lists?apikey=${API_KEY}`,
    () => mockSymbolList,
  );

  test('testing homepage, details page, navigation between both, and snapshot', async () => {
    const tree = render(
      <Provider store={store}>
        <App />
      </Provider>,
    );
    // homepage
    let symbols = await tree.findAllByTestId('symbol');
    expect(symbols).toHaveLength(500);
    const inputSymbol = tree.getByRole('textbox');
    fireEvent.change(inputSymbol, { target: { value: 'ETH' } });
    symbols = tree.getAllByTestId('symbol');
    expect(within(symbols[0]).getByText('ETH')).toBeTruthy();
    expect(tree.queryByTestId('backBtn')).toBeFalsy();
    // navigation to details page
    fireEvent.click(symbols[0]);
    // details page
    const incomeStatements = await tree.findAllByTestId('income-statement');
    expect(incomeStatements).toHaveLength(5);
    // navigation to homepage
    const backBtn = tree.getByTestId('backBtn');
    fireEvent.click(backBtn);
    expect(tree.getAllByTestId('symbol')).toBeTruthy();
    // snapshot
    expect(tree.container).toMatchSnapshot();
  });
});
