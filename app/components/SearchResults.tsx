import { Box, Grid, GridItem, Input, VStack } from "@chakra-ui/react";
import { SearchResultsDrawer } from "./SearchResultsDrawer";
import { DraggableHandle } from "./DraggableHandle";
import { WordSearchParameter } from "../page";
import { WordParameterSelector } from "./WordParameterSelector";
import { Dispatch, SetStateAction } from "react";
import { fetchWordData } from "./utils/fetchFunctions";
import { useMediaQuery } from "@chakra-ui/react";

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

const SearchResults = ({
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
  const [isLessThan62em] = useMediaQuery("(max-width: 62em)");

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
    <Box bgColor="purple.900" px={4} borderRadius="lg" flex={5}>
      {isLessThan62em && <DraggableHandle />}
      <form onSubmit={handleFormSubmit}>
        <Input
          size={["md", "md", "lg"]}
          mt={{ base: 0, lg: 4 }}
          mb={4}
          value={currentWord}
          onChange={handleTextChange}
          bg="white"
          textColor="black"
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
        <VStack overflowY="auto" maxHeight="full">
          <Grid
            templateColumns={["1fr", "repeat(2, 1fr)", "repeat(3, 1fr)"]}
            templateRows="25"
            textColor="white"
          >
            {renderItems()}
          </Grid>
        </VStack>
      )}
    </Box>
  );
};

export const SearchResultsBox = ({
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
  const [isLessThan62em] = useMediaQuery("(max-width: 62em)");

  return isLessThan62em ? (
    <SearchResultsDrawer>
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
    </SearchResultsDrawer>
  ) : (
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
  );
};
