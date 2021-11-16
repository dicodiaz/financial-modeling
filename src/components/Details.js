/* eslint-disable no-nested-ternary */

import { useEffect } from 'react';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getDataFromAPI } from '../redux/ducks/covid';
import Header from './Header';
import Region from './Region';
import Total from './Total';

const Details = () => {
  const dispatch = useDispatch();
  const { country } = useParams();
  const covidData = useSelector((state) => state.covidReducer.data);
  const isFirstRender = useSelector((state) => state.covidReducer.isFirstRender);
  const covidDataTotalMock = useSelector((state) => state.covidReducer.covidDataTotalMock);

  const date = new Date().toISOString().replace(/T.+/g, '');
  const countryCovidData = covidData
    ? covidData.dates[date].countries[country]
    : covidDataTotalMock;

  useEffect(() => {
    if (isFirstRender) {
      dispatch(getDataFromAPI(date));
    }
  }, [dispatch, date, isFirstRender]);

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
                <h2 className="text-center h6">STATS BY REGION</h2>
                <Row xs={1} className="mx-0 gx-0">
                  {countryCovidData.regions.map((info, index) => {
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
              <p className="text-center">No regions found</p>
            )
          ) : (
            <Row xs="auto" className="justify-content-center align-items-center mt-2">
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
