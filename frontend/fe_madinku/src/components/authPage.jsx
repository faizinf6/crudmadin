import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Modal, Form, Button, Tab, Tabs } from 'react-bootstrap';

const AuthPage = () => {
    const [nama, setNama] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [activeTab, setActiveTab] = useState('login');
    const navigate = useNavigate();
    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/admin/auth', {
                email: email,
                password: password
            });

            if (response.data.status) {
                localStorage.setItem('user', JSON.stringify(response.data.nama));

                navigate('/beranda'); // Arahkan ke beranda jika autentikasi berhasil
            } else {
                alert('Email/Password Salah'); // Tampilkan pesan kesalahan
            }
        } catch (error) {
            alert('Terjadi kesalahan pada server');
        }
    };

    useEffect(() => {
        const loggedInUser = localStorage.getItem('user');
        if (loggedInUser) {
            navigate('/beranda');
            // Lakukan tindakan selanjutnya, misal mengatur state user
        }
    }, []);

    const handleSignup = async () => {
        try {
            await axios.post('http://localhost:3000/register', { nama, email, password });
            // ... Logika setelah signup berhasil
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    return (
        <Modal fullscreen show={true} onHide={() => {}}>
            <Modal.Header closeButton>
                <Modal.Title>{activeTab === 'login' ? 'Login' : 'Sign Up'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Tabs
                    activeKey={activeTab}
                    onSelect={(k) => setActiveTab(k)}
                    className="mb-3"
                >
                    <Tab eventKey="login" title="Login">
                        <Form>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Form.Group>
                            <br/>

                            <Button variant="primary" onClick={handleLogin}>
                                Login
                            </Button>
                        </Form>
                    </Tab>
                    <Tab eventKey="signup" title="Sign Up">
                        <Form>
                            <Form.Group>
                                <Form.Label>Nama</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter name"
                                    value={nama}
                                    onChange={(e) => setNama(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Form.Group>
                            <br/>
                            <Button variant="primary" onClick={handleSignup}>
                                Sign Up
                            </Button>
                        </Form>
                    </Tab>
                </Tabs>
            </Modal.Body>
        </Modal>
    );
};

export default AuthPage;
