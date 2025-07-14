import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Box, Button, Heading, HStack, IconButton, Image, Input, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import { useProductStore } from "../store/product";
import { useToast } from "@chakra-ui/react";
import { Modal, useDisclosure, ModalOverlay, ModalContent, ModalBody, ModalCloseButton, ModalHeader, ModalFooter } from "@chakra-ui/react";

const ProductCard = ({ product }) => {
    const textColor = useColorModeValue("gray.600", "gray.200")
    const background = useColorModeValue("white", "gray.800");

    const { deleteProduct} = useProductStore();
    const toast = useToast();

    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleDeleteProduct = async (pid) => {
        const { success, message } = await deleteProduct(pid);
        if (!success) {
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
        else {
            toast({
                title: "Success",
                description: message,
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        }
    }
        
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
                    <IconButton icon={<EditIcon />} onClick={onOpen}  colorScheme="blue" />
                    <IconButton icon={<DeleteIcon />} onClick={() => handleDeleteProduct(product._id)} colorScheme="red" />
                </HStack>
            </Box>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>
                            Update Product
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <VStack spacing={4}>
                                <Input 
                                    placeholder="Product Name"
                                    name="name"
                                />
                                <Input 
                                    placeholder="Product Price"
                                    name="price"
                                />
                                <Input 
                                    placeholder="Product Image URL"
                                    name="image"
                                />
                            </VStack>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme="blue" mr={3} onClick={onClose}>
                                Update
                            </Button>
                            <Button variant={"ghost"}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </ModalContent>
            </Modal>
        </Box>
    )
}

export default ProductCard;