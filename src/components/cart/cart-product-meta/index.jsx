import {
    Box,
    HStack,
    Icon,
    Image,
    Link,
    Stack,
    Text,
    useColorModeValue as mode,
  } from '@chakra-ui/react';
  import { FiGift } from 'react-icons/fi';

  
  const CartProductMeta = (props) => {
    const { isGiftWrapping = true, image, title, description, category } = props;
    function formatDescription(description) {
      // Split the description into an array of words
      const words = description.split(' ');
      // Take the first 6 words and join them back into a string
      const firstSixWords = words.slice(0, 4).join(' ');
      // Append '...' to the end and return
      return firstSixWords + '...';
  }
    return (
      <Stack direction="row" spacing="5" width="full">
        <Image
          rounded="lg"
          width="120px"
          height="120px"
          fit="cover"
          src={image}
          alt={title}
          draggable="false"
          loading="lazy"
        />
        <Box pt="4">
          <Stack spacing="0.5">
            <Text fontWeight="medium">{title}</Text>
            <Text  fontSize="sm">
              {formatDescription(description)}
            </Text>
          </Stack>
          {isGiftWrapping && (
            <HStack spacing="1" mt="3" >
              <Icon as={FiGift} boxSize="4" />
              <Link fontSize="sm" textDecoration="underline">
                {category}
              </Link>
            </HStack>
          )}
        </Box>
      </Stack>
    );
  };

  export default CartProductMeta