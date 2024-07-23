import { memo } from 'react';
import { useProductContext } from '../../../provider/context/ProductProvider';
import { Flex, Input, Button, Select, Box, useColorMode } from '@chakra-ui/react';

const ProductsFilter = () => {
	const { sortByOrder, products, sortByCategory, handleSearchQuerie } =
		useProductContext();
	const { colorMode } = useColorMode();
	const bgColor = colorMode === 'dark' ? 'gray.700' : 'white';
	const textColor = colorMode === 'dark' ? 'white' : 'black';
	const boxShadowColor = colorMode === 'dark' ? 'gray.900' : 'md';

	function capitalizeWords(sentence) {
		return sentence
			.split(' ')
			.map(
				(word) =>
					word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
			)
			.join(' ');
	}

	function getUniqueCategories(products) {
		const categories = products.map((product) => product.category);
		const uniqueCategories = [...new Set(categories)];
		return uniqueCategories;
	}

	return (
		<Flex
			bg={bgColor}
			color={textColor}
			p={4}
			borderRadius="md"
			boxShadow={boxShadowColor}
			justifyContent="space-between"
			alignItems="center"
			mb="30px"
			wrap="wrap"
		>
			<Box display='flex' gap={{base: '10px', md: '5px'}}>
				<Input
					onChange={(e) => handleSearchQuerie(e.target.value)}
					placeholder="Search..."
					width={{ base: '100%', md: '93%' }}
					mb={{ base: 2, md: 0 }}
					bg={bgColor}
					color={textColor}
				/>
				<Button
					ml={{ base: 0, md: 2 }}
					mt={{ base: 0, md: 0 }}
					colorScheme="teal"
				>
					Search
				</Button>
			</Box>
			<Select
				onChange={(e) => sortByOrder(e.target.value)}
				placeholder="Sort by"
				width={{ base: '100%', md: '20%' }}
				ml={{ base: 0, md: 2 }}
				mt={{ base: 2, md: 0 }}
				bg={bgColor}
				color={textColor}
			>
				<option value="asc">Lower to Higher</option>
				<option value="desc">Higher to Lower</option>
			</Select>
			<Select
				placeholder="Category"
				onChange={(e) => sortByCategory(e.target.value)}
				width={{ base: '100%', md: '30%' }}
				ml={{ base: 0, md: 2 }}
				mt={{ base: 2, md: 0 }}
				bg={bgColor}
				color={textColor}
			>
				{getUniqueCategories(products).map((categorie, index) => (
					<option key={index} value={categorie}>
						{capitalizeWords(categorie)}
					</option>
				))}
			</Select>
		</Flex>
	);
};

export default memo(ProductsFilter);
