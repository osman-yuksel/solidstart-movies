import { APIEvent, json } from "solid-start/api";

export async function GET({ params }: APIEvent) {
  const response = await (await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&page=1`
  )).json();
  return json({ response });
}