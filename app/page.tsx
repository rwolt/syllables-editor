"use client";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { useState } from "react";
import { LyricsEditor } from "./components/LyricsEditor";
import { SearchResultsBox } from "./components/SearchResults";
import { Header } from "./components/Header";

export type WordSearchParameter = "rhyme" | "synonym" | "wordBank";

export default function Home() {
  const [currentWord, setCurrentWord] = useState("");
  const [wordSearchParameter, setWordSearchParameter] =
    useState<WordSearchParameter>("rhyme");
  const [rhymes, setRhymes] = useState<string[]>([]);
  const [synonyms, setSynonyms] = useState<string[]>([]);
  const [wordBank, setWordBank] = useState<string[]>([]);
  return (
    <Box h="100vh" mx={{ base: 0, lg: 4 }}>
      <Header />
      <Flex
        direction={{ base: "column", lg: "row" }}
        h="full"
        maxW="1200"
        m={{ base: 0, lg: "auto" }}
      >
        <LyricsEditor
          wordSearchParameter={wordSearchParameter}
          setCurrentWord={setCurrentWord}
          setRhymes={setRhymes}
          setSynonyms={setSynonyms}
        />
        <SearchResultsBox
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
