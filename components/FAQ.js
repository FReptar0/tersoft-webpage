import { Accordion, AccordionButton, AccordionItem, AccordionPanel, Box, Heading, Text, VStack } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import React from 'react';

const faqData = [
    {
        question: "¿Qué es un sistema ERP?",
        answer: "ERP significa Planificación de Recursos Empresariales. Es un tipo de software que integra varios procesos y funciones empresariales en una organización en un sistema unificado. Esto permite un flujo de datos optimizado, una mejor toma de decisiones y una eficiencia operativa mejorada."
    },
    {
        question: "¿Por qué las empresas necesitan un sistema ERP?",
        answer: "Las empresas utilizan sistemas ERP para eliminar silos de datos, automatizar tareas rutinarias y asegurarse de que cada departamento pueda acceder a información consistente y actualizada. Esto conduce a una mejor toma de decisiones, reducción de costos operativos y aumento de la productividad."
    },
    {
        question: "¿Cómo se diferencia un sistema ERP de otros softwares empresariales?",
        answer: "Mientras que el software empresarial individual podría centrarse en áreas específicas, como contabilidad o gestión de inventario, un sistema ERP abarca una amplia gama de funciones empresariales. Ofrece un enfoque integrado, asegurando que todos los departamentos trabajen con los mismos datos y procesos."
    },
    {
        question: "¿La implementación de un sistema ERP es un proceso largo?",
        answer: "La duración de la implementación de un ERP puede variar según la complejidad del negocio, el alcance del proyecto y la solución ERP específica elegida. Aunque algunas implementaciones pueden tardar unos meses, proyectos más grandes o complejos pueden extenderse más de un año. Una planificación adecuada y una guía experta pueden acelerar el proceso."
    },
    {
        question: "¿Cómo puede determinar una empresa si está lista para un sistema ERP?",
        answer: "Las empresas que enfrentan desafíos con la consistencia de datos, experimentan demoras en la toma de decisiones o les resulta difícil escalar sus operaciones a menudo se benefician de un sistema ERP. Si una empresa está superando su software actual o dedica mucho tiempo a la entrada manual de datos y reconciliación, podría ser el momento de considerar la implementación de un ERP."
    },
    {
        question: "¿Qué es Sage 300 y cómo puede beneficiar a mi negocio?",
        answer: "Sage 300, anteriormente conocido como Accpac, es una solución ERP integral diseñada para automatizar y optimizar procesos empresariales, desde contabilidad y distribución hasta almacenamiento y fabricación, garantizando eficiencia operativa."
    },
    {
        question: "¿Cómo se diferencia Tersoft de otros proveedores de servicios Sage 300?",
        answer: "En Tersoft, priorizamos las necesidades de nuestros clientes, ofreciendo soluciones personalizadas, formación continua e integraciones perfectas. Nuestro compromiso va más allá de la mera implementación, asegurando el éxito de su negocio."
    },
    {
        question: "¿Hay una oferta especial para la implementación de Sage 300?",
        answer: "Sí, actualmente tenemos una oferta especial donde puedes agendar una consulta y aplicar para una implementación gratuita de Sage 300."
    },
    {
        question:"¿Tersoft puede proporcionar módulos personalizados para Sage 300?",
        answer: "¡Absolutamente! Como socio desarrollador de Sage, ofrecemos módulos hechos a medida según las necesidades de tu negocio."
    },
    {
        question: "¿Cómo asegura Tersoft la seguridad de mis datos con Sage 300?",
        answer: "Priorizamos la seguridad de los datos, garantizando que Sage 300 esté alojado en entornos seguros, con copias de seguridad regulares y estrictas medidas de protección de datos."
    }
]


const FAQ = () => {
    return (
        <React.Fragment>
            <Heading as="h2" size="xl" textAlign="center">
                Preguntas Frecuentes
            </Heading>
            <Text p={2} textAlign={'center'}>
                Aquí encontrarás respuestas a algunas preguntas comunes sobre nuestros servicios y soluciones.
            </Text>
            <VStack alignItems="start" maxW="6xl" mx="auto" py={10} textAlign={'center'}>
                <Accordion allowToggle width="100%">
                    {faqData.map((faq, index) => (
                        <AccordionItem key={index}>
                            {() => (
                                <div key={index}>
                                    <h2>
                                        <AccordionButton>
                                            <Box flex="1" textAlign="left" fontWeight="bold">
                                                {faq.question}
                                            </Box>
                                            <ChevronDownIcon />
                                        </AccordionButton>
                                    </h2>
                                    <AccordionPanel>
                                        <Text textAlign={'justify'}>
                                            {faq.answer}
                                        </Text>
                                    </AccordionPanel>
                                </div>
                            )}
                        </AccordionItem>
                    ))}
                </Accordion>
            </VStack>
        </React.Fragment>
    );
};

export default FAQ;
