import { render } from '@testing-library/react';
import fetchMock from 'fetch-mock';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import BasicPagination from '../components/BasicPagination';
import Details from '../components/Details';
import Header from '../components/Header';
import Home from '../components/Home';
import IncomeStatement from '../components/IncomeStatement';
import PageTemplate from '../components/PageTemplate';
import SearchBar from '../components/SearchBar';
import Symbol from '../components/Symbol';
import store from '../redux/store';
import { API_KEY, BASE_URL } from '../services/getData';
import mockIncomeStatements, { mockIncomeStatement } from '../__mocks__/mockIncomeStatements';
import mockSymbolList, { mockSymbol } from '../__mocks__/mockSymbolList';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useParams: () => ({
    symbol: mockSymbol,
  }),
}));

describe('testing snapshots for my components', () => {
  global.scrollTo = jest.fn();
  const mockFunction = jest.fn();
  fetchMock.get(
    `${BASE_URL}income-statement/${mockSymbol}?apikey=${API_KEY}`,
    () => mockIncomeStatements,
  );
  fetchMock.get(
    `${BASE_URL}financial-statement-symbol-lists?apikey=${API_KEY}`,
    () => mockSymbolList,
  );

  test('BasicPagination', () => {
    const { container } = render(
      <BasicPagination active={1} total={10} onClick={mockFunction} message="mock message" />,
    );
    expect(container).toMatchSnapshot();
  });

  test('Details', async () => {
    const { container, findAllByTestId } = render(
      <Router>
        <Details />
      </Router>,
    );
    await findAllByTestId('income-statement');
    expect(container).toMatchSnapshot();
  });

  test('Header', () => {
    const { container } = render(
      <Router>
        <Header title="mock title" />
      </Router>,
    );
    expect(container).toMatchSnapshot();
  });

  test('Home', async () => {
    const { container, findAllByTestId } = render(
      <Provider store={store}>
        <Router>
          <Home />
        </Router>
      </Provider>,
    );
    await findAllByTestId('symbol');
    expect(container).toMatchSnapshot();
  });

  test('IncomeStatement', () => {
    const { container } = render(<IncomeStatement data={mockIncomeStatement} />);
    expect(container).toMatchSnapshot();
  });

  test('PageTemplate', () => {
    const { container } = render(
      <Router>
        <PageTemplate title="mock title" backBtn>
          <p>mock children</p>
        </PageTemplate>
      </Router>,
    );
    expect(container).toMatchSnapshot();
  });

  test('SearchBar', () => {
    const { container } = render(
      <SearchBar value="mock value" onChange={mockFunction} clear={mockFunction} />,
    );
    expect(container).toMatchSnapshot();
  });

  test('Symbol', () => {
    const { container } = render(
      <Router>
        <Symbol data={mockSymbol} />
      </Router>,
    );
    expect(container).toMatchSnapshot();
  });
});
