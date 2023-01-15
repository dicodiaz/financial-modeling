import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Symbol = ({ data }) => {
  const navigate = useNavigate();

  return (
    <Card
      className="rounded-0 h-100 cursor-pointer bg-symbol"
      onClick={() => navigate(`/details/${data}`)}
      data-testid="symbol"
    >
      <Card.Body className="d-flex flex-column justify-content-center">
        <Card.Text className="mb-0">{data}</Card.Text>
      </Card.Body>
    </Card>
  );
};

Symbol.propTypes = {
  data: PropTypes.string.isRequired,
};

export default Symbol;
