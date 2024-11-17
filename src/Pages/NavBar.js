import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

const AppNavbar = () => {
    const token = localStorage.getItem('access_token');
    const isAuthenticated = !!token;
    const location = useLocation(); 

    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm">
            <Container>
                <Navbar.Brand as={Link} to="/">FaceAuth System</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto"> 
                        {isAuthenticated ? (
                            location.pathname === '/dashboard' ? (
                                <Nav.Link as={Link} to="/">Go Home</Nav.Link>
                            ) : (
                                <Nav.Link as={Link} to="/dashboard">Go to Dashboard</Nav.Link>
                            )
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
                                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default AppNavbar;
