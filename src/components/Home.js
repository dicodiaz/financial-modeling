import { useEffect } from 'react';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getDataFromAPI } from '../redux/ducks/covid';
import Country from './Country';
import Header from './Header';
import Total from './Total';

const Home = () => {
  const dispatch = useDispatch();
  const covidData = useSelector((state) => state.covidReducer.data);
  const isFirstRender = useSelector((state) => state.covidReducer.isFirstRender);
  const covidDataTotalMock = useSelector((state) => state.covidReducer.covidDataTotalMock);
  const date = new Date().toISOString().replace(/T.+/g, '');
  const covidDataTotal = covidData ? covidData.total : covidDataTotalMock;

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
      <Header title={"Today's stats"} />
      <main className="pt-5 bg-custom1 text-white min-vh-100">
        <Container fluid="md" className="pt-1 pt-sm-2 pt-md-3 pt-lg-4 px-0">
          <Total covidDataTotal={covidDataTotal} />
          {covidData ? (
            <>
              <h2 className="text-center h6">STATS BY COUNTRY</h2>
              <Row xs={2} className="mx-0 gx-0">
                {Object.entries(covidData.dates[date].countries).map(([name, info], index) => {
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

export default Home;
