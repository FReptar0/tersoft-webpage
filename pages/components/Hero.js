import { Container, Row, Col } from 'react-bootstrap';
import Image from 'next/image';

const Hero = () => {
    return (
        <div className="hero">
            <Container className='p-2'>
                <Row>
                    <Col xs={12} md={6} className="hero-content position-relative mt-5 p-3">
                        <div className="content-wrapper position-absolute top-50 start-50 translate-middle">
                            <h1 className='fw-bold fs-1 mt-2'>Título del Hero</h1>
                            <p className='fs-3 text-start'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ultrices gravida tortor, eu gravida mi ultricies non.</p>
                        </div>
                    </Col>
                    <Col xs={12} md={6} className="hero-image image-wrapper mt-5">
                        <Image src={`/edificio.png?${new Date().getTime()}`} id='hero-image' alt="Edificio" width={813} height={562} />
                    </Col>
                </Row>
            </Container>
            <style jsx>{`
        .hero {
        background-color: #fff;
        padding: 60px 0;
        text-align: center;
        }

        .hero-content {
        display: flex;
        align-items: center;
        }

        .content-wrapper {
        width: 100%;
        text-align: center;
        }

        .hero h1 {
        font-size: 32px;
        margin-bottom: 20px;
        }

        .hero p {
        font-size: 18px;
        margin-bottom: 40px;
        }

        .hero-image {
        display: flex;
        align-items: center;
        justify-content: center;
        }
    `}</style>
        </div>
    );
};

export default Hero;
