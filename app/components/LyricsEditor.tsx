import { Box, Flex, VStack, Textarea } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useState } from "react";
import { syllable } from "syllable";
import { WordSearchParameter, DataMuseWordObject } from "../page";
import { fetchWordData } from "./utils/fetchFunctions";

type LyricsEditorProps = {
  wordSearchParameter: WordSearchParameter;
  setCurrentWord: Dispatch<SetStateAction<string>>;
  setRhymes: Dispatch<SetStateAction<string[]>>;
  setSlantRhymes: Dispatch<SetStateAction<string[]>>;
  setSynonyms: Dispatch<SetStateAction<DataMuseWordObject[]>>;
  setWordBank: Dispatch<SetStateAction<DataMuseWordObject[]>>;
};

export const LyricsEditor = ({
  wordSearchParameter,
  setCurrentWord,
  setRhymes,
  setSlantRhymes,
  setSynonyms,
  setWordBank,
}: LyricsEditorProps) => {
  const [text, setText] = useState("");
  const [syllableCounts, setSyllableCounts] = useState<number[]>([]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const lines = e.target.value.split("\n");
    const counts = lines.map((line: string) => syllable(line));
    setText(e.target.value);
    setSyllableCounts(counts);
  };

  const handleTextSelection = async (
    e: React.MouseEvent<HTMLTextAreaElement>
  ) => {
    const selection = window.getSelection();
    if (selection && selection.toString()) {
      console.log("handleTextSelection");
      const word = selection.toString();
      setCurrentWord(word);
      const results = await fetchWordData(wordSearchParameter, word);
      console.log(results);
      switch (wordSearchParameter) {
        case "rhyme":
          setRhymes(results);
        case "slantRhyme":
          setSlantRhymes(results);
        case "synonym":
          setSynonyms(results);
        case "wordBank":
          setWordBank(results);
      }
    }
  };

  return (
    <Box w="800px" h="full" p={4}>
      <Flex>
        <VStack w="50px" pt={2} spacing={0}>
          {syllableCounts.map((count, index) => (
            <Box
              key={index}
              h="20px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              fontSize={["md", "lg", "xl"]}
            >
              {count}
            </Box>
          ))}
        </VStack>
        <Textarea
          value={text}
          placeholder="Type your lyrics here..."
          onChange={handleTextChange}
          onMouseUp={handleTextSelection}
          resize="none"
          fontSize={["md", "lg", "xl"]}
          lineHeight="20px"
          h="1000px"
        />
      </Flex>
    </Box>
  );
};
