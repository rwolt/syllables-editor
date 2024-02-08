import { Button, HStack } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { WordSearchParameter } from "../page";
import { fetchWordData } from "./utils/fetchFunctions";

type WordParameterSelectorProps = {
  currentWord: string;
  wordSearchParameter: WordSearchParameter;
  setWordSearchParameter: Dispatch<SetStateAction<WordSearchParameter>>;
  setRhymes: Dispatch<SetStateAction<string[]>>;
  setSynonyms: Dispatch<SetStateAction<string[]>>;
};

export const WordParameterSelector = ({
  currentWord,
  wordSearchParameter,
  setWordSearchParameter,
  setRhymes,
  setSynonyms,
}: WordParameterSelectorProps) => {
  const handleButtonClick = async (searchParam: WordSearchParameter) => {
    setWordSearchParameter(searchParam);
    // TODO: Check if the current word is different from the search results
    // If so, clear the arrays, if not just fetch the data for the selected parameter
    setRhymes([]);
    setSynonyms([]);
    const results = await fetchWordData(searchParam, currentWord.trim());
    switch (searchParam) {
      case "rhyme":
        setRhymes(results);
        break;
      case "synonym":
        setSynonyms(results);
        break;
    }
  };

  return (
    <HStack gap={4}>
      <Button colorScheme="teal" onClick={() => handleButtonClick("rhyme")}>
        Rhymes
      </Button>
      <Button colorScheme="teal" onClick={() => handleButtonClick("synonym")}>
        Synonyms
      </Button>
    </HStack>
  );
};
