import { Box, VStack, Grid, GridItem, Input } from "@chakra-ui/react";
import { WordSearchParameter } from "../page";
import { WordParameterSelector } from "./WordParameterSelector";
import { Dispatch, SetStateAction } from "react";
import { fetchWordData } from "./utils/fetchFunctions";

type SearchResultsProps = {
  currentWord: string;
  setCurrentWord: Dispatch<SetStateAction<string>>;
  setWordSearchParameter: Dispatch<SetStateAction<WordSearchParameter>>;
  wordSearchParameter: WordSearchParameter;
  rhymes: string[];
  setRhymes: Dispatch<SetStateAction<string[]>>;
  synonyms: string[];
  setSynonyms: Dispatch<SetStateAction<string[]>>;
  wordBank: string[];
  setWordBank: Dispatch<SetStateAction<string[]>>;
};

export const SearchResults = ({
  currentWord,
  setCurrentWord,
  wordSearchParameter,
  setWordSearchParameter,
  rhymes,
  setRhymes,
  synonyms,
  setSynonyms,
  wordBank,
  setWordBank,
}: SearchResultsProps) => {
  const renderItems = () => {
    switch (wordSearchParameter) {
      case "rhyme":
        return rhymes.map((rhyme, index) => (
          <GridItem key={index}>{rhyme}</GridItem>
        ));
        break;
      case "synonym":
        return synonyms.map((synonym, index) => (
          <GridItem key={index}>{synonym}</GridItem>
        ));
        break;
      case "wordBank":
        return wordBank.map((word, index) => (
          <GridItem key={index}>{word}</GridItem>
        ));
        break;

      default:
        return [];
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentWord(e.target.value);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setRhymes([]);
    setSynonyms([]);
    setWordBank([]);
    const results = await fetchWordData(
      wordSearchParameter,
      currentWord.trim()
    );
    switch (wordSearchParameter) {
      case "rhyme":
        setRhymes(results);
        break;
      case "synonym":
        setSynonyms(results);
        break;
      case "wordBank":
        setWordBank(results);
        break;
    }
  };

  return (
    <Box w="800px" h="full" p={4} border="1px solid blue">
      <form onSubmit={handleFormSubmit}>
        <Input
          size={["md", "md", "lg"]}
          mb={4}
          value={currentWord}
          onChange={handleTextChange}
        ></Input>
      </form>
      <WordParameterSelector
        currentWord={currentWord}
        wordSearchParameter={wordSearchParameter}
        setWordSearchParameter={setWordSearchParameter}
        setRhymes={setRhymes}
        setSynonyms={setSynonyms}
        setWordBank={setWordBank}
      />
      {renderItems().length > 0 && (
        <Grid
          templateColumns={["1fr", "repeat(3, 1fr)", "repeat(5, 1fr)"]}
          templateRows="25"
        >
          {renderItems()}
        </Grid>
      )}
    </Box>
  );
};
