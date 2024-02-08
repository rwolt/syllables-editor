import { WordSearchParameter } from "@/app/page";

export const fetchWordData = async (
  searchParam: WordSearchParameter,
  word: string
) => {
  let data = [];
  switch (searchParam) {
    case "rhyme":
      data = await fetchRhymesFromServer(word);
      break;
    case "synonym":
      data = await fetchSynonymsFromServer(word);
      break;
    case "wordBank":
      data = await fetchWordBankFromServer(word);
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
  try {
    const res = await fetch(`/api/synonym?word=${word}`);
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await res.json();
    return data.data.synonyms;
  } catch (err) {
    console.error("Failed to fetch synonym:", err);
    return [];
  }
};

const fetchWordBankFromServer = async (word: string) => {
  try {
    const res = await fetch(`/api/wordBank?word=${word}`);
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await res.json();
    return data.data.similarTo;
  } catch (err) {
    console.error("Failed to fetch word bank:", err);
    return [];
  }
};
