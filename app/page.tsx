import { Box, Flex, HStack, Heading, Textarea, VStack } from "@chakra-ui/react";

export default function Home() {
  return (
    <Box w="full">
      <Heading fontSize={["lg", "xl", "2xl"]}>Syllable Text Editor</Heading>
      <Box maxW="800px" h="full" p={4} border="1px solid blue">
        <Flex>
          <VStack w={["1rem", "1.15rem", "1.25rem"]}></VStack>
          <Textarea resize="none" fontSize={["md", "lg", "xl"]} />
        </Flex>
      </Box>
    </Box>
  );
}
