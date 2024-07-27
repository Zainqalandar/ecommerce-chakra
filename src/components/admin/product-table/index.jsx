import { Table, Thead, Tbody, Tr, Th, Td, IconButton, Image, Box, useBreakpointValue } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useState } from "react";
import DeleteConfirmationDialog from "@/components/ui/DeleteConfirmationDialog";

const ProductTable = ({ products, onEdit, onDelete, isDeletePending, DeletePendingHandler }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);


    const fontSize = useBreakpointValue({ base: "sm", md: "md" });
    const handleDeleteClick = (productId) => {
        setSelectedProductId(productId);
        setIsDialogOpen(true);
    };

    const handleConfirmDelete = () => {
        setIsDialogOpen(false);
        DeletePendingHandler({ isDeletePending: true, btnId: selectedProductId });
        onDelete(selectedProductId);
    };

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
                                    onClick={() => handleDeleteClick(product.id)}
                                    size={{ base: "sm", md: "md" }}
                                    isLoading={isDeletePending.isDeletePending && isDeletePending.btnId === product.id}
                                />
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
            <DeleteConfirmationDialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                onConfirm={handleConfirmDelete}
            />
        </Box>
    )
};

export default ProductTable;
