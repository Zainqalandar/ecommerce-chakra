'use client';
import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

const CartProvider = ({ children }) => {
	const initial = [];
	const [cartData, setCartData] = useState(() => {
		const localData = localStorage.getItem('cartData');
		return localData ? JSON.parse(localData) : initial;
	});
	const [totalPrice, setTotalPrice] = useState(0);
	const [subTotalPrice, setSubTotalPrice] = useState(0);

	const handleClick = (productToAdd) => {
		setCartData((perve) => {
			const exitProductIndex = perve.findIndex(
				(product) => product.id === productToAdd.id
			);
			if (exitProductIndex !== -1) {
				return cartData.map((product, index) =>
					exitProductIndex === index
						? { ...product, quantity: product.quantity + 1 }
						: product
				);
			} else {
				return [...perve, { ...productToAdd, quantity: 1 }];
			}
		});
	};

	const handleRemoveProduct = (productId) => {
		setCartData((perve) =>
			perve.filter((product) => product.id !== productId)
		);
		console.log('productId', productId);
	};

	useEffect(() => {
		localStorage.setItem('cartData', JSON.stringify(cartData));
	}, [cartData]);

	useEffect(() => {
		const newSubTotalPrice = cartData.reduce((acc, currentItem) => {
			return acc + currentItem.quantity * currentItem.price;
		}, 0);
		const newTotalPrice = cartData.reduce((acc, currentItem) => {
			return acc + currentItem.quantity * currentItem.price + 2;
		}, 0);
		setSubTotalPrice(newSubTotalPrice);
		setTotalPrice(newTotalPrice);
	}, [cartData]);

	return (
		<CartContext.Provider
			value={{ cartData, handleClick, handleRemoveProduct, totalPrice, subTotalPrice }}
		>
			{children}
		</CartContext.Provider>
	);
};

export default CartProvider;

const useCart = () => {
	return useContext(CartContext);
};

export { useCart };
