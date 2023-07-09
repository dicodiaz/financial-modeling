import { ChangeEvent, FC } from 'react';
import { Col, Form } from 'react-bootstrap';

export type BasicSelectProps = {
  data: Record<string, string>;
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  optionAll?: boolean;
};

const BasicSelect: FC<BasicSelectProps> = ({ label, value, onChange, data, optionAll }) => {
  return (
    <Col>
      <label>{label}</label>
      <Form.Select size="sm" value={value} onChange={onChange}>
        {optionAll && <option value="all">All</option>}
        {Object.entries(data).map(([text, value]) => (
          <option key={value} value={value}>
            {text}
          </option>
        ))}
      </Form.Select>
    </Col>
  );
};

export default BasicSelect;
