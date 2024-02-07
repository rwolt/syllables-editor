import { Heading, Box, VStack, Grid, GridItem, Input } from "@chakra-ui/react";
import { RhymeBrainWordObject, WordSeachParameter } from "../page";
import { WordParameterSelector } from "./WordParameterSelector";
import { Dispatch, SetStateAction } from "react";

type SearchResultsProps = {
  currentWord: string;
  setWordSearchParameter: Dispatch<SetStateAction<WordSeachParameter>>;
  rhymes: RhymeBrainWordObject[];
  slantRhymes: string[];
};

export const SearchResults = ({
  currentWord,
  setWordSearchParameter,
  rhymes,
  slantRhymes,
}: SearchResultsProps) => {
  return (
    <Box w="800px" h="full" p={4} border="1px solid blue">
      <Input as="h2">{currentWord}</Input>
      <WordParameterSelector setWordSearchParameter={setWordSearchParameter} />
      {rhymes.length > 0 && (
        <Grid
          templateColumns={["1fr", "repeat(3, 1fr)", "repeat(5, 1fr)"]}
          templateRows="25"
        >
          {rhymes.map((rhyme, index) => (
            <GridItem key={index}>{rhyme.word}</GridItem>
          ))}
        </Grid>
      )}
    </Box>
  );
};
