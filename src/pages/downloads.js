import Head from 'next/head';
import { Button, Row, Col } from 'react-bootstrap';

const Downloads = () => {
  const handleDownload = async (type = 'donatur') => {
    window.open(`/api/downloads?data=${type}`);
  };
  return (
    <Row>
      <Head>
        <title>Download data</title>
      </Head>
      <h1>Download data</h1>
      <Col className="p-3">
        <Button variant="success" className="me-2 mb-2" onClick={() => handleDownload('donatur')}>
          Data Pendonor
        </Button>
        <Button
          variant="danger"
          className="me-2 mb-2"
          onClick={() => handleDownload('request-plasma')}>
          Data Request
        </Button>
      </Col>
    </Row>
  );
};

export default Downloads;
