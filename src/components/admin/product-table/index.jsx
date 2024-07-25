import { Table, Thead, Tbody, Tr, Th, Td, IconButton, Image, Box, useBreakpointValue } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

const ProductTable = ({ products, onEdit, onDelete }) => {
    const fontSize = useBreakpointValue({ base: "sm", md: "md" });
    return (
        <Box padding={{ base: "2", md: "4" }} overflowX="auto">
            <Table variant="simple" size="sm">
                <Thead>
                    <Tr>
                        <Th fontSize={fontSize}>Image</Th>
                        <Th fontSize={fontSize}>Title</Th>
                        <Th fontSize={fontSize}>Price</Th>
                        <Th fontSize={fontSize}>Category</Th>
                        <Th fontSize={fontSize}>Description</Th>
                        <Th fontSize={fontSize}>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {products.map((product) => (
                        <Tr key={product.id}>
                            <Td>
                                <Image src={product.image} alt={product.title} boxSize={{ base: "30px", md: "50px" }} />
                            </Td>
                            <Td fontSize={fontSize}>{product.title}</Td>
                            <Td fontSize={fontSize}>${product.price}</Td>
                            <Td fontSize={fontSize}>{product.category}</Td>
                            <Td fontSize={fontSize}>{product.description}</Td>
                            <Td>
                                <IconButton
                                    icon={<EditIcon />}
                                    aria-label="Edit"
                                    onClick={() => onEdit(product)}
                                    size={{ base: "sm", md: "md" }}
                                    mb={{ base: "10px", md: "15px" }}
                                />
                                <IconButton
                                    icon={<DeleteIcon />}
                                    aria-label="Delete"
                                    onClick={() => onDelete(product.id)}
                                    size={{ base: "sm", md: "md" }}
                                />
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    )
};

export default ProductTable;
