import { For } from "solid-js";
import { useRouteData, RouteDataArgs } from "solid-start";
import { createServerData$ } from "solid-start/server";

function API_KEY() {
  return import.meta.env.VITE_TMDB_API_KEY as string;
}

export function routeData({ params }: RouteDataArgs) {
  return createServerData$(
    async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY()}&language=en-US&page=1`
      );
      return await response.json();
    },
    { key: () => ["popularMovies"] }
  );
}

export default function Home() {
  const popularMovies = useRouteData<typeof routeData>();
  return (
    <main class="mx-auto p-4 text-center text-gray-700">
      <h1 class="max-6-xs my-16 text-6xl font-thin uppercase text-sky-700">
        Home Page
      </h1>
      <h2>{popularMovies.loading.toString()}</h2>
      <ul>
        <For each={popularMovies()?.results}>
          {(movie) => <li>{movie.original_title}</li>}
        </For>
      </ul>
    </main>
  );
}
