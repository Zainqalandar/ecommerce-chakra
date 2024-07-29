import { memo, useEffect, useState } from 'react';
import { useProductContext } from '@/provider/context/ProductProvider';
import {
	Flex,
	Input,
	Button,
	Select,
	Box,
	IconButton,
	useColorMode,
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

const ProductsFilter = () => {
	const { colorMode } = useColorMode();
	const bgColor = colorMode === 'dark' ? 'gray.700' : 'white';
	const textColor = colorMode === 'dark' ? 'white' : 'black';
	const boxShadowColor = colorMode === 'dark' ? 'gray.900' : 'md';
	const {
		sortByOrder,
		products,
		sortByCategory,
		handleSearchQuerie,
		clearFilterHandler,
		isClearFilter,
		toggle
	} = useProductContext();
	const initFeatureFilters = {
		category: '',
		order: '',
	}
	const [featureFilters, setFeatureFilters] = useState(initFeatureFilters);
	const handleChange = (e) => {
		const { name, value } = e.target;
		if (name === 'categorys') {
			setFeatureFilters(prev => ({
				...prev,
				category: value
			}))
			sortByCategory(value);
		} else if (name === 'orders') {
			setFeatureFilters(prev => ({
				...prev,
				order: value
			}))
			sortByOrder(value);
		}
	};

	useEffect(() => {
        if (isClearFilter) {
            setFeatureFilters(initFeatureFilters);
        }
    }, [toggle, isClearFilter, initFeatureFilters, setFeatureFilters]); // watch the toggle state

	const capitalizeWords = (sentence) => {
		return sentence
			.split(' ')
			.map(
				(word) =>
					word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
			)
			.join(' ');
	};

	const getUniqueCategories = (products) => {
		const categories = products.map((product) => product.category);
		const uniqueCategories = [...new Set(categories)];
		return uniqueCategories;
	};

	return (
		<Flex
			bg={bgColor}
			color={textColor}
			p={6}
			borderRadius="lg"
			boxShadow={boxShadowColor}
			justifyContent="space-between"
			alignItems="center"
			mb="30px"
			flexWrap="wrap"
			gap={4}
		>
			<Box flex="1" display="flex" alignItems="center" gap={2}>
				<Input
					onChange={(e) => handleSearchQuerie(e.target.value)}
					placeholder="Search the products..."
					width="100%"
					bg={bgColor}
					color={textColor}
					_focus={{ boxShadow: 'outline' }}
					borderRadius="full"
				/>
				<Button colorScheme="teal" borderRadius="full">
					Search
				</Button>
				<IconButton
					aria-label="Clear"
					icon={<CloseIcon />}
					colorScheme="red"
					variant="ghost"
					borderRadius="full"
					onClick={() => clearFilterHandler()}
				/>
			</Box>
			<Box flex="0 1 auto" display="flex" alignItems="center" gap={2}>
				<Select
					onChange={(e) => handleChange(e)}
					placeholder="Sort by"
					name="orders"
					value={featureFilters.order}
					bg={bgColor}
					color={textColor}
					_focus={{ boxShadow: 'outline' }}
					borderRadius="full"
					width={{ base: '100%', md: 'auto' }}
				>
					<option value="asc">Lower to Higher</option>
					<option value="desc">Higher to Lower</option>
				</Select>
				<Select
					placeholder="Category"
					onChange={(e) => handleChange(e)}
					name="categorys"
					value={featureFilters.category}
					bg={bgColor}
					color={textColor}
					_focus={{ boxShadow: 'outline' }}
					borderRadius="full"
					width={{ base: '100%', md: 'auto' }}
				>
					{getUniqueCategories(products).map((categorie, index) => (
						<option key={index} value={categorie}>
							{capitalizeWords(categorie)}
						</option>
					))}
				</Select>
			</Box>
		</Flex>
	);
};

export default memo(ProductsFilter);
