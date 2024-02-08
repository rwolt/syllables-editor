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

export type DataMuseWordObject = {
  word: string;
  score: number;
};

export type WordSearchParameter =
  | "rhyme"
  | "slantRhyme"
  | "synonym"
  | "wordBank";

export default function Home() {
  const [currentWord, setCurrentWord] = useState("");
  const [wordSearchParameter, setWordSearchParameter] =
    useState<WordSearchParameter>("rhyme");
  const [rhymes, setRhymes] = useState<string[]>([]);
  const [slantRhymes, setSlantRhymes] = useState<string[]>([]);
  const [wordBank, setWordBank] = useState<DataMuseWordObject[]>([]);
  const [synonyms, setSynonyms] = useState<string[]>([]);

  return (
    <Box w="full">
      <Heading fontSize={["lg", "xl", "2xl"]} m={4}>
        Syllable Text Editor
      </Heading>
      <Flex>
        <LyricsEditor
          wordSearchParameter={wordSearchParameter}
          setCurrentWord={setCurrentWord}
          setRhymes={setRhymes}
          setSlantRhymes={setSlantRhymes}
          setSynonyms={setSynonyms}
          setWordBank={setWordBank}
        />
        <SearchResults
          currentWord={currentWord}
          setCurrentWord={setCurrentWord}
          wordSearchParameter={wordSearchParameter}
          setWordSearchParameter={setWordSearchParameter}
          rhymes={rhymes}
          slantRhymes={slantRhymes}
          synonyms={synonyms}
          wordBank={wordBank}
        />
      </Flex>
    </Box>
  );
}
