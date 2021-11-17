import PropTypes from 'prop-types';
import { Button, Col, FormControl, Row } from 'react-bootstrap';

const SearchBar = ({ value, onChange, clear }) => (
  <Row className="mx-0 gx-0 px-2">
    <Col>
      <FormControl placeholder="Search..." value={value} onChange={onChange} />
    </Col>
    <Col xs="auto">
      <Button variant="danger" onClick={clear}>
        Clear
      </Button>
    </Col>
  </Row>
);

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  clear: PropTypes.func.isRequired,
};

export default SearchBar;
