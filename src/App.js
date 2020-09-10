import React, { useState } from 'react'

import SearchForm from './components/SearchForm'
import UniversityCards from './components/UniversityCards'
import NewsLetter from './components/NewsLetter'

import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const App = () => {
    const [modalNewsLetter, setModalNewsLetter] = useState({
        show: false
    });
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
                <Row className="align-items-center d-flex justify-content-between mt-5 mb-3">
                    <Col sm={12} md={9} lg={10}>
                        <Row>
                            <SearchForm
                                onSubmit={handleFormSubmit}
                            />
                        </Row>
                    </Col>
                    <Col sm={12} md={3} lg={2} className="text-right">
                        <Button onClick={() => setModalNewsLetter({ show: true })} className="btn-green--light w-100">
                            News Letter
                        </Button>
                        <NewsLetter
                            formValue={modalNewsLetter}
                            show={modalNewsLetter.show}
                            onHide={() => setModalNewsLetter({show: false})}
                        />
                    </Col>
                </Row>
                <Card>
                    <Card.Body>
                        <UniversityCards
                            formValue={formValue}
                        />
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}

export default App;