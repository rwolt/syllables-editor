import { WordSearchParameter } from "@/app/page";
import * as cheerio from "cheerio";

export const fetchWordData = async (
  searchParam: WordSearchParameter,
  word: string
) => {
  let data = [];
  switch (searchParam) {
    case "rhyme":
      data = await fetchRhymesFromServer(word);
      break;
    case "slantRhyme":
      data = await fetchSlantRhymes(word);
      break;
    case "synonym":
      data = await fetchSynonymsFromServer(word);
      break;
    case "wordBank":
      data = await fetchWordBank(word);
      break;
    default:
      throw new Error(`Invalid search parameter: ${searchParam}`);
  }
  return data;
};

export const fetchRhymesFromServer = async (word: string) => {
  try {
    const res = await fetch(`/api/rhyme?word=${word}`);
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await res.json();
    return data.data.rhymes.all;
  } catch (error) {
    console.error("Failed to fetch rhymes:", error);
    return [];
  }
};

const fetchSynonymsFromServer = async (word: string) => {
  console.log("fetching syllable data");
  const response = await fetch(`/api/synonym?word=${word}`);
  const data = await response.json();
  return data.data.synonyms;
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
const fetchWordBank = async (word: string) => {
  console.log("fetching word bank data");
  const response = await fetch(`https://api.datamuse.com/words?ml=${word}`);
  const data = await response.json();
  return data;
};
