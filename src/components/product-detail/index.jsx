import React from 'react';
import {
	Box,
	Image,
	Badge,
	Text,
	VStack,
	HStack,
	Divider,
	Stack,
	Button,
} from '@chakra-ui/react';
import { useCart } from '@/provider/context/CartDataProvider';

const ProductDetail = ({ product }) => {
	const { handleClick } = useCart();
	return (
		<Box
			maxW="4xl"
			borderWidth="1px"
			borderRadius="lg"
			overflow="hidden"
			p="6"
			m="20px auto"
			boxShadow="lg"
		>
			<HStack spacing="8">
				<Image
					src={
						product?.image ||
						'https://eapi.savierp.com/media/DummyImage.png'
					}
					alt={`Image of ${product.title}`}
					borderRadius="md"
					boxSize="300px"
					objectFit="cover"
					flexShrink={0}
				/>
				<VStack align="start" spacing="4" flex="1">
					<HStack>
						<Badge
							borderRadius="full"
							px="3"
							py="1"
							colorScheme="teal"
						>
							New
						</Badge>
						<Text
							fontSize="sm"
							color="gray.500"
							textTransform="uppercase"
						>
							{product?.category}
						</Text>
					</HStack>
					<Text
						as="h2"
						fontSize="2xl"
						fontWeight="bold"
						lineHeight="short"
					>
						{product?.title}
					</Text>
					<Text fontSize="lg" color="gray.600">
						${product?.price}
					</Text>
					<HStack spacing="1">
						{Array(5)
							.fill('')
							.map((_, i) => (
								<Badge
									key={i}
									colorScheme={
										i < Math.round(product?.rating?.rate)
											? 'teal'
											: 'gray'
									}
								>
									★
								</Badge>
							))}
						<Text ml="2" color="gray.600" fontSize="sm">
							{product?.rating?.count} reviews
						</Text>
					</HStack>
					<Divider />
					<Text fontSize="md" color="gray.700">
						{product?.description}
					</Text>
					<Stack
						direction={{ base: 'column', sm: 'row' }}
						spacing="4"
						mt="4"
					>
						<Button onClick={() => handleClick(product)} colorScheme="teal" variant="solid">
							Add to Cart
						</Button>
						<Button colorScheme="teal" variant="outline">
							Buy Now
						</Button>
					</Stack>
				</VStack>
			</HStack>
		</Box>
	);
};

export default ProductDetail;
