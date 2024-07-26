'use client'
import { Flex, Heading, Button, useColorModeValue } from "@chakra-ui/react";

const AdminHeader = ({ onAdd }) => {
    const bgColor = useColorModeValue('white', 'gray.800');
    const textColor = useColorModeValue('black', 'white');
    const boxShadow = useColorModeValue('md', 'dark-lg');

    return (
        <Flex justifyContent="space-between" alignItems="center" padding="4" backgroundColor={bgColor} boxShadow={boxShadow}>
            <Heading size="lg" color={textColor}>Admin Dashboard</Heading>
            <Flex>
                <Button colorScheme="blue" onClick={onAdd} marginRight="4">Add Product</Button>
            </Flex>
        </Flex>
    );
};

export default AdminHeader;
