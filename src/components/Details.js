import { useEffect } from 'react';
import { Container, Row, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import useInputHook from '../hooks/inputHook';
import { getIncomeStatementsBySymbolFromAPI } from '../redux/ducks/financialModeling';
import Header from './Header';
import Region from './Region';
import SearchBar from './SearchBar';
import Total from './Total';

const Details = () => {
  const dispatch = useDispatch();
  const { symbol } = useParams();
  const data = useSelector((state) => state.financialModelingReducer.data);
  // const isFirstRender = useSelector((state) => state.financialModelingReducer.isFirstRender);
  const date = useSelector((state) => state.financialModelingReducer.todaysDate);
  const covidDataTotalMock = useSelector(
    (state) => state.financialModelingReducer.covidDataTotalMock,
  );
  const { value: regionValue, onChange: regionOnChange, clear: regionClear } = useInputHook('');
  const countryCovidData = data ? data.dates[date].countries[symbol] : covidDataTotalMock;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!data) {
      dispatch(getIncomeStatementsBySymbolFromAPI(symbol));
    }
  }, []);

  return (
    <>
      <Header title={symbol} backBtn />
      <main className="pt-5 bg-custom1 text-white min-vh-100">
        <Container fluid="md" className="pt-1 pt-sm-2 pt-md-3 pt-lg-4 px-0">
          <Total covidDataTotal={countryCovidData} />
          {data &&
            (countryCovidData.regions.length > 0 ? (
              <>
                <SearchBar value={regionValue} onChange={regionOnChange} clear={regionClear} />
                <h2 className="text-center h6 my-2">STATS BY REGION</h2>
                <Row xs={1} md={2} xl={3} className="mx-0 gx-0">
                  {countryCovidData.regions
                    .filter((region) =>
                      region.name.toLowerCase().startsWith(regionValue.toLowerCase()),
                    )
                    .map((info) => {
                      const {
                        id,
                        name,
                        today_confirmed: confirmedTotal,
                        today_deaths: deathsTotal,
                        today_recovered: recoveredTotal,
                      } = info;
                      return (
                        <Region
                          key={id}
                          name={name}
                          confirmedTotal={confirmedTotal || 0}
                          deathsTotal={deathsTotal || 0}
                          recoveredTotal={recoveredTotal || 0}
                        />
                      );
                    })}
                </Row>
              </>
            ) : (
              <p className="text-center my-2">No regions found</p>
            ))}
          {!data && (
            <Row xs="auto" className="mx-0 justify-content-center align-items-center mt-2">
              <Spinner animation="border" />
              <p className="mb-0">Loading...</p>
            </Row>
          )}
        </Container>
      </main>
    </>
  );
};

export default Details;
