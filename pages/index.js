import React from 'react'
import Head from 'next/head'
import Header from './components/Header'
import 'bootstrap/dist/css/bootstrap.min.css'
import Footer from './components/Footer'
import { Container } from 'react-bootstrap'
import Hero from './components/Hero'

export default function index() {
    return (
        <>
            <Head>
                <title>Home Page</title>
                <meta name='viewport' content='initial-scale=1.0, width=device-width' />
                <meta name='description' content='This is the home page' />
                <meta name='keywords' content='home, page' />
                <meta name='lang' content='es' />
                <meta name='author' content='GitHub: FReptar0 | Linkedin: /in/fernando-rm' />
                <meta name='robots' content='index, follow' />
                <meta httpEquiv='cache-control' content='max-age=31536000' />
            </Head>
            <Header />
            <Container style={styles.container}>
                <section id='about'>
                    <Hero />
                </section>
                <section id='info'>
                    
                </section>
                <section id='testimonials'>
                    
                </section>
                <section id='cta'>
                    
                </section>
                <section id='clients'>
                    
                </section>
                <section id='team'>
                    
                </section>
            </Container>
            <Footer />
        </>
    )
}

const styles = {
    container: {
        marginTop: '10vh'
    }
}