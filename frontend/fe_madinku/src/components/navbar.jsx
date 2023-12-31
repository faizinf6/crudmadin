import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Navigationbar = () => {
    // Gaya CSS inline untuk pembatas
    const navLinkStyle = {
        borderRight: '1px solid #ffffff', // garis pembatas putih
        paddingRight: '200px', // padding di sebelah kanan
        marginRight: '20px', // margin di sebelah kanan
    };

    return (
        <Navbar bg="primary" variant="dark" sticky="top">
            <Container>
                <Navbar.Brand href="#home">Madinku</Navbar.Brand>
                <Nav className="ml-auto">
                    <LinkContainer to="/data-murid">
                        <Nav.Link className="mx-3"> Data  </Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/rekap-nilai">
                        <Nav.Link style={navLinkStyle}>Rekap Nilai</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/akun">
                        <Nav.Link style={{ ...navLinkStyle, borderRight: 'none' }}>Akun</Nav.Link>
                    </LinkContainer>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default Navigationbar;
