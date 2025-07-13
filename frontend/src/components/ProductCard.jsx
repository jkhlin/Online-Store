import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Box, Heading, HStack, IconButton, Image, Text, useColorModeValue } from "@chakra-ui/react";

const ProductCard = ({ product }) => {
    const textColor = useColorModeValue("gray.600", "gray.200")
    const background = useColorModeValue("white", "gray.800");
    
    const handleDelete = (id) => {
        console.log("Delete product with id:", id);
        // TODO: Implement delete functionality
    };
    
    const onOpen = () => {
        console.log("Edit product:", product.name);
        // TODO: Implement edit functionality
    };
    
    return (
        <Box 
            shadow={"lg"}
            rounded={"lg"}
            overflow={"hidden"}
            transition={"all 0.3s"}
            _hover={{ transform: "translateY(-5px)", shadow: "xl"}}
            bg={background}
        >
            <Image src={product.image} alt={product.name} h={48} w={"full"} objectFit={"cover"} />
            <Box p={4}>
                <Heading as={"h3"} size={"md"} mb={2}>
                    {product.name}
                </Heading>

                <Text fontWeight={"bold"} fontSize={"xl"} color={textColor} mb={4}>
                    ${product.price}
                </Text>

                <HStack spacing={2}>
                    <IconButton icon={<EditIcon />} onClick={onOpen} colorScheme="blue" />
                    <IconButton icon={<DeleteIcon />} onClick={() => handleDelete(product.id)} colorScheme="red" />
                </HStack>
            </Box>
        </Box>
    )
}

export default ProductCard;