import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function Navigation() {
  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand><h1><span className="title1">cine</span><span className="title2">Rate</span></h1></Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default Navigation;