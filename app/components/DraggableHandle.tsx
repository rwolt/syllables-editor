import { Box, Flex } from "@chakra-ui/react";

export const DraggableHandle = () => {
  return (
    <Flex width="full" justify="center" cursor="grab">
      <Box
        my={4}
        mb={6}
        width="100px"
        height="5px"
        bg="gray.300"
        borderRadius="md"
      ></Box>
    </Flex>
  );
};
