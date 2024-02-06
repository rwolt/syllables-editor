"use client";
import { Box, Flex, HStack, Heading, Textarea, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { syllable } from "syllable";

export default function Home() {
  const [text, setText] = useState("");
  const [syllableCounts, setSyllableCounts] = useState<number[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const lines = e.target.value.split("\n");
    const counts = lines.map((line: string) => syllable(line));
    setText(e.target.value);
    setSyllableCounts(counts);
  };

  return (
    <Box w="full">
      <Heading fontSize={["lg", "xl", "2xl"]} m={4}>
        Syllable Text Editor
      </Heading>
      <Box maxW="800px" h="full" p={4}>
        <Flex>
          <VStack w="50px" pt={2} spacing={0}>
            {syllableCounts.map((count, index) => (
              <Box
                key={index}
                h="20px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize={["md", "lg", "xl"]}
              >
                {count}
              </Box>
            ))}
          </VStack>
          <Textarea
            value={text}
            placeholder="Type your lyrics here..."
            onChange={handleChange}
            resize="none"
            fontSize={["md", "lg", "xl"]}
            lineHeight="20px"
            h="1000px"
          />
        </Flex>
      </Box>
    </Box>
  );
}
