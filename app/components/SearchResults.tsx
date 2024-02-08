import { Heading, Box, VStack, Grid, GridItem, Input } from "@chakra-ui/react";
import { WordSearchParameter } from "../page";
import { WordParameterSelector } from "./WordParameterSelector";
import { Dispatch, SetStateAction } from "react";

type SearchResultsProps = {
  currentWord: string;
  setCurrentWord: Dispatch<SetStateAction<string>>;
  setWordSearchParameter: Dispatch<SetStateAction<WordSearchParameter>>;
  wordSearchParameter: WordSearchParameter;
  rhymes: string[];
  synonyms: string[];
};

export const SearchResults = ({
  currentWord,
  wordSearchParameter,
  setWordSearchParameter,
  rhymes,
  synonyms,
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
      default:
        return [];
    }
  };

  return (
    <Box w="800px" h="full" p={4} border="1px solid blue">
      <Input as="h2">{currentWord}</Input>
      <WordParameterSelector setWordSearchParameter={setWordSearchParameter} />
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
