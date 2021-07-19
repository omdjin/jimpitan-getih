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
        <a href="https://wa.me/6282227276868?text=" target="_blank" rel="noopener noreferrer">
          Narahubung / Contact Person : Adi (0822-2727-6868)
        </a>
      </Navbar>
    </>
  );
};

export default Layout;
