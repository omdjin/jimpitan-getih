import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Button, Card, Container, Col, Row } from 'react-bootstrap';
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
                <Card.Text>Daftarkan diri anda untuk jadi donatur Plasma Konvalesens</Card.Text>
                <Link href="/jadi-donatur">
                  <a>
                    <Button variant="primary">Jadi Donatur &rarr;</Button>
                  </a>
                </Link>
              </Card.Body>
            </Card>
          </Col>
          <Col md>
            <Card>
              <Card.Body>
                <Card.Text>Ajukan kebutuhan Plasma Konvalesens!</Card.Text>
                <Link href="/request-plasma">
                  <a href="https://nextjs.org/learn">
                    <Button variant="primary">Request &rarr;</Button>
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
