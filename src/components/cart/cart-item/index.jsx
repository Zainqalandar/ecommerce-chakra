import {
	CloseButton,
	Flex,
	Link,
	Select,
	useColorModeValue,
} from '@chakra-ui/react';
import PriceTag from '../price-tag';
import CartProductMeta from '../cart-product-meta';
import { useCart } from '@/provider/context/CartDataProvider';

const QuantitySelect = (props) => {
	return (
		<Select
			maxW="64px"
			aria-label="Select quantity"
			focusBorderColor={useColorModeValue('blue.500', 'blue.200')}
			{...props}
		>
			<option value="1">1</option>
			<option value="2">2</option>
			<option value="3">3</option>
			<option value="4">4</option>
		</Select>
	);
};

const CartItem = (props) => {
	const {handleRemoveProduct} = useCart()
	const {
		isGiftWrapping,
		title,
		description,
		quantity,
		image,
		category,
		currency,
		price,
		onChangeQuantity,
		onClickDelete,
		id
	} = props;


	return (
		<Flex
			direction={{ base: 'column', md: 'row' }}
			justify="space-between"
			align="center"
		>
			<CartProductMeta
				title={title}
				description={description}
				image={image}
				category={category}
				isGiftWrapping={isGiftWrapping}
			/>

			{/* Desktop */}
			<Flex
				width="full"
				justify="space-between"
				display={{ base: 'none', md: 'flex' }}
			>
				<QuantitySelect
					value={quantity}
					onChange={(e) => {
						if (onChangeQuantity)
							onChangeQuantity(+e.currentTarget.value);
					}}
				/>
				<PriceTag price={price} currency={currency} />
				<CloseButton
					aria-label={`Delete ${title} from cart`}
					onClick={() => handleRemoveProduct(id)}
				/>
			</Flex>

			{/* Mobile */}
			<Flex
				mt="4"
				align="center"
				width="full"
				justify="space-between"
				display={{ base: 'flex', md: 'none' }}
			>
				<Link
					fontSize="sm"
					textDecor="underline"
					onClick={(onClickDelete)}
				>
					Delete
				</Link>
				<QuantitySelect
					value={quantity}
					onChange={(e) => {
						if (onChangeQuantity)
							onChangeQuantity(+e.currentTarget.value);
					}}
				/>
				<PriceTag price={price} currency={currency} />
			</Flex>
		</Flex>
	);
};

export default CartItem



