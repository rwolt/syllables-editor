"use client";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { useState } from "react";
import { LyricsEditor } from "./components/LyricsEditor";
import { SearchResults } from "./components/SearchResults";

export type WordSearchParameter = "rhyme" | "synonym" | "wordBank";

export default function Home() {
  const [currentWord, setCurrentWord] = useState("");
  const [wordSearchParameter, setWordSearchParameter] =
    useState<WordSearchParameter>("rhyme");
  const [rhymes, setRhymes] = useState<string[]>([]);
  const [synonyms, setSynonyms] = useState<string[]>([]);
  const [wordBank, setWordBank] = useState<string[]>([]);

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
          setSynonyms={setSynonyms}
        />
        <SearchResults
          currentWord={currentWord}
          setCurrentWord={setCurrentWord}
          wordSearchParameter={wordSearchParameter}
          setWordSearchParameter={setWordSearchParameter}
          rhymes={rhymes}
          setRhymes={setRhymes}
          synonyms={synonyms}
          setSynonyms={setSynonyms}
          wordBank={wordBank}
          setWordBank={setWordBank}
        />
      </Flex>
    </Box>
  );
}
