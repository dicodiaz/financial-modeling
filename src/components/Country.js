import PropTypes from 'prop-types';
import { Card, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Country = ({ name, confirmedTotal, deathsTotal, recoveredTotal, index }) => {
  const navigate = useNavigate();

  return (
    <Card
      className={`rounded-0 h-100 cursor-pointer${
        index % 4 === 0 || (index - 3) % 4 === 0 ? ' bg-custom2' : ' bg-custom3'
      }`}
      onClick={() => navigate(`/details/${name}`)}
      data-testid="country"
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
};

Country.propTypes = {
  name: PropTypes.string.isRequired,
  confirmedTotal: PropTypes.number.isRequired,
  deathsTotal: PropTypes.number.isRequired,
  recoveredTotal: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};

export default Country;
