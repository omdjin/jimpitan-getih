import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Card, Container, Col, Row } from 'react-bootstrap';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <>
      <h1 className={styles.title}>Donor Plasma Konvalesens</h1>
      <p className={styles.description}>Plasma anda selamatkan nyawa mereka!</p>
      <Container>
        <Row className="justify-content-md-center">
          <Col md>
            <Card>
              <Card.Body>
                <Link href="/jadi-donatur">
                  <a>
                    <h2>Jadi Donatur &rarr;</h2>
                    <p>Daftarkan diri anda untuk jadi donatur Plasma Konvalesens.</p>
                  </a>
                </Link>
              </Card.Body>
            </Card>
          </Col>
          <Col md>
            <Card>
              <Card.Body>
                <Link href="/request-plasma">
                  <a href="https://nextjs.org/learn">
                    <h2>Request &rarr;</h2>
                    <p>Ajukan kebutuhan Plasma Konvalesens!</p>
                  </a>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
