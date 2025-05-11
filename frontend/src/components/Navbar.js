import { Navbar as BootstrapNavbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
  return (
    <BootstrapNavbar
      expand="lg"
      className="shadow mb-4 navbar" // Adicionei a classe 'navbar' para estilização
    >
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/" className="navbar-brand">
          Animal Care System
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={Link} to="/" className="nav-link-custom">
              Lista de Animais
            </Nav.Link>
            <Nav.Link as={Link} to="/create" className="nav-link-custom">
              Criar Animal
            </Nav.Link>
            <Nav.Link as={Link} to="/cares" className="nav-link-custom">
              Lista de Cuidados
            </Nav.Link>
            <Nav.Link as={Link} to="/care/create" className="nav-link-custom">
              Criar Cuidado
            </Nav.Link>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
}

export default Navbar;