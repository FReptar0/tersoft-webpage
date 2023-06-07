import React from 'react'
import { Card, Container, Col, Row } from 'react-bootstrap'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

function CTA() {
    return (
        <>
            <Card className='shadow' id='card-cta'>
                <Card.Body>
                    <Row>
                        <Col xs={12} md={6} className="hero-content">
                            <div className="content-wrapper circle-container">
                                <div className="circle-wait-list shadow-lg" id='circle-wait-list'>
                                    <Image alt='Lista de espera' src='/tiempo.png' width={150} height={150} id='icon-wait-list' className='p-3' />
                                </div>
                            </div>
                        </Col>
                        <Col xs={12} md={6} className="hero-image image-wrapper p-5">
                            <div className="content-wrapper">
                                <h2 className="title text-dark">¡Únete a la lista de espera!</h2>
                                <p className="text-dark">¡No te quedes sin tu lugar! Regístrate y aplica para obtener una implementacion del ERP más poderoso del mercado ¡Totalmente gratis!</p>
                                <form>
                                    <div className="email-wait">
                                        <div className="input-group mb-3">
                                            <input
                                                type="email"
                                                className="form-control"
                                                placeholder="example@domain.com"
                                                aria-describedby="button-addon2"
                                                name='email'
                                                id='email-wait-list'
                                                autoComplete='off'
                                                required
                                            />
                                            <button
                                                className="btn btn-secondary"
                                                type="button"
                                                id="button-addon-news"
                                                aria-label="Join To The Wait List"
                                            >
                                                <FontAwesomeIcon icon={faPaperPlane} />
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </>
    )
}

export default CTA