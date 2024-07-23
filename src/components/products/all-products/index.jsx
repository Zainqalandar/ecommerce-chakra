import React from 'react'
import { Box, Image, Badge, Text } from '@chakra-ui/react'

const AllProducts = ({ product }) => {
    
    return (
        <div>
            <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" p="5">
                <Image src={product.image} alt={`Image of ${product.title}`} />

                <Box p="6">
                    <Box display="flex" alignItems="baseline">
                        <Badge borderRadius="full" px="2" colorScheme="teal">
                            New
                        </Badge>
                        <Box
                            color="gray.500"
                            fontWeight="semibold"
                            letterSpacing="wide"
                            fontSize="xs"
                            textTransform="uppercase"
                            ml="2"
                        >
                            {product.category}
                        </Box>
                    </Box>

                    <Box
                        mt="1"
                        fontWeight="semibold"
                        as="h4"
                        lineHeight="tight"
                        isTruncated
                    >
                        {product.title}
                    </Box>

                    <Box>
                        ${product.price}
                        <Box as="span" color="gray.600" fontSize="sm">
                            / unit
                        </Box>
                    </Box>

                    <Box display="flex" mt="2" alignItems="center">
                        {Array(5)
                            .fill("")
                            .map((_, i) => (
                                <Badge key={i} colorScheme={i < Math.round(product.rating.rate) ? "teal" : "gray"}>
                                    ★
                                </Badge>
                            ))}
                        <Box as="span" ml="2" color="gray.600" fontSize="sm">
                            {product.rating.count} reviews
                        </Box>
                    </Box>
                </Box>
            </Box>
        </div>
    )
}

export default AllProducts