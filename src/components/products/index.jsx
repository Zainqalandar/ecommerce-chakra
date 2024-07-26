'use client';
import ProductsFilter from './products-filters/index';
import AllProducts from './all-products';
// import { useProductContext } from '../../provider/context/ProductProvider';
import Loading from '../ui/Loading';
import React, { useEffect, useState } from 'react';
import { useProductContext } from '@/provider/context/ProductProvider';
import Link from 'next/link';
import HeadingBox from "@/components/ui/HeadingBox";
import {Box} from "@chakra-ui/react";

export const Products = () => {
	const [allProducts, setAllProducts] = useState([]);
	const { filterProducts, loading, searchQuerie } = useProductContext();

	useEffect(() => {
		setAllProducts(filterProducts);
	}, [filterProducts]);

	useEffect(() => {
		let filteredProducts = [];
		if (searchQuerie !== '') {
			 filteredProducts = [...filterProducts].filter((product) => {
				const productName = product.title.toLowerCase();
				const queriesLowerCase = searchQuerie.toLowerCase();
				return productName.includes(queriesLowerCase);
			});
			setAllProducts(filteredProducts);
		}else{
			setAllProducts(filterProducts)
		}
	}, [searchQuerie, filterProducts]);

	return (
		<>
			<ProductsFilter />
			{!loading ? (
				<Box>
					<HeadingBox text={`Men's Clothes`} />
					<Box
						display="flex"
						justifyContent="space-around"
						flexWrap="wrap"
						gap="15px"
					>
						{allProducts
							.filter(
								(product) =>
									product?.category === "men's clothing"
							)
							.map((product, id) => (
								<Link
									href={`/detail/${product.id.toString()}`}
									key={id}
								>
									<AllProducts product={product} />
								</Link>
							))}
					</Box>
					<HeadingBox text={`Women's Clothes`} />
					<Box
						display="flex"
						justifyContent="space-around"
						flexWrap="wrap"
						gap="15px"
					>
						{allProducts
							.filter(
								(product) =>
									product?.category === "women's clothing"
							)
							.map((product, id) => (
								<Link
									href={`/detail/${product.id.toString()}`}
									key={id}
								>
									<AllProducts product={product} />
								</Link>
							))}
					</Box>
					<HeadingBox text={`Electronics`} />
					<Box
						display="flex"
						justifyContent="space-around"
						flexWrap="wrap"
						gap="15px"
					>
						{allProducts
							.filter(
								(product) => product?.category === 'electronics'
							)
							.map((product, id) => (
								<Link
									href={`/detail/${product.id.toString()}`}
									key={id}
								>
									<AllProducts product={product} />
								</Link>
							))}
					</Box>

					<HeadingBox text={`Jewelery`} />
					<Box
						display="flex"
						justifyContent="space-around"
						flexWrap="wrap"
						gap="15px"
					>
						{allProducts
							.filter(
								(product) => product?.category === 'jewelery'
							)
							.map((product, id) => (
								<Link
									href={`/detail/${product.id.toString()}`}
									key={id}
								>
									<AllProducts product={product} />
								</Link>
							))}
					</Box>
				</Box>
			) : (
				<Loading />
			)}
		</>
	);
};
