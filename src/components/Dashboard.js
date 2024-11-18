import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Table, Form, Modal } from 'react-bootstrap';
import { getUserDataItems, getUserData, createData, updateData, deleteData, logoutUser } from '../ApiHelper/ApiHelper';
import AppNavbar from "../Pages/NavBar";
import moment from 'moment';

const Dashboard = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ title: '', content: '' });
    const [editingData, setEditingData] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchAllUserData = async () => {
            try {
                const userData = await getUserDataItems();
                setData(userData);
            } catch (error) {
                console.error('Error fetching user data:', error);
                navigate('/login');
            }
        };

        const fetchUserInfo = async () => {
            try {
                const user = await getUserData();
                setUserInfo(user);
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };

        fetchAllUserData();
        fetchUserInfo();
    }, [navigate]);

    const handleCreate = async () => {
        try {
            const result = await createData(formData);
            setData([...data, result]);
            setShowModal(false);
            setFormData({ title: '', content: '' });
        } catch (error) {
            console.error('Error creating data:', error);
        }
    };

    const handleUpdate = async () => {
        try {
            const result = await updateData(editingData.id, formData);
            setData(data.map(item => (item.id === result.id ? result : item)));
            setShowModal(false);
            setEditingData(null);
            setFormData({ title: '', content: '' }); 
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

    const handleEdit = (item) => {
        setEditingData(item);
        setFormData({ title: item.title, content: item.content });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        try {
            await deleteData(id);
            setData(data.filter(item => item.id !== id));
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    };

    const handleLogout = () => {
        logoutUser();
        navigate('/login');
    };

    return (
        <div>
            <AppNavbar />
            <Container className="mt-4">
                <h1 className="mb-4 text-center text-dark">Welcome, {userInfo ? userInfo.username : 'User'}!</h1>

                {/* Action buttons */}
                <div className="d-flex justify-content-between mb-4">
                    <Button variant="primary" onClick={() => {
                        setEditingData(null); 
                        setFormData({ title: '', content: '' }); 
                        setShowModal(true);
                    }} className="shadow-sm">
                        Add New Data
                    </Button>
                    <Button variant="danger" onClick={handleLogout} className="shadow-sm">
                        Logout
                    </Button>
                </div>

                <h2 className="mb-3 text-center text-dark">Data Management System</h2>
                <Table striped bordered hover className="shadow-sm">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Created Date & Time</th>
                            <th>Updated Date & Time</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.id}>
                                <td>{item.title}</td>
                                <td>{item.content}</td>
                                <td>{moment(item.created_at).format('YYYY-MM-DD | HH:mm')}</td>
                                <td>{moment(item.updated_at).format('YYYY-MM-DD | HH:mm')}</td>
                                <td>
                                    <div className="d-flex gap-3">
                                        <Button variant="warning" onClick={() => handleEdit(item)}>
                                            Edit
                                        </Button>
                                        <Button variant="danger" onClick={() => handleDelete(item.id)}>
                                            Delete
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>{editingData ? 'Edit Data' : 'Add New Data'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    placeholder="Enter data name"
                                />
                            </Form.Group>
                            <Form.Group controlId="formDescription" className="mt-3">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    placeholder="Enter data content"
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            Close
                        </Button>
                        <Button
                            variant="primary"
                            onClick={editingData ? handleUpdate : handleCreate}
                        >
                            {editingData ? 'Update' : 'Create'}
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </div>
    );
};

export default Dashboard;
