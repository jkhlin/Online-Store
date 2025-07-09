import { Container, VStack, Text } from "@chakra-ui/react";

const HomePage = () => {
    return (
        <Container maxW={"container.xl"} py={12} bg={"green.500"}>
            <VStack>
                <Text
                    fontSize={30}
                    fontWeight={"bold"}
                    bgGradient={"linear(to-r, cyan.200, blue.500)"}
                    bgClip={"text"}
                >
                    Current Products! 
                </Text>
            </VStack>
        </Container>
    )
}

export default HomePage;