import { For, Show } from "solid-js";
import {
  useRouteData,
  RouteDataArgs,
  createRouteData,
  refetchRouteData,
} from "solid-start";

export function routeData({ params }: RouteDataArgs) {
  return createRouteData(
    async () => {
      const response = await fetch(
        `${import.meta.env.VITE_HOSTNAME}/api/movies/popular`
      );
      return await response.json();
    },
    { key: () => ["popularMovies"] }
  );
}

export default function Home() {
  const popularMovies = useRouteData<typeof routeData>();
  console.log(import.meta.env.VITE_HOSTNAME, import.meta.env.VITE_TMDB_API_KEY);
  return (
    <main class="mx-auto p-4 text-center text-gray-700">
      <h1 class="max-6-xs my-16 text-6xl font-thin uppercase text-sky-700">
        Home Page
      </h1>
      <button
        class="border-2 border-black p-2"
        onclick={() => {
          refetchRouteData(["popularMovies"]);
        }}
      >
        Refetch
      </button>
      <ul>
        <Show when={!popularMovies.loading} fallback={<div>loading...</div>}>
          <For each={popularMovies()?.response.results}>
            {(movie) => <li>{movie.title}</li>}
          </For>
        </Show>
      </ul>
    </main>
  );
}
