import { FC } from 'react';
import { Button, Col, FormControl, Row } from 'react-bootstrap';
import { UseInputReturn } from '../hooks/use-input';

export type SearchBarProps = {
  value: string;
  onChange: UseInputReturn['onChange'];
  clear: UseInputReturn['clear'];
};

const SearchBar: FC<SearchBarProps> = ({ value, onChange, clear }) => {
  return (
    <Row className="mx-0 gx-0 px-2">
      <Col>
        <FormControl
          placeholder="Search by company name or symbol..."
          value={value}
          onChange={onChange}
        />
      </Col>
      <Col xs="auto">
        <Button variant="danger" onClick={clear}>
          Clear
        </Button>
      </Col>
    </Row>
  );
};

export default SearchBar;
