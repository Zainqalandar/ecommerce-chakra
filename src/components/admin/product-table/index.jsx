import { Table, Thead, Tbody, Tr, Th, Td, IconButton, Image, Box } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

const ProductTable = ({ products, onEdit, onDelete }) => {
    console.log('products', products)
    return (
        <Box padding="4">
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>Image</Th>
                        <Th>Title</Th>
                        <Th>Price</Th>
                        <Th>Category</Th>
                        <Th>Description</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {products.map((product) => (
                        <Tr key={product.id}>
                            <Td>
                                <Image src={product.image} alt={product.title} boxSize="50px" />
                            </Td>
                            <Td>{product.title}</Td>
                            <Td>${product.price}</Td>
                            <Td>{product.category}</Td>
                            <Td>{product.description}</Td>
                            <Td>
                                <IconButton icon={<EditIcon />} aria-label="Edit" onClick={() => onEdit(product)} />
                                <IconButton icon={<DeleteIcon />} aria-label="Delete" onClick={() => onDelete(product.id)} />
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    )
};

export default ProductTable;
