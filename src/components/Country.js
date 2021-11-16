import PropTypes from 'prop-types';
import { Card, Col, Row } from 'react-bootstrap';

const Country = ({ name, confirmedTotal, deathsTotal, recoveredTotal, index }) => (
  <Card
    className={`rounded-0 h-100${
      index % 4 === 0 || (index - 3) % 4 === 0 ? ' bg-custom2' : ' bg-custom3'
    }`}
  >
    <Card.Body className="d-flex flex-column justify-content-center">
      <Card.Title>{name}</Card.Title>
      <Row xs={1}>
        <Col>Confirmed: {confirmedTotal}</Col>
        <Col>Deaths: {deathsTotal}</Col>
        <Col>Recovered: {recoveredTotal}</Col>
      </Row>
    </Card.Body>
  </Card>
);

Country.propTypes = {
  name: PropTypes.string.isRequired,
  confirmedTotal: PropTypes.number.isRequired,
  deathsTotal: PropTypes.number.isRequired,
  recoveredTotal: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};

export default Country;
