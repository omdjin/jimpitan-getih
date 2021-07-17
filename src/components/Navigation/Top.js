import Link from 'next/link';
import { Container, Nav, Navbar } from 'react-bootstrap';

const TopNav = () => (
  <Navbar bg="light" expand="lg">
    <Container>
      <Link href="/">
        <Navbar.Brand href="/">Home</Navbar.Brand>
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Link href="/jadi-donatur">
            <Nav.Link href="/jadi-donatur">Jadi Donatur</Nav.Link>
          </Link>
          <Link href="/request-plasma">
            <Nav.Link href="/request-plasma">Request</Nav.Link>
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default TopNav;
