import { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getDataFromAPI } from '../redux/ducks/covid';
import Country from './Country';
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
        <Container fluid="md" className="py-md-3 px-0">
          <Total covidDataTotal={covidData ? covidData.total : covidDataTotalMock} />
          {covidData && (
            <Row xs={2} className="mx-0 gx-0">
              {Object.values(covidData.dates[date].countries).map((info, index) => {
                const {
                  id,
                  name,
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
          )}
        </Container>
      </main>
    </>
  );
};

export default Home;
