import { z } from "zod";

const getAikatsu = async () => {
  const endpoint = "https://graphql.anilist.co/";

  const query = `
  query {
    Media (id: 15061, type: ANIME) {
      id
      title {
        romaji
        native
      }
    }
  }
  `;

  const schema = z.object({
    data: z.object({
      Media: z.object({
        id: z.number(),
        title: z.object({
          romaji: z.string(),
          native: z.string(),
        }),
      }),
    }),
  });

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ query }),
  });

  if (!res.ok) {
    throw new Error("Something happened");
  }

  const data = await res.json();

  const {
    data: { Media: aikatsu },
  } = schema.parse(data);

  return aikatsu;
};

const Page = async () => {
  const aikatsuAnime = await getAikatsu();

  return (
    <>
      {aikatsuAnime.id}
      <br />
      {aikatsuAnime.title.romaji}
      <br />
      {aikatsuAnime.title.native}
    </>
  );
};

export default Page;
