import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useLocalStorage, useAsyncFn } from "react-use";
import axios from "axios";
import { format, formatISO } from "date-fns";
import { Icon, Matches, DateSelect } from "@/components/";

export const Dashboard = () => {
  const [currentDate, setDate] = useState(formatISO(new Date(2022, 10, 20)));
  const [auth] = useLocalStorage("auth", {});

  const [{ value: user, loading, error }, fetchHunches] = useAsyncFn(
    async () => {
      const res = await axios({
        method: "get",
        baseURL: import.meta.env.VITE_API_URL,
        url: `/${auth.user.username}`,
      });

      const hunches = res.data.hunches.reduce((acc, hunch) => {
        acc[hunch.gameId] = hunch;
        return acc;
      }, {});

      return {
        ...res.data,
        hunches,
      };
    }
  );

  const [games, fetchGames] = useAsyncFn(async (params) => {
    const res = await axios({
      method: "get",
      baseURL: import.meta.env.VITE_API_URL,
      url: "/games",
      params,
    });
    return res.data;
  });

  const isLoading = games.loading || loading;
  const hasError = games.error || error;
  const isDone = !isLoading && !hasError;

  useEffect(() => {
    fetchHunches();
  }, []);

  useEffect(() => {
    fetchGames({ gameTime: currentDate });
  }, [currentDate]);

  if (!auth?.user?.id) {
    return <Navigate to="/" replace={true} />;
  }
  return (
    <>
      <header className="bg-red-500 text-white p-4">
        <div className="container space-x-6 max-w-3xl flex justify-between p-4">
          <img src="/imgs/logo-fundo-vermelho.svg" className="w-32 md:w-40" />
          <a href="/dashboard">
            <h3 className="text-3xl font-bold">COPA DO MUNDO DA FIFA™</h3>
          </a>
          <a href={`/${auth?.user?.username}`}>
            <Icon name="profile" className="w-8" />
          </a>
        </div>
      </header>

      <main>
        <section id="header" className=" bg-red-500 text-white ">
          <div className="container max-w-3xl space-y-3 p-4">
            <span>{auth.user.name}</span>
            <h3 className="text-2xl text-center font-bold">
              Qual é o seu palpite?
            </h3>
          </div>
        </section>

        <section id="content" className="container max-w-3xl p-4 space-y-6">
          <DateSelect currentDate={currentDate} onChange={setDate} />

          <h4 className="text-xl text-black text-center ">
            FASE DE GRUPOS - 1ª RODADA
          </h4>
          <div className="space-y-6">
            {isLoading && "Carregando jogos..."}
            {hasError && "Ops! Algo deu errado."}

            {isDone &&
              games.value?.map((game) => (
                <Matches
                  key={game.id}
                  gameId={game.id}
                  homeTeam={game.homeTeam}
                  awayTeam={game.awayTeam}
                  gameTime={format(new Date(game.gameTime), "H:mm")}
                  homeTeamScore={user.hunches?.[game.id]?.homeTeamScore || ""}
                  awayTeamScore={user.hunches?.[game.id]?.awayTeamScore || ""}
                />
              ))}
          </div>
        </section>
      </main>
    </>
  );
};
