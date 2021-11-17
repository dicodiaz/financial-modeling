/* eslint-disable no-nested-ternary */

import { useEffect } from 'react';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import useInputHook from '../hooks/inputHook';
import { getDataFromAPI } from '../redux/ducks/covid';
import Header from './Header';
import Region from './Region';
import SearchBar from './SearchBar';
import Total from './Total';

const Details = () => {
  const dispatch = useDispatch();
  const { country } = useParams();
  const covidData = useSelector((state) => state.covidReducer.data);
  const isFirstRender = useSelector((state) => state.covidReducer.isFirstRender);
  const date = useSelector((state) => state.covidReducer.todaysDate);
  const covidDataTotalMock = useSelector((state) => state.covidReducer.covidDataTotalMock);
  const { value: regionValue, onChange: regionOnChange, clear: regionClear } = useInputHook('');
  const countryCovidData = covidData
    ? covidData.dates[date].countries[country]
    : covidDataTotalMock;

  useEffect(() => {
    if (isFirstRender) {
      const date = new Date();
      date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
      dispatch(getDataFromAPI(date.toISOString().replace(/T.+/g, '')));
    }
  }, [dispatch, isFirstRender]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header title={country} backBtn />
      <main className="pt-5 bg-custom1 text-white min-vh-100">
        <Container fluid="md" className="pt-1 pt-sm-2 pt-md-3 pt-lg-4 px-0">
          <Total covidDataTotal={countryCovidData} />
          {covidData ? (
            countryCovidData.regions.length > 0 ? (
              <>
                <SearchBar value={regionValue} onChange={regionOnChange} clear={regionClear} />
                <h2 className="text-center h6 my-2">STATS BY REGION</h2>
                <Row xs={1} className="mx-0 gx-0">
                  {countryCovidData.regions
                    .filter((region) =>
                      region.name.toLowerCase().startsWith(regionValue.toLowerCase()),
                    )
                    .map((info, index) => {
                      const {
                        id,
                        name,
                        today_confirmed: confirmedTotal,
                        today_deaths: deathsTotal,
                        today_recovered: recoveredTotal,
                      } = info;
                      return (
                        <Col key={id}>
                          <Region
                            name={name}
                            confirmedTotal={confirmedTotal}
                            deathsTotal={deathsTotal}
                            recoveredTotal={recoveredTotal}
                            index={index}
                          />
                        </Col>
                      );
                    })}
                </Row>
              </>
            ) : (
              <p className="text-center my-2">No regions found</p>
            )
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

export default Details;
