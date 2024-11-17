import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { FaCamera, FaSmile, FaShieldAlt } from 'react-icons/fa'; 
import AppNavbar from "./NavBar"
import './LandingPage.css'; 

const LandingPage = () => {
    return (
        <div>
            {/* This is very good for SEO Tags */}
            <Helmet>
                <title>Facial Recognition Authentication System</title>
                <meta
                    name="description"
                    content="Experience the future of secure authentication with our Facial Recognition Authentication System, built for speed, security, and convenience."
                />
                <meta
                    name="keywords"
                    content="Facial Recognition, Authentication System, Secure Login, Biometric Authentication"
                />
            </Helmet>

            {/* Navbar */}
            <AppNavbar/>

            {/* Hero Section */}
            <div className="hero-section text-white text-center d-flex align-items-center animate-pop" style={{ backgroundColor: '#343a40', height: '100vh' }}>
                <Container>
                    <h1 className="display-4 mb-3 animate-fade">Welcome to FaceAuth System</h1>
                    <p className="lead mb-4 animate-fade">Experience the future of secure and seamless authentication.</p>
                    <Button as={Link} to="/signup" variant="primary" size="lg" className="shadow-lg mr-3 animate-bounce">Sign Up Now</Button>
                    <Button as={Link} to="/login" variant="outline-light" size="lg" className="shadow-lg animate-bounce">Login</Button>
                </Container>
            </div>

            {/* Features Section */}
            <Container className="py-5" id="features">
                <h2 className="text-center mb-5 animate-fade">Key Features</h2>
                <Row>
                    <Col md={4}>
                        <Card className="feature-card shadow-sm mb-4 animate-pop">
                            <Card.Body>
                                <Card.Title>Advanced Security</Card.Title>
                                <Card.Text>Utilize biometric data for top-notch security and privacy.</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="feature-card shadow-sm mb-4 animate-pop">
                            <Card.Body>
                                <Card.Title>Seamless Experience</Card.Title>
                                <Card.Text>Quick and easy login with facial recognition technology.</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="feature-card shadow-sm mb-4 animate-pop">
                            <Card.Body>
                                <Card.Title>Data Privacy</Card.Title>
                                <Card.Text>Your biometric data is stored securely and handled with care.</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            {/* How It Works Section */}
            <div className="py-5 bg-light section-shadow" id="how-it-works">
                <Container>
                    <h2 className="text-center mb-5 animate-fade">How It Works</h2>
                    <Row className="text-center">
                        <Col md={4} className="mb-4 shadow-sm">
                            <FaCamera size={50} className="feature-card shadow-sm mb-4 animate-pop" />
                            <h5>Step 1</h5>
                            <p>Sign up and capture your unique facial features securely.</p>
                        </Col>
                        <Col md={4} className="mb-4 shadow-sm">
                            <FaSmile size={50} className="feature-card shadow-sm mb-4 animate-pop" />
                            <h5>Step 2</h5>
                            <p>Login effortlessly with a quick facial scan.</p>
                        </Col>
                        <Col md={4} className="mb-4 shadow-sm">
                            <FaShieldAlt size={50} className="feature-card shadow-sm mb-4 animate-pop" />
                            <h5>Step 3</h5>
                            <p>Enjoy a secure and seamless authentication experience.</p>
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* Benefits Section */}
            <Container className="py-5 section-shadow" id="benefits">
                <h2 className="text-center mb-5 animate-fade">Why Choose Us</h2>
                <Row>
                    <Col className="section-shadow" md={6}>
                        <h4 className="mb-3">Enhanced Security</h4>
                        <p>Our system uses cutting-edge biometric technology to keep your data safe.</p>
                    </Col>
                    <Col md={6}>
                        <h4 className="mb-3">User-Friendly</h4>
                        <p>Designed with the user in mind, our system ensures a hassle-free experience.</p>
                    </Col>
                </Row>
            </Container>

            {/* Contact Section */}
            <div className="py-5 bg-dark text-white" id="contact">
                <Container>
                    <h2 className="text-center mb-4 animate-fade">Contact Us</h2>
                    <p className="text-center">Have questions or need support? We're here to help!</p>
                    <Row className="justify-content-center">
                        <Col md={6}>
                            <Button variant="light" className="w-100 shadow animate-pop">Contact Support</Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default LandingPage;
