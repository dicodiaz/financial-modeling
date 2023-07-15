import { FC } from 'react';
import { Container } from 'react-bootstrap';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { LinkWithSearchParams } from './LinkWithSearchParams';

export type HeaderProps = {
  title: string;
  backBtnLink?: string;
};

const Header: FC<HeaderProps> = ({ title, backBtnLink }) => {
  return (
    <header className="py-3 bg-custom2 text-white fixed-top">
      <Container fluid="md">
        <div className="position-relative">
          {backBtnLink && (
            <LinkWithSearchParams to={backBtnLink}>
              <MdKeyboardArrowLeft data-testid="backBtn" className="fs-2 position-absolute" />
            </LinkWithSearchParams>
          )}
          <h1 className="mb-0 text-center h4 header-title">{title}</h1>
        </div>
      </Container>
    </header>
  );
};

export default Header;
