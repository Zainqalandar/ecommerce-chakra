'use client';
import { createContext, useEffect, useState, useContext } from 'react';
import { useNotification } from './NotificationProvider';

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
	const notify = useNotification()
	const [filterProducts, setFilterProducts] = useState([]);
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [sortOrder, setSortOrder] = useState('');
	const [searchQuerie, setSearchQuerie] = useState('');
	// Sort by Category that time not using ----------
	const [sortCategory, setSortCategory] = useState('');

	useEffect(() => {
		(async () => {
			try {
				const res = await fetch('https://fakestoreapi.com/products');
				const data = await res.json();
				setProducts(data);
				setFilterProducts(data);
				setLoading(false);
			} catch (error) {
				console.log('Api failed Error:', error);
				notify(`Error: ${error.message}`, 'error');
			}
		})();
	}, []);


	const sortByOrder = (order) => {
		let sortedProducts = [];
		if (order === 'asc') {
			sortedProducts = [...filterProducts].sort(
				(a, b) => a.price - b.price
			);
		} else if (order === 'desc') {
			sortedProducts = [...filterProducts].sort(
				(a, b) => b.price - a.price
			);
		} else if (order === '') {
			sortedProducts = [...filterProducts];
		}
		setFilterProducts(sortedProducts);
		setSortOrder(order);
	};

	const sortByCategory = (category) => {
		console.log('category', category);
		let sortedProducts = [];
		if (category !== '') {
			sortedProducts = [...products].filter(
				(product) => product.category === category
			);
		} else {
			sortedProducts = filterProducts;
		}

		if (sortOrder === 'asc') {
			sortedProducts.sort((a, b) => a.price - b.price);
		} else if (sortOrder === 'desc') {
			sortedProducts.sort((a, b) => b.price - a.price);
		}
		setFilterProducts(sortedProducts);
		setSortCategory(category);
	};

	const handleSearchQuerie = (querie) => {
		setSearchQuerie(querie);
	};

	return (
		<ProductContext.Provider
			value={{
				products,
				setProducts,
				sortByOrder,
				loading,
				filterProducts,
				sortByCategory,
				handleSearchQuerie,
				searchQuerie,
				searchQuerie,
			}}
		>
			{children}
		</ProductContext.Provider>
	);
};

export default ProductProvider;

const useProductContext = () => {
	return useContext(ProductContext);
};

export { useProductContext };
