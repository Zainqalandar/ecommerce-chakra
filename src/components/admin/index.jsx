'use client'
import {useState} from "react";
import AdminHeader from "@/components/admin/admin-header";
import ProductTable from "@/components/admin/product-table";
import ProductForm from "@/components/admin/product-form";
import {useProductContext} from "@/provider/context/ProductProvider";
import Loading from "@/components/ui/Loading";
import {useNotification} from "@/provider/context/NotificationProvider";

const AdminRoot = () => {
    const {products, loading} = useProductContext()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
    const notify = useNotification()


    const handlePost = async (item) => {
        try {
            const res = await fetch('https://fakestoreapi.com/products', {
                method: 'POST',
                body: JSON.stringify({
                    ...item
                })
            });

            if(res.status === 200) {
                notify(`Post successfully uploaded`, 'info', 4000);
            }

        } catch (error) {
            console.log('Api failed err', error);
            notify(`Error: ${error.message}`, 'error');
        }
    }
    const handleUpdate = async (item, postId) => {
        try {
            const res = await fetch(`https://fakestoreapi.com/products/${postId}`, {
                method: 'PUT',
                body: JSON.stringify({
                    ...item
                })
            });

            if(!res.ok){
                throw new Error(`Error: ${res.message}`)
            }

            if(res.status === 200) {
                notify(`Post successfully updated`, 'info', 4000);
            }
        } catch (error) {
            console.log('Api failed err', error);
            notify(`Error: ${error.message}`, 'error');
        }
    }

    const openModal = (product = null) => {
        setCurrentProduct(product);
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    const saveProduct = (product) => {
        if (currentProduct) {
            // setProducts([...products, { ...product, id: products.length + 1 }]);
            handleUpdate(product, product.id)
        } else {
            handlePost(product)
        }
        closeModal();
    };

    const deleteProduct = (id) => setProducts(products.filter(p => p.id !== id));
    return (
        <>
            <AdminHeader onAdd={() => openModal()}/>
            {
                !loading ? (<ProductTable products={products} onEdit={openModal} onDelete={deleteProduct}/>) : (
                    <Loading/>
                )
            }
            <ProductForm isOpen={isModalOpen} onClose={closeModal} product={currentProduct} onSave={saveProduct}/>
        </>
    )
}

export default AdminRoot