
import {Navbar, Nav, Container} from "react-bootstrap"; 
import { Outlet, link } from "react-router-dom";
const NavBarExample = () => {
    return (
       <>
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand as={Link} to ="/">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link as={Link} to ="/">Home</Nav.Link>
                    <Nav.Link as={Link} to ="/about">About</Nav.Link>
                    <Nav.Link as={Link} to ="/contact">Contact</Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

        <section>
            <Outlet></Outlet>
        </section>
       </>
    );    
}
export default NavBarExample;