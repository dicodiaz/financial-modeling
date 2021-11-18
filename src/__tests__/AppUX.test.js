import { fireEvent, render, within } from '@testing-library/react';
import fetchMock from 'fetch-mock';
import MockDate from 'mockdate';
import { Provider } from 'react-redux';
import App from '../App';
import testStore from '../redux/testStore';
import getMockCovidData from '../__mocks__/getMockCovidData';

global.scrollTo = jest.fn();

let tree;
describe('testing UX for the whole App', () => {
  const url = 'https://api.covid19tracking.narrativa.com/api/2021-11-15';

  beforeEach(() => {
    MockDate.set('2021-11-15T12:00');
    fetchMock.reset();
    fetchMock.get(url, getMockCovidData());
    tree = render(
      <Provider store={testStore}>
        <App />
      </Provider>,
    );
  });

  afterAll(() => {
    MockDate.reset();
  });

  test('testing homepage, details page, navigation between both, and snapshot', async () => {
    // homepage
    const countries = await tree.findAllByTestId('country');
    expect(countries).toHaveLength(38);
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
