import { Container, Nav, Navbar } from 'react-bootstrap';
import { FaUserTie, FaRegFolderOpen, FaCode, FaMobileRetro } from "react-icons/fa6";

import './header.css';

function Header() {
    
    return (
        <Navbar collapseOnSelect className='h-body' expand="lg" bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="/" style={{fontSize: '28px', fontWeight: 800}}>S.A.V.D</Navbar.Brand>

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">&nbsp;</Nav>

                    <Nav>
                        <Nav.Link href="/projects">
                            <FaRegFolderOpen style={{fontSize: 16, marginTop: -2}} /> Projects
                        </Nav.Link>

                        <Nav.Link href="/about">
                            <FaUserTie style={{fontSize: 16, marginTop: -2}} /> About Me
                        </Nav.Link>

                        <Nav.Link href="/upcoming">
                            <FaCode style={{fontSize: 16, marginTop: -2}} /> Upcoming
                        </Nav.Link>

                        <Nav.Link href="/contact">
                            <FaMobileRetro style={{fontSize: 16, marginTop: -2}} /> Contact Me
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;