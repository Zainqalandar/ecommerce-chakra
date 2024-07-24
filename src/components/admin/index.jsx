'use client'
import { useState } from "react";
import AdminHeader from "@/components/admin/admin-header";
import ProductTable from "@/components/admin/product-table";
import ProductForm from "@/components/admin/product-form";
import {useProductContext} from "@/provider/context/ProductProvider";

const AdminRoot = () => {
    const {products} = useProductContext()
/*    const [products, setProducts] = useState([
        {
            id: 1,
            title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
            price: 109.95,
            description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
            category: "men's clothing",
            image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
        },
        {
            id: 2,
            title: "Mens Casual Premium Slim Fit T-Shirts ",
            price: 22.3,
            description: "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
            category: "men's clothing",
            image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
        }
    ]);*/

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);

    const openModal = (product = null) => {
        setCurrentProduct(product);
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    const saveProduct = (product) => {
        if (currentProduct) {
            setProducts(products.map(p => p.id === product.id ? product : p));
        } else {
            setProducts([...products, { ...product, id: products.length + 1 }]);
        }
        closeModal();
    };

    const deleteProduct = (id) => setProducts(products.filter(p => p.id !== id));
    return (
        <>
            <AdminHeader onAdd={() => openModal()} />
            <ProductTable products={products} onEdit={openModal} onDelete={deleteProduct} />
            <ProductForm isOpen={isModalOpen} onClose={closeModal} product={currentProduct} onSave={saveProduct} />
        </>
    )
}

export default AdminRoot