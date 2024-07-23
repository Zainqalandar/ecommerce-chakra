'use client';
import { Box } from '@chakra-ui/react';
import ProductsFilter from './products-filters/index';
import AllProducts from './all-products';
// import { useProductContext } from '../../provider/context/ProductProvider';
import Loading from '../ui/Loading';
import { useEffect, useState } from 'react';
import { useProductContext } from '@/provider/context/ProductProvider';
import Link from 'next/link';

export const Products = () => {
	const [allProducts, setAllProducts] = useState([]);
	const { filterProducts, loading, searchQuerie } = useProductContext();

	useEffect(() => {
		setAllProducts(filterProducts);
	}, [filterProducts]);

	useEffect(() => {
		let filteredProducts = [];
		if (searchQuerie !== '') {
			console.log('searchQuerie', searchQuerie)
			 filteredProducts = [...filterProducts].filter((product) => {
				const productName = product.title.toLowerCase();
				const querieLowerCase = searchQuerie.toLowerCase();
				return productName.includes(querieLowerCase);
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
					<Box
						p={5}
						maxW="520px"
						borderWidth="1px"
						borderRadius="lg"
						overflow="hidden"
						bg="#f96e29"
						fontWeight="bold"
						color="black"
						textAlign="center"
						mx="auto"
						my="20px"
					>
						Men&apos;s Clothes
					</Box>
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

					<Box
						p={5}
						maxW="520px"
						borderWidth="1px"
						borderRadius="lg"
						overflow="hidden"
						bg="#f96e29"
						fontWeight="bold"
						color="black"
						textAlign="center"
						mx="auto"
						my="20px"
					>
						Women&apos;s Clothes
					</Box>
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

					<Box
						p={5}
						maxW="520px"
						borderWidth="1px"
						borderRadius="lg"
						overflow="hidden"
						bg="#f96e29"
						fontWeight="bold"
						color="black"
						textAlign="center"
						mx="auto"
						my="20px"
					>
						Electronics
					</Box>
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

					<Box
						p={5}
						maxW="520px"
						borderWidth="1px"
						borderRadius="lg"
						overflow="hidden"
						bg="#f96e29"
						fontWeight="bold"
						color="black"
						textAlign="center"
						mx="auto"
						my="20px"
					>
						Jewelery
					</Box>
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
