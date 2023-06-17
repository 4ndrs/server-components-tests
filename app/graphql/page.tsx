import { Suspense } from "react";
import { z } from "zod";

const endpoint = "https://graphql.anilist.co/";

const getAikatsu = async () => {
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

const Trending = async () => {
  const query = `
  query {
    Page (perPage: 5) {
      media(type: ANIME, sort: TRENDING_DESC) {
        id
        title {
          romaji
        }
      }
    }
  }
  `;

  const schema = z.object({
    data: z.object({
      Page: z.object({
        media: z
          .object({ id: z.number(), title: z.object({ romaji: z.string() }) })
          .array(),
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
    next: { revalidate: 60 },
  });

  const data = await res.json();

  const {
    data: {
      Page: { media: trendingList },
    },
  } = schema.parse(data);

  return (
    <ul>
      {trendingList.map((anime) => (
        <li key={anime.id}>
          <p>
            <strong>id:</strong> {anime.id}
          </p>
          <p className="mb-3">
            <strong>title:</strong> {anime.title.romaji}
          </p>
        </li>
      ))}
    </ul>
  );
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

      <h1 className="mb-2 mt-8 text-xl font-bold">Trending</h1>

      <Suspense
        fallback={
          <div className="flex flex-col gap-2">
            {Array.from(Array(5)).map((_, index) => (
              <div key={index}>
                <div className="m-1 ml-0 h-5 w-14 animate-pulse bg-slate-300" />
                <div className="m-1 ml-0 h-5 w-24 animate-pulse bg-slate-300" />
              </div>
            ))}
          </div>
        }
      >
        <Trending />
      </Suspense>
    </>
  );
};

export default Page;
