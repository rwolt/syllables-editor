import { WordSearchParameter } from "@/app/page";
import * as cheerio from "cheerio";

export const fetchWordData = async (
  searchParam: WordSearchParameter,
  word: string
) => {
  let data = [];
  switch (searchParam) {
    case "rhyme":
      data = await fetchRhymes(word);
      break;
    case "slantRhyme":
      data = await fetchSlantRhymes(word);
      break;
    case "synonym":
      data = await fetchSynonyms(word);
      break;
    case "wordBank":
      data = await fetchWordBank(word);
      break;
    default:
      throw new Error(`Invalid search parameter: ${searchParam}`);
  }
  return data;
};

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
  const html = await response.text();
  const $ = cheerio.load(html);
  const words = $(".rhyme-table .word")
    .map((i, el) => {
      return $(el).text().trim();
    })
    .get(); // Convert to standard array
  return words;
};

const fetchSynonyms = async (word: string) => {
  console.log("fetching syllable data");
  const response = await fetch(`https://api.datamuse.com/words?ml=${word}`);
  const data = await response.json();
  return data;
};

const fetchWordBank = async (word: string) => {
  console.log("fetching word bank data");
  const response = await fetch(`https://api.datamuse.com/words?ml=${word}`);
  const data = await response.json();
  return data;
};
