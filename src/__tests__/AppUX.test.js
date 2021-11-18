import { fireEvent, render, within } from '@testing-library/react';
import fetchMock from 'fetch-mock';
import { Provider } from 'react-redux';
import App from '../App';
import testStore from '../redux/testStore';
import getMockCovidData from '../__mocks__/getMockCovidData';

global.scrollTo = jest.fn();
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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

  test('testing homepage, details page, navigation between both, and snapshot', async () => {
    // homepage
    await delay(1000);
    const countries = await tree.findAllByTestId('country');
    expect(countries).toHaveLength(195);
    const inputCountry = await tree.findByRole('textbox');
    fireEvent.change(inputCountry, { target: { value: 'Colombia' } });
    const country = await tree.findByTestId('country');
    expect(await within(country).findByText('Colombia')).toBeTruthy();
    expect(await tree.queryByTestId('backBtn')).toBeFalsy();
    // navigation to details page
    fireEvent.click(country);
    // details page
    const regions = await tree.findAllByTestId('region');
    expect(regions).toHaveLength(33);
    const inputRegion = await tree.findByRole('textbox');
    fireEvent.change(inputRegion, { target: { value: 'Bogotá' } });
    const region = await tree.findByTestId('region');
    expect(await within(region).findByText('Bogotá')).toBeTruthy();
    expect(await tree.queryByTestId('backBtn')).toBeTruthy();
    // navigation to homepage
    const backBtn = await tree.findByTestId('backBtn');
    fireEvent.click(backBtn);
    expect(tree.queryAllByTestId('country')).toBeTruthy();
    // snapshot
    expect(tree).toMatchSnapshot();
  });
});
