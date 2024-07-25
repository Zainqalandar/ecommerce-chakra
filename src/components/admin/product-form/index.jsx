'use client'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Input,
    Textarea,
    Select,
    Image,
    VStack
} from "@chakra-ui/react";
import {useEffect, useState} from "react";

const ProductForm = ({isOpen, onClose, product, onSave}) => {
    const initialValues = {
        title: "",
        price: 0,
        description: "",
        category: "",
        image: "",
    }
    const [formData, setFormData] = useState(initialValues);

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    useEffect(() => {
        if (product) {
            setFormData(product);
        }else {
            setFormData(initialValues);
        }
    }, [product]);



    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>{product ? "Edit Product" : "Add Product"}</ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                    <VStack spacing="4">
                        <Input placeholder="Title" name="title" value={formData.title} onChange={handleChange}/>
                        <Input placeholder="Price" type="number" name="price" value={formData.price}
                               onChange={handleChange}/>
                        <Textarea placeholder="Description" name="description" value={formData.description}
                                  onChange={handleChange}/>
                        <Input placeholder="Category" name="category" value={formData.category}
                               onChange={handleChange}/>
                        <Input placeholder="Image URL" name="image" value={formData.image} onChange={handleChange}/>
                        {product?.image && <Image src={product?.image} alt="Product Image" boxSize="100px"/>}
                    </VStack>
                </ModalBody>
                <ModalFooter gap='15px'>
                    <Button colorScheme="blue" onClick={() => onSave(formData)}>{product ? "Update" : "Save"}</Button>
                    <Button variant="ghost" onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default ProductForm;
