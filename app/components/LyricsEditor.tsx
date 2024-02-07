import { Box, Flex, VStack, Textarea } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useState } from "react";
import { syllable } from "syllable";
import { cheerio } from "cheerio";
import { RhymeBrainWordObject } from "../page";

type LyricsEditorProps = {
  setCurrentWord: Dispatch<SetStateAction<string>>;
  setRhymes: Dispatch<SetStateAction<RhymeBrainWordObject[]>>;
};

export const LyricsEditor = ({
  setCurrentWord,
  setRhymes,
}: LyricsEditorProps) => {
  const [text, setText] = useState("");
  const [syllableCounts, setSyllableCounts] = useState<number[]>([]);

  const fetchRhymes = async (word: string) => {
    console.log("fetching rhyme data");
    const response = await fetch(
      `https://rhymebrain.com/talk?function=getRhymes&word=${word}`
    );
    const data = await response.json();
    return data;
  };

  const fetchSlantRhymes = async (word: string) => {
    console.log("fetching slant rhyme data");
    const response = await fetch(`http://www.b-rhymes.com/rhyme/word/${word}`);
    const html = response.text();
    const $ = cheerio.load(html);
    const words = $(".rhyme-table .word")
      .map((el: HTMLAnchorElement) => {
        $(el).text.trim();
      })
      .get(); // Convert to standard array
  };

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
      console.log(word);
      setCurrentWord(word);
      const rhymeData = await fetchRhymes(word);
      console.log(rhymeData);
      setRhymes(rhymeData);
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
