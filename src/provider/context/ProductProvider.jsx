'use client';
import { createContext, useEffect, useState, useContext } from 'react';
import { useNotification } from './NotificationProvider';
import { usePathname, useSearchParams } from 'next/navigation';

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
    const notify = useNotification();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [filterProducts, setFilterProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortOrder, setSortOrder] = useState('');
    const [searchQuerie, setSearchQuerie] = useState('');
    // Sort by Category that time not using ----------
    const [sortCategory, setSortCategory] = useState('');
    const [isClearFilter, setIsClearFilter] = useState(false);
    const [toggle, setToggle] = useState(false); // secondary state to trigger useEffect

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
    }, [notify]);

    useEffect(() => {
        const handleRouteChange = () => {
            clearFilterHandler();
        };

        handleRouteChange(); // Call it initially to handle the first render

        // Listen to changes in pathname or search params
        // This will re-run the effect when pathname or searchParams change
        handleRouteChange();
    }, [pathname, searchParams]);


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

    const deleteProductHandler = (id) => {
        const filterOutDeleteProduct = [...filterProducts].filter((product) => product.id !== id);
        setFilterProducts(filterOutDeleteProduct);
    };

    const clearFilterHandler = () => {
        setFilterProducts(products);
        setSortOrder('');
        setSortCategory('');
        setSearchQuerie('');
        setIsClearFilter(true);
        setToggle(prev => !prev); // toggle the state
        setIsClearFilter(false); // reset isClearFilter after use
    };

    return (
        <ProductContext.Provider
            value={{
                products,
                setProducts,
                filterProducts,
                loading,
                searchQuerie,
                sortByOrder,
                sortByCategory,
                handleSearchQuerie,
                deleteProductHandler,
                clearFilterHandler,
                isClearFilter,
                toggle
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
