import React, { useState, useEffect } from 'react'
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { stringify } from 'qs';

import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';

import "./styles.css";

const UniversityCards = ( {formValue} ) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [paginationOptions, setPaginationOptions] = useState({
        offset: 0,
        perPage: 10,
        currentPage: 0,
        pageCount: 0
    });


    const fetchData = async () => {
        setIsLoading(true);

        try {
            const result = await axios.get('http://universities.hipolabs.com/search', {
                params: {
                    name: formValue && formValue.universityName,
                    country: formValue && formValue.universityCountry
                },
                paramsSerializer: (_params) => stringify(_params)
            });
            const slice = result.data.slice(paginationOptions.offset, paginationOptions.offset + paginationOptions.perPage);

            setData(slice);
            setPaginationOptions({ ...paginationOptions, pageCount: Math.ceil(result.data.length / paginationOptions.perPage) });
            
        } catch (error) {
            console.error(error);
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    }

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * paginationOptions.perPage;

        setPaginationOptions({ 
            ...paginationOptions, currentPage: selectedPage, offset: offset
        })
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paginationOptions.currentPage, paginationOptions.perPage, formValue]);

    
    return (
        <>
            <Row className={isLoading ? 'justify-content-center' : ''}>
                {
                    isLoading ?
                        <div className="text-center">
                            <Spinner animation="grow" />
                            <div>Its take a few minutes because api doesn't have pagination</div>
                        </div>
                    :
                    data.map( (item,index) => 
                        <Col
                            key={`university-${index}`}
                            sm={6}
                            md={4}
                            lg={3}
                            className="my-3"
                        >
                            <Card>
                                <Card.Body>
                                    <Card.Title>
                                        {item.name}
                                    </Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">
                                        {item.country}
                                    </Card.Subtitle>
                                    <Card.Link
                                        href={item.web_pages[0]}
                                        target="_blank"
                                    >
                                        Go to website
                                </Card.Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    )
                }
                {
                    isError ?
                        <div className="text-center">
                            <div>Request time out !! because fetch more than 9000 data</div>
                            <div>Please Reload page</div>
                        </div> : null
                }
            </Row>
            <div className="d-flex">
                <ReactPaginate
                    previousLabel="Prev"
                    nextLabel="Next"
                    breakLabel="..."
                    breakClassName="break-me"
                    pageCount={paginationOptions.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={2}
                    onPageChange={handlePageClick}
                    initialPage={paginationOptions.currentPage}
                    containerClassName="pagination"
                    subContainerClassName="pages pagination"
                    activeClassName="active" />
            </div>
        </>
    );
}
export default UniversityCards;