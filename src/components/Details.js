import { Col, Container, Row } from 'react-bootstrap';
import Header from './Header';

const Details = () => (
  <>
    <Header />
    <main className="py-5 bg-custom1 text-white min-vh-100">
      <Container fluid="md" className="py-md-3">
        <Row className="mx-0 g-0 justify-content-between align-items-center">
          <Col>Hello from Details</Col>
        </Row>
      </Container>
    </main>
  </>
);

export default Details;
