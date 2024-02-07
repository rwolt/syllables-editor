import { Button, HStack } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { WordSeachParameter } from "../page";

type WordParameterSelectorProps = {
  setWordSearchParameter: Dispatch<SetStateAction<WordSeachParameter>>;
};

export const WordParameterSelector = ({
  setWordSearchParameter,
}: WordParameterSelectorProps) => {
  const handleButtonClick = (searchParam: WordSeachParameter) => {
    setWordSearchParameter(searchParam);
  };

  return (
    <HStack gap={4}>
      <Button colorScheme="teal" onClick={() => handleButtonClick("rhyme")}>
        Rhymes
      </Button>
      <Button
        colorScheme="teal"
        onClick={() => handleButtonClick("slantRhyme")}
      >
        Slant Rhymes
      </Button>
      <Button colorScheme="teal" onClick={() => handleButtonClick("synonym")}>
        Synonyms
      </Button>
      <Button colorScheme="teal" onClick={() => handleButtonClick("wordBank")}>
        Word Bank
      </Button>
    </HStack>
  );
};