import React from 'react';
import { Container, Box, Text, Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react'
import Login from '../components/authentication/Login';
import Signup from '../components/authentication/Signup';

const HomePage = () => {
    return (
        <Container maxW='lg' centerContent >
            <Box
                p='3'
                bg={'white'}
                w='100%'
                m='40px 0 15px 0'
                borderRadius={'lg'}
                borderWidth='1px'
            >
                <Text textAlign={'center'} fontFamily={'work sans'} color='black' fontSize={'4xl'}>
                    Chatting Application
                </Text>
            </Box>
            <Box bg={'white'} width='100%' color={'black'} borderRadius={'lg'} borderWidth='1px' p='4' mb='10'>
                <Tabs variant='soft-rounded' colorScheme='green'>
                    <TabList mb='1em'>
                        <Tab width={'50%'}>Login</Tab>
                        <Tab width={'50%'}>Sign Up</Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            <Login />
                        </TabPanel>
                        <TabPanel>
                            <Signup />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Container>
    );
};

export default HomePage;