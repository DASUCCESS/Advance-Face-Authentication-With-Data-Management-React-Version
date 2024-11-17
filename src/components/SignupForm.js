import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Webcam from 'react-webcam';
import { Button, Alert, Form, Container } from 'react-bootstrap';
import { registerUser } from '../ApiHelper/ApiHelper';

const SignupForm = () => {
    const [image, setImage] = useState(null);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const [captured, setCaptured] = useState(false);
    const [username, setUsername] = useState('');
    const [isWebcamActive, setIsWebcamActive] = useState(false);

    const navigate = useNavigate();
    const webcamRef = useRef(null);

    const capture = React.useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImage(imageSrc.split(',')[1]);
        setCaptured(true);
        setIsWebcamActive(false);
        webcamRef.current.stream.getTracks().forEach(track => track.stop());
    }, [webcamRef]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!image || !username) {
            setError('Please enter a username and capture your face before submitting.');
            return;
        }

        try {
            const result = await registerUser(username, image);
            setMessage(result.message);
            setError(null);

            setTimeout(() => {
                navigate('/login'); 
            }, 2000);
        } catch (err) {
            setError('Registration failed. Please try again.');
            setMessage(null);
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <div className="shadow-lg p-4 rounded" style={{ maxWidth: '500px', width: '100%' }}>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                    <hr />
                        <h2 className="mb-3 text-center animate-fade">Signup</h2>

                        <hr />
                        <Form.Group controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="shadow-sm"
                            />
                        </Form.Group>

                        {!captured && !isWebcamActive && (
                            <Button
                                variant="primary"
                                onClick={() => setIsWebcamActive(true)}
                                className="mt-3 w-100 shadow-sm transition-all hover:scale-105"
                            >
                                Start Webcam for Registration
                            </Button>
                        )}

                        {isWebcamActive && (
                            <>
                                <h5 className="text-center mb-4 mt-5">Capture your face</h5>
                                <Webcam
                                    audio={false}
                                    ref={webcamRef}
                                    screenshotFormat="image/jpeg"
                                    width="100%"
                                    videoConstraints={{
                                        facingMode: 'user',
                                    }}
                                />
                                <Button
                                    variant="primary"
                                    onClick={capture}
                                    className="mt-3 w-100 shadow-sm transition-all hover:scale-105"
                                >
                                    Capture Your Face
                                </Button>
                            </>
                        )}

                        {captured && (
                            <div className="mt-3">
                                <img
                                    src={`data:image/jpeg;base64,${image}`}
                                    alt="Captured"
                                    className="img-fluid shadow-sm mb-3"
                                />
                                <Button
                                    variant="success"
                                    type="submit"
                                    className="mt-3 w-100 shadow-sm transition-all hover:scale-105"
                                >
                                    Submit for Registration
                                </Button>
                            </div>
                        )}
                    </div>
                </form>

                {message && <Alert variant="success" className="mt-3">{message}</Alert>}
                {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

                <div className="mt-3 text-center">
                    <p>Already have an account? <a href="/login">Login here</a></p> 
                </div>
            </div>
        </Container>
    );
};

export default SignupForm;
