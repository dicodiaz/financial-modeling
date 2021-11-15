import { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getDataFromAPI } from '../redux/ducks/covid';
import Header from './Header';
import Total from './Total';

let isFirstRender = true;
const Home = () => {
  const dispatch = useDispatch();
  const covidData = useSelector((state) => state.covidReducer.data);
  const date = new Date().toISOString().replace(/T.+/g, '');
  const covidDataTotalMock = {
    today_confirmed: 0,
    today_deaths: 0,
    today_recovered: 0,
    today_new_confirmed: 0,
    today_new_deaths: 0,
    today_new_recovered: 0,
  };

  useEffect(() => {
    if (isFirstRender) {
      dispatch(getDataFromAPI(date));
      isFirstRender = false;
    }
  }, [dispatch, date]);

  return (
    <>
      <Header />
      <main className="py-5 bg-custom1 text-white min-vh-100">
        <Container fluid="md" className="py-md-3">
          <Total covidDataTotal={isFirstRender ? covidDataTotalMock : covidData.total} />
          {!isFirstRender && (
            <Row xs={2} className="mx-0 gx-0">
              {Object.entries(covidData.dates[date].countries).map(([country, info]) => {
                const { id } = info;
                return <Col key={id}>{country}</Col>;
              })}
            </Row>
          )}
        </Container>
      </main>
    </>
  );
};

export default Home;
