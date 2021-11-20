import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Country from '../components/Country';
import Region from '../components/Region';
import SearchBar from '../components/SearchBar';
import Total from '../components/Total';

const [nameCountry, nameRegion, confirmedTotal, deathsTotal, recoveredTotal, index] = [
  'Colombia',
  'Bogotá',
  100,
  1,
  99,
  0,
];
const covidDataTotalMock = {
  today_confirmed: 150,
  today_deaths: 1,
  today_recovered: 100,
  today_new_confirmed: 2,
  today_new_deaths: 0,
  today_new_recovered: 10,
};

describe('testing snapshots for my child components', () => {
  test('testing snapshot for Country.js', () => {
    const countryTree = render(
      <Router>
        <Country
          name={nameCountry}
          confirmedTotal={confirmedTotal}
          deathsTotal={deathsTotal}
          recoveredTotal={recoveredTotal}
          index={index}
        />
      </Router>,
    );
    expect(countryTree).toMatchSnapshot();
  });

  test('testing snapshot for Region.js', () => {
    const regionTree = render(
      <Region
        name={nameRegion}
        confirmedTotal={confirmedTotal}
        deathsTotal={deathsTotal}
        recoveredTotal={recoveredTotal}
        index={index}
      />,
    );
    expect(regionTree).toMatchSnapshot();
  });

  test('testing snapshot for Total.js', () => {
    const totalTree = render(<Total covidDataTotal={covidDataTotalMock} />);
    expect(totalTree).toMatchSnapshot();
  });

  test('testing snapshot for SearchBar.js', () => {
    const searchBarTree = render(<SearchBar value="" onChange={() => {}} clear={() => {}} />);
    expect(searchBarTree).toMatchSnapshot();
  });
});
