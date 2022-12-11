import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';
import Header from './Header';

const PageTemplate = ({ children, title }) => (
  <>
    <Header title={title} />
    <main className="pt-5 bg-custom1 text-white min-vh-100">
      <Container fluid="md" className="px-0">
        {children}
      </Container>
    </main>
  </>
);

PageTemplate.propTypes = {
  children: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
};

export default PageTemplate;
