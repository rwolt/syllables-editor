import { NextRequest } from "next/server";

// export async function GET(req: NextApiRequest, res: NextApiResponse) {
//   console.log("fetching rhyme data");
//   let { word } = req.query;
//   console.log(word);
//   // Ensure 'word' is a single string
//   if (Array.isArray(word)) {
//     word = word[0]; // Take the first element if it's an array
//   } else if (!word) {
//     // Handle the case where 'word' is undefined
//     res.status(400).json({ error: "No word provided" });
//     return;
//   }
//   const url = `https://wordsapiv1.p.rapidapi.com/words/${encodeURIComponent(
//     word
//   )}/rhymes`;

//   console.log("api key: " + process.env.RAPID_API_KEY);
//   console.log("api host: " + process.env.RAPID_API_HOST);

//   try {
//     const response = await fetch(url, {
//       method: "GET",
//       headers: {
//         "X-RapidAPI-Key": process.env.RAPID_API_KEY || "",
//         "X-RapidAPI-Host": process.env.RAPID_API_HOST || "",
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`Error: ${response.status}`);
//     }

//     const data = await response.json();
//     console.log(data);
//     return data.rhymes;
//   } catch (err) {
//     console.error(err);
//   }
// }

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const word = searchParams.get("word");
  try {
    const res = await fetch(
      `https://wordsapiv1.p.rapidapi.com/words/${word}/rhymes`,
      {
        headers: {
          "X-RapidAPI-Key": process.env.RAPID_API_KEY || "",
          "X-RapidAPI-Host": process.env.RAPID_API_HOST || "",
        },
      }
    );
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }
    const data = await res.json();
    return Response.json({ data });
  } catch (err) {
    console.error(err);
  }
}
