'use client';
import { useState } from 'react';
import AdminHeader from '@/components/admin/admin-header';
import ProductTable from '@/components/admin/product-table';
import ProductForm from '@/components/admin/product-form';
import { useProductContext } from '@/provider/context/ProductProvider';
import Loading from '@/components/ui/Loading';
import { useNotification } from '@/provider/context/NotificationProvider';
import { makeApiCall } from '@/app/api/apiService';

const AdminRoot = () => {
	const { products, loading, deleteProductHandler, filterProducts } =
		useProductContext();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [currentProduct, setCurrentProduct] = useState(null);
    const [isDeletePending, setisDeletePending] = useState({
        isDeletePending: false,
        btnId: null
    })

    const DeletePendingHandler = (configData) => {
        setisDeletePending(configData);
    };
    
	const notify = useNotification();
	makeApiCall('products');

	console.log('Hello Admain');

	const handlePost = async (item) => {
        try {
            await makeApiCall('products', 'POST', item);
            notify(`Post successfully added`, 'info', 4000);
        } catch (error) {
            console.log('Api failed err', error);
            notify(`Error: ${error.message}`, 'error');
        }
		
	};
    const handleUpdate = async (item, postId) => {
        try {
            await makeApiCall(`products/${postId}`, 'PUT', item);
            notify(`Post successfully updated`, 'info', 4000);
        } catch (error) {
            console.log('Api failed err', error);
            notify(`Error: ${error.message}`, 'error');
        }
    };

    const handleDelete = async (postId) => {
        try {
            await makeApiCall(`products/${postId}`, 'DELETE');
            notify(`Post deleted successfully`, 'info', 4000);
            deleteProductHandler(postId);
        } catch (error) {
            console.log('Api failed err', error);
            notify(`Error: ${error.message}`, 'error');
            setisDeletePending({ isDeletePending: false, btnId: null });
        }
	};

	const openModal = (product = null) => {
		setCurrentProduct(product);
		setIsModalOpen(true);
	};

	const closeModal = () => setIsModalOpen(false);

	const saveProduct = (product) => {
		if (currentProduct) {
			// setProducts([...products, { ...product, id: products.length + 1 }]);
			handleUpdate(product, product.id);
		} else {
			handlePost(product);
		}
		closeModal();
	};

	const deleteProduct = (id) => {
		handleDelete(id);
	};
	return (
		<>
			<AdminHeader onAdd={() => openModal()} />
			{!loading ? (
				<ProductTable
					products={filterProducts}
					onEdit={openModal}
					onDelete={deleteProduct}
                    isDeletePending={isDeletePending}
                    DeletePendingHandler={DeletePendingHandler}
				/>
			) : (
				<Loading />
			)}
			<ProductForm
				isOpen={isModalOpen}
				onClose={closeModal}
				product={currentProduct}
				onSave={saveProduct}
			/>
		</>
	);
};

export default AdminRoot;
