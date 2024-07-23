'use client';
import ProductDetail from '@/components/product-detail';
import React, { useEffect, useState } from 'react';
import Loading from '@/components/ui/Loading';

const Detail = (props) => {
	const [product, setProduct] = useState({});
    const [loader, setLoader] = useState(true)
    
	useEffect(() => {
		(async () => {
            try {
                const res = await fetch(
                    `https://fakestoreapi.com/products/${props.params.productId}`
				);
				const product = await res.json();
				setProduct(product);
                setLoader(false)
			} catch (error) {
                console.log('Api failed errr::', error);
			}
		})();
	}, []);
    
	return (
		<>
			{
                !loader? (
                    <ProductDetail product={product} />
                ): (
                    <Loading />
                )
            }
		</>
	);
};

export default Detail;
