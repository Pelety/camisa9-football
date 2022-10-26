import { Navigate } from "react-router-dom";
import { useLocalStorage } from "react-use";

export function Home() {
  const [auth] = useLocalStorage("auth", {});
  if (auth?.user?.id) {
    return <Navigate to="/dashboard" replace={true} />;
  }
  return (
    <div className="h-screen md:w-full bg-red-700 p-6 space-y-6 text-white flex flex-col items-center">
      <header className="container flex justify-center max-w-5xl p-4">
        <img src="/imgs/logo.svg" className="w-40" />
      </header>
      <div className="container max-w-6xl  flex-1 flex flex-col items-center md:flex-row space-y-6 md:space-y-0 md: space-x-6">
        <div className="md:flex-1 flex justify-center">
          <img src="/imgs/photo.png" className="w-full max-w-md md:max-w-7xl" />
        </div>
        <div className="md:flex-1 flex flex-col space-y-6 flex-1 ">
          <h1 className="text-5xl text-center font-bold">
            {" "}
            Dê o seu palpite na Copa do Mundo do Catar 2022!
          </h1>
          <a
            href="/signup"
            className="text-center text-red-700 bg-white text-2xl px-8 py-3 rounded-xl font-bold"
          >
            Criar Minha Conta
          </a>

          <a
            href="/login"
            className="text-center text-white border border-white text-2xl px-8 py-3 rounded-xl font-bold"
          >
            Fazer Login
          </a>
        </div>
      </div>
    </div>
  );
}
