import { Accordion, AccordionButton, AccordionItem, AccordionPanel, Box, Heading, Text, VStack } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import React, { useEffect, useState } from 'react';
import Router from 'next/router';

import FAQTextEN from '../public/langs/en/FAQ.json';
import FAQTextES from '../public/langs/es/FAQ.json';



const FAQ = () => {
    const [faqText, setFaqText] = useState(FAQTextES);

    useEffect(() => {
        if (Router.locale === 'en') {
            setFaqText(FAQTextEN);
        } else {
            setFaqText(FAQTextES);
        }
    }, []);

    const faqData = faqText.faq;
    return (
        <React.Fragment>
            <Heading as="h2" size="xl" textAlign="center">
                {faqText.heading}
            </Heading>
            <Text p={2} textAlign={'center'}>
                {faqText.desc}
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
