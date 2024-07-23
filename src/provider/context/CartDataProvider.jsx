'use client';
import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const initial = [];
  const [cartData, setCartData] = useState(initial);
  const [totalPrice, setTotalPrice] = useState(0);
  const [subTotalPrice, setSubTotalPrice] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);

  // Use effect to get localStorage data on client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const localData = localStorage.getItem('cartData');
      if (localData) {
        setCartData(JSON.parse(localData));
      }
      setIsInitialized(true);
    }
  }, []);

  const handleClick = (productToAdd) => {
    setCartData((prev) => {
      const existingProductIndex = prev.findIndex(
        (product) => product.id === productToAdd.id
      );
      if (existingProductIndex !== -1) {
        return prev.map((product, index) =>
          existingProductIndex === index
            ? { ...product, quantity: product.quantity + 1 }
            : product
        );
      } else {
        return [...prev, { ...productToAdd, quantity: 1 }];
      }
    });
  };

  const handleRemoveProduct = (productId) => {
    setCartData((prev) => prev.filter((product) => product.id !== productId));
    console.log('productId', productId);
  };

  useEffect(() => {
    if (typeof window !== "undefined" && isInitialized) {
      localStorage.setItem('cartData', JSON.stringify(cartData));
    }
  }, [cartData, isInitialized]);

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
