import Image from 'next/image';
import { Col, Container, Navbar, Row } from 'react-bootstrap';
import TopNav from '@/components/Navigation/Top';
import styles from './Layout.module.css';

const Layout = ({ children }) => {
  return (
    <>
      <TopNav />
      <Container>
        <Row>
          <Col />
          <Col xs={12} md={10} lg={8}>
            <main>{children}</main>
          </Col>
          <Col />
        </Row>
      </Container>
      <Navbar fixed="bottom" className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer">
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </Navbar>
    </>
  );
};

export default Layout;
