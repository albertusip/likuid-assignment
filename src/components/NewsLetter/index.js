import React, { memo, useState } from 'react'

import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'

const NewsLetter = (formValue) => {
    const [newsLetter, setNewsLetter] = useState({
        userName: '',
        userNumber: ''
    });
    const [dataTable, setDataTable] = useState([]);

    const handleChange = (field) => (event) => {
        setNewsLetter({ ...newsLetter, [field]: event.target.value });
    }

    const handleAddTable = () => {
        setDataTable([...dataTable, newsLetter]);
    }

    const handleSubmit = async () => {
        const a = document.createElement("a");
        document.body.appendChild(a);
        const   json = JSON.stringify(dataTable),
                blob = new Blob([json], { type: "application/json" }),
                url = window.URL.createObjectURL(blob);

        a.style = "display: none";
        a.href = url;
        a.download = 'users.json';
        a.click();
        window.URL.revokeObjectURL(url);
    };

    return (
        <Modal
            show={formValue.show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            animation={false}
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    News Letter
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col sm={12} md={4} className="my-1">
                        <Form.Label htmlFor="userName" srOnly>
                            Search University
                        </Form.Label>
                        <Form.Control value={newsLetter.userName} onChange={handleChange('userName')} id="userName" placeholder="User Name" required />
                    </Col>
                    <Col sm={12} md={4} className="my-1">
                        <Form.Label htmlFor="userNumber" srOnly>
                            Search Country
                        </Form.Label>
                        <Form.Control value={newsLetter.userNumber} onChange={handleChange('userNumber')} id="userNumber" placeholder="User Phone Number" type="number" required />
                    </Col>
                    <Col sm={12} md={4} className="my-1">
                        <Button onClick={handleAddTable} type="submit" className="w-100 btn-blue--light">Add to table</Button>
                    </Col>
                </Row>
                    { dataTable.length ?
                        <Table striped bordered hover className="mt-5">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Phone Number</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    dataTable.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.userName}</td>
                                            <td>{item.userNumber}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table> : null
                    }
            </Modal.Body>
            <Modal.Footer>
                <Row className="justify-content-end w-100">
                    <Col sm={12} md={3} lg={2} className="my-2 px-0">
                        <Button onClick={formValue.onHide} variant="light" className="w-100 btn-light-no-bg">Close</Button>
                    </Col>
                    <Col sm={12} md={3} lg={2} className="my-2 px-0">
                        <Button onClick={handleSubmit} type="submit" className="w-100 btn-blue--light">Save</Button>
                    </Col>
                </Row>
            </Modal.Footer>
        </Modal>
    );
}

export default memo(NewsLetter);