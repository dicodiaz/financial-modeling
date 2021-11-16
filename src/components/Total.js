import PropTypes from 'prop-types';
import { Col, Row } from 'react-bootstrap';

const Total = ({ covidDataTotal }) => {
  const {
    today_confirmed: confirmedTotal,
    today_deaths: deathsTotal,
    today_recovered: recoveredTotal,
    today_new_confirmed: confirmedToday,
    today_new_deaths: deathsToday,
    today_new_recovered: recoveredToday,
  } = covidDataTotal;
  return (
    <Row xs={1} className="mx-0 gy-1 mb-2">
      <Col>Total confirmed: {confirmedTotal}</Col>
      <Col className="bg-custom3">Total deaths: {deathsTotal}</Col>
      <Col>Total recovered: {recoveredTotal}</Col>
      <Col className="bg-custom3">Today&apos;s new confirmed: {confirmedToday}</Col>
      <Col>Today&apos;s new deaths: {deathsToday}</Col>
      <Col className="bg-custom3">Today&apos;s new recovered: {recoveredToday}</Col>
    </Row>
  );
};

Total.propTypes = {
  covidDataTotal: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default Total;
