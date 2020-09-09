import React, { useState } from 'react'

import SearchForm from './components/SearchForm'
import UniversityCards from './components/UniversityCards'

import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

const App = () => {
    const [formValue, setFormValue] = useState();
    const handleFormSubmit = (value) => {
        setFormValue(value);
    };

    return (
        <>
            <Navbar
                sticky="top"
                variant="dark"
                className="bg-blue--light"
            >
                <Navbar.Brand href="/">University Finder</Navbar.Brand>
            </Navbar>
            <Container fluid>
                <Row>
                    <Col
                        sm={12}
                        className="mt-5 mb-3"    
                    >
                        <Container>
                            <SearchForm
                                onSubmit={handleFormSubmit}
                            />
                        </Container>
                    </Col>
                    <Col sm={12}>
                        <Card>
                            <Card.Body>
                                <UniversityCards
                                    formValue={formValue}
                                />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default App;