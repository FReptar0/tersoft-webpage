import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

const Info = () => {
    return (
        <Card>
            <Card.Body>
                <Row>
                    <Col md={4} className="d-flex align-items-center justify-content-center">
                        <div className='px-5'>
                            <h4 className='mb-3 display-4 fw-bold'>Tersoft:</h4>
                            <p className="text-justify fs-5">Socio clave de Sage 300, líder global en soluciones ERP para pymes. Ofrecemos servicios personalizados, cumplimiento fiscal y adaptabilidad a tus necesidades empresariales.</p>
                        </div>
                    </Col>
                    <Col md={8} className='p-5'>
                        <Row>
                            <Col xs={6} className='my-3'>
                                <div className="d-flex align-items-center flex-column">
                                    <img src="/correo.png" width={50} height={50} alt="Icono 1" />
                                    <div className='mt-3'>
                                        <h5 className="text-center fs-5">Título de la imagen 1</h5>
                                        <p className="text-center fs-6">Texto descriptivo 1</p>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={6} className='my-3'>
                                <div className="d-flex align-items-center flex-column">
                                    <img src="/correo.png" width={50} height={50} alt="Icono 2" />
                                    <div className='mt-3'>
                                        <h5 className="text-center fs-5">Título de la imagen 2</h5>
                                        <p className="text-center fs-6">Texto descriptivo 2</p>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={6} className='my-3'>
                                <div className="d-flex align-items-center flex-column">
                                    <img src="/correo.png" width={50} height={50} alt="Icono 3" />
                                    <div className='mt-3'>
                                        <h5 className="text-center fs-5">Título de la imagen 3</h5>
                                        <p className="text-center fs-6">Texto descriptivo 3</p>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={6} className='my-3'>
                                <div className="d-flex align-items-center flex-column">
                                    <img src="/correo.png" width={50} height={50} alt="Icono 4" />
                                    <div className='mt-3'>
                                        <h5 className="text-center fs-5">Título de la imagen 4</h5>
                                        <p className="text-center fs-6">Texto descriptivo 4</p>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default Info;
