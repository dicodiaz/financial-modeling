import { FC, PropsWithChildren } from 'react';
import { Container } from 'react-bootstrap';
import Header from './Header';

export type LayoutProps = {
  title: string;
  backBtnLink?: string;
};

const Layout: FC<PropsWithChildren<LayoutProps>> = ({ children, title, backBtnLink }) => {
  return (
    <>
      <Header title={title} backBtnLink={backBtnLink} />
      <main className="pt-6 bg-custom1 text-white min-vh-100">
        <Container>{children}</Container>
      </main>
    </>
  );
};

export default Layout;
