import { Heading, Box, VStack, Grid, GridItem, Input } from "@chakra-ui/react";
import {
  DataMuseWordObject,
  RhymeBrainWordObject,
  WordSearchParameter,
} from "../page";
import { WordParameterSelector } from "./WordParameterSelector";
import { Dispatch, SetStateAction } from "react";

type SearchResultsProps = {
  currentWord: string;
  setCurrentWord: Dispatch<SetStateAction<string>>;
  setWordSearchParameter: Dispatch<SetStateAction<WordSearchParameter>>;
  wordSearchParameter: WordSearchParameter;
  rhymes: RhymeBrainWordObject[];
  slantRhymes: string[];
  synonyms: DataMuseWordObject[];
  wordBank: DataMuseWordObject[];
};

export const SearchResults = ({
  currentWord,
  wordSearchParameter,
  setWordSearchParameter,
  rhymes,
  slantRhymes,
  synonyms,
  wordBank,
}: SearchResultsProps) => {
  const renderItems = () => {
    switch (wordSearchParameter) {
      case "rhyme":
        return rhymes.map((rhyme, index) => (
          <GridItem key={index}>{rhyme.word}</GridItem>
        ));
        break;
      case "slantRhyme":
        return slantRhymes.map((slantRhyme, index) => (
          <GridItem key={index}>{slantRhyme}</GridItem>
        ));
        break;
      case "synonym":
        return synonyms.map((synonym, index) => (
          <GridItem key={index}>{synonym.word}</GridItem>
        ));
        break;
      case "wordBank":
        return wordBank.map((word, index) => (
          <GridItem key={index}>{word.word}</GridItem>
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
