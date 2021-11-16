import { Col, Container, Row } from 'react-bootstrap';
import { MdKeyboardArrowLeft, MdMic, MdOutlineSettings } from 'react-icons/md';

const Header = () => (
  <header className="py-2 bg-custom2 text-white fixed-top">
    <Container fluid="md">
      <Row className="mx-0 g-0 justify-content-between align-items-center">
        <Col xs={1}>
          <MdKeyboardArrowLeft className="fs-1" />
        </Col>
        <Col xs={8}>
          <h1 className="mb-0 text-center">Today&apos;s stats</h1>
        </Col>
        <Col xs={1}>
          <MdMic className="fs-1" />
        </Col>
        <Col xs={1}>
          <MdOutlineSettings className="fs-1" />
        </Col>
      </Row>
    </Container>
  </header>
);

export default Header;
