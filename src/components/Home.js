import { useEffect } from 'react';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import useInputHook from '../hooks/inputHook';
import { getDataFromAPI } from '../redux/ducks/covid';
import Country from './Country';
import Header from './Header';
import SearchBar from './SearchBar';
import Total from './Total';

const Home = () => {
  const dispatch = useDispatch();
  const covidData = useSelector((state) => state.covidReducer.data);
  const isFirstRender = useSelector((state) => state.covidReducer.isFirstRender);
  const date = useSelector((state) => state.covidReducer.todaysDate);
  const covidDataTotalMock = useSelector((state) => state.covidReducer.covidDataTotalMock);
  const { value: countryValue, onChange: countryOnChange, clear: countryClear } = useInputHook('');
  const covidDataTotal = covidData ? covidData.total : covidDataTotalMock;

  useEffect(() => {
    if (isFirstRender) {
      const date = new Date();
      date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
      dispatch(getDataFromAPI(date.toISOString().replace(/T.+/g, '')));
    }
  }, [dispatch, isFirstRender]);

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  return (
    <>
      <Header title={"Today's stats"} />
      <main className="pt-5 bg-custom1 text-white min-vh-100">
        <Container fluid="md" className="pt-1 pt-sm-2 pt-md-3 pt-lg-4 px-0">
          <Total covidDataTotal={covidDataTotal} />
          {covidData ? (
            <>
              <SearchBar value={countryValue} onChange={countryOnChange} clear={countryClear} />
              <h2 className="text-center h6 my-2">STATS BY COUNTRY</h2>
              <Row xs={2} className="mx-0 gx-0">
                {Object.entries(covidData.dates[date].countries)
                  .filter(([name]) => name.toLowerCase().startsWith(countryValue.toLowerCase()))
                  .map(([name, info], index) => {
                    const {
                      id,
                      today_confirmed: confirmedTotal,
                      today_deaths: deathsTotal,
                      today_recovered: recoveredTotal,
                    } = info;
                    return (
                      <Col key={id}>
                        <Country
                          name={name}
                          confirmedTotal={confirmedTotal || 0}
                          deathsTotal={deathsTotal || 0}
                          recoveredTotal={recoveredTotal || 0}
                          index={index}
                        />
                      </Col>
                    );
                  })}
              </Row>
            </>
          ) : (
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

export default Home;
