import { Container, VStack, Text, SimpleGrid } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import ProductCard from "../components/ProductCard"

const HomePage = () => {
    const { fetchProducts, products } = useProductStore();
    useEffect(() => {
        fetchProducts()
    }, [fetchProducts])
    console.log("HomePage products:", products);

    return (
        <Container maxW={"container.xl"} py={12}>
            <VStack>
                <Text
                    fontSize={30}
                    fontWeight={"bold"}
                    bgGradient={"linear(to-r, cyan.200, blue.500)"}
                    bgClip={"text"}
                >
                    Current Products! 
                </Text>

                <SimpleGrid
                    columns={{ base: 1, md: 2, lg: 3 }}
                    spacing={10}
                    w={"full"}>
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </SimpleGrid>

                {products.length === 0 && (
                    <Text
                        fontSize={"xl"}
                        textAlign={"center"}
                        fontWeight={"bold"}
                        color={"gray.100"}>
                    No products found! {" "}

                    <Link to={"/create"}>
                        <Text as={"span"} color={"blue.500"} _hover={{ textDecoration: "underline" }}>
                            Create Product
                        </Text>
                    </Link>
                </Text>
            )}
            </VStack>
        </Container>
    )
}

export default HomePage;