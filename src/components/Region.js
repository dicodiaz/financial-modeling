import PropTypes from 'prop-types';
import { Card, Col, Row } from 'react-bootstrap';

const Region = ({ name, confirmedTotal, deathsTotal, recoveredTotal }) => (
  <Card className="rounded-0 h-100 bg-region" data-testid="region">
    <Card.Body className="d-flex flex-column justify-content-center">
      <Row xs={2}>
        <Card.Title className="mb-0 d-flex flex-column justify-content-center">{name}</Card.Title>
        <Col>
          <Row xs={1}>
            <Col>Confirmed: {confirmedTotal}</Col>
            <Col>Deaths: {deathsTotal}</Col>
            <Col>Recovered: {recoveredTotal}</Col>
          </Row>
        </Col>
      </Row>
    </Card.Body>
  </Card>
);

Region.propTypes = {
  name: PropTypes.string.isRequired,
  confirmedTotal: PropTypes.number.isRequired,
  deathsTotal: PropTypes.number.isRequired,
  recoveredTotal: PropTypes.number.isRequired,
};

export default Region;
