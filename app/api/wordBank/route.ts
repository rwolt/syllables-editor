import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const word = searchParams.get("word");
  try {
    const res = await fetch(
      `https://wordsapiv1.p.rapidapi.com/words/${word}/similarTo`,
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
