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
                <Navbar.Brand href="/" style={{fontSize: '28px', fontWeight: 800}}>S.A.V.D</Navbar.Brand>

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">&nbsp;</Nav>

                    <Nav>
                        <Nav.Link href="/projects"><i className="pi pi-folder-open"></i> Projects</Nav.Link>

                        <Nav.Link href="/about"><i className="pi pi-user"></i> About Me</Nav.Link>

                        <Nav.Link href="/upcoming"><i className="pi pi-bullseye"></i> Upcoming</Nav.Link>

                        <Nav.Link href="/contact"><i className="pi pi-inbox"></i> Contact Me</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;