import { Box, Heading, useColorModeValue } from "@chakra-ui/react";

const HeadingBox = ({text}) => {
    const bgColor = useColorModeValue('#f96e29', 'gray.700');
    const textColor = useColorModeValue('black', 'white');
    const borderColor = useColorModeValue('gray.200', 'gray.600');

    return (
        <Box
            p={5}
            maxW="520px"
            borderWidth="2px"
            borderColor={borderColor}
            borderRadius="lg"
            overflow="hidden"
            bg={bgColor}
            color={textColor}
            textAlign="center"
            mx="auto"
            my="20px"
            boxShadow="lg"
        >
            <Heading size="md" fontWeight="bold">{text}</Heading>
        </Box>
    );
};

export default HeadingBox;
