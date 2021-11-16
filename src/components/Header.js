import PropTypes from 'prop-types';
import { Col, Container, Row } from 'react-bootstrap';
import { MdKeyboardArrowLeft, MdMic, MdOutlineSettings } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const Header = ({ title, backBtn }) => {
  const navigate = useNavigate();
  return (
    <header className="py-2 bg-custom2 text-white fixed-top">
      <Container fluid="md">
        <Row className="mx-0 g-0 justify-content-center align-items-center">
          {backBtn && (
            <Col xs={1}>
              <MdKeyboardArrowLeft className="fs-1" onClick={() => navigate('/')} />
            </Col>
          )}
          <Col xs={backBtn ? 9 : 10} md={backBtn ? 11 : 12}>
            <h1 className="mb-0 text-center">{title}</h1>
          </Col>
          <Col xs={1} className="px-1 d-md-none">
            <MdMic className="fs-1" />
          </Col>
          <Col xs={1} className="px-1 d-md-none">
            <MdOutlineSettings className="fs-1" />
          </Col>
        </Row>
      </Container>
    </header>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  backBtn: PropTypes.bool,
};

Header.defaultProps = {
  backBtn: false,
};

export default Header;
