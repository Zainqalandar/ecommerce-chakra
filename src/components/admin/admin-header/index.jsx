'use client'
import { Flex, Heading, Button } from "@chakra-ui/react";

const AdminHeader = ({ onAdd }) => (
    <Flex justifyContent="space-between" alignItems="center" padding="4" backgroundColor="white" boxShadow="md">
        <Heading size="lg">Admin Dashboard</Heading>
        <Button colorScheme="blue" onClick={onAdd}>Add Product</Button>
    </Flex>
);

export default AdminHeader;