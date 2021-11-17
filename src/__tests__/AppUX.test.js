import { fireEvent, render, within } from '@testing-library/react';
import fetchMock from 'fetch-mock';
import { Provider } from 'react-redux';
import App from '../App';
import testStore from '../redux/testStore';
import getMockCovidData from '../__mocks__/getMockCovidData';

global.scrollTo = jest.fn();

const clickElements = (elements, indexes = []) => {
  indexes.forEach((index) => {
    fireEvent.click(elements[index]);
  });
};

let tree;
describe('testing UX for the whole App', () => {
  const url = 'https://api.covid19tracking.narrativa.com/api/';
  fetchMock.get(url, getMockCovidData());

  beforeEach(() => {
    fetchMock.reset();
    tree = render(
      <Provider store={testStore}>
        <App />
      </Provider>,
    );
  });

  test('testing homepage UX', async () => {
    const countries = await tree.findAllByTestId('country');
    expect(countries).toHaveLength(195);
    const input = await tree.findByRole('textbox');
    fireEvent.change(input, { target: { value: 'Colombia' } });
    const country = await tree.findByTestId('country');
    expect(await within(country).findByText('Colombia')).toBeTruthy();
    expect(await tree.queryByTestId('backBtn')).toBeFalsy();
  });

  test('testing details page UX', async () => {
    const countries = await tree.findAllByTestId('country');
    clickElements(countries, [37]);
    const regions = await tree.findAllByTestId('region');
    expect(regions).toHaveLength(33);
    const input = await tree.findByRole('textbox');
    fireEvent.change(input, { target: { value: 'Bogotá' } });
    const country = await tree.findByTestId('region');
    expect(await within(country).findByText('Bogotá')).toBeTruthy();
    expect(await tree.queryByTestId('backBtn')).toBeTruthy();
    const backBtn = await tree.findAllByTestId('backBtn');
    clickElements(backBtn, [0]);
    expect(tree.queryAllByTestId('country')).toBeTruthy();
  });

  test('testing snapshot', () => {
    expect(tree).toMatchSnapshot();
  });
});
