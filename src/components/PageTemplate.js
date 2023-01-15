import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';
import Header from './Header';

const PageTemplate = ({ children, title, backBtn }) => (
  <>
    <Header title={title} backBtn={backBtn} />
    <main className="pt-5 bg-custom1 text-white min-vh-100">
      <Container className="px-0" fluid>
        {children}
      </Container>
    </main>
  </>
);

PageTemplate.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  title: PropTypes.string.isRequired,
  backBtn: PropTypes.bool,
};

PageTemplate.defaultProps = {
  backBtn: false,
};

export default PageTemplate;
