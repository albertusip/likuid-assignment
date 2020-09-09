import React, { memo, useState } from 'react'

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

const SearchForm = ({onSubmit}) => {
    const [search, setSearch] = useState({
        universityName: '',
        universityCountry: ''
    });

    const handleChange = (field) => (event) => {
        setSearch({ ...search, [field]: event.target.value });
    }

    const handleSubmit = () => {
        onSubmit(search);
    }

    return (
        <Row md={3} className="align-items-center d-flex justify-content-center">
            <Col sm={12} className="my-1">
                <Form.Label htmlFor="formSearchUniversity" srOnly>
                    Search University
                </Form.Label>
                <Form.Control value={search.universityName} onChange={handleChange('universityName')} id="formSearchUniversity" placeholder="University Name" />
            </Col>
            <Col sm={12} className="my-1">
                <Form.Label htmlFor="formSearchCountry" srOnly>
                    Search Country
                </Form.Label>
                <FormControl value={search.universityCountry} onChange={handleChange('universityCountry')} id="formSearchCountry" placeholder="University Country" />
            </Col>
            <Col sm={12} md={2} className="my-1">
                <Button onClick={handleSubmit} type="submit" className="w-100 btn-blue--light">Search</Button>
            </Col>
        </Row>
    );
}

export default memo(SearchForm);