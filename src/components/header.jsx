import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';

import './header.css';

function Header() {
    // const [scrolled, setScrolled] = React.useState(false);

    // React.useEffect(() => {
    //     const handleScroll = () => {
    //         setScrolled(window.scrollY > 60);
    //     };

    //     window.addEventListener("scroll", handleScroll);

    //     return () => window.removeEventListener("scroll", handleScroll);
    // }, []);

    return (
        <Navbar collapseOnSelect className='h-body' expand="lg" bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="/" style={{fontSize: '28px'}}>S.A.V.D</Navbar.Brand>

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">&nbsp;</Nav>

                    <Nav>
                        <Nav.Link href="/projects">Projects</Nav.Link>

                        <Nav.Link href="/about">About Me</Nav.Link>

                        <Nav.Link href="/upcoming">Upcoming</Nav.Link>

                        <Nav.Link href="/contact">Contact Me</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;