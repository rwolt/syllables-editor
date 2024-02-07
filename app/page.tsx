"use client";
import { Box, Flex, HStack, Heading, Textarea, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { LyricsEditor } from "./components/LyricsEditor";
import { SearchResults } from "./components/SearchResults";

export type RhymeBrainWordObject = {
  word: string;
  frequency: number;
  score: string;
  flags: string;
  syllables: string;
};

export type WordSeachParameter =
  | "rhyme"
  | "slantRhyme"
  | "synonym"
  | "wordBank";

export default function Home() {
  const [currentWord, setCurrentWord] = useState("");
  const [wordSearchParamter, setWordSearchParameter] =
    useState<WordSeachParameter>("rhyme");
  const [rhymes, setRhymes] = useState<RhymeBrainWordObject[]>([]);
  const [slantRhymes, setSlantRhymes] = useState<string[]>([]);

  return (
    <Box w="full">
      <Heading fontSize={["lg", "xl", "2xl"]} m={4}>
        Syllable Text Editor
      </Heading>
      <Flex>
        <LyricsEditor setCurrentWord={setCurrentWord} setRhymes={setRhymes} />
        <SearchResults
          currentWord={currentWord}
          setWordSearchParameter={setWordSearchParameter}
          rhymes={rhymes}
          slantRhymes={slantRhymes}
        />
      </Flex>
    </Box>
  );
}
