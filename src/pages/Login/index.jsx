import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import { Icon, Input } from "@/components";
import { useLocalStorage } from "react-use";
import { Navigate } from "react-router-dom";

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Você deve utilizar um E-mail Valido!")
    .required("Campo obrigatório!"),
  password: yup.string().required("Campo obrigatório!"),
});

export const Login = () => {
  const [auth, setAuth] = useLocalStorage("auth", {});
  const formik = useFormik({
    onSubmit: async (values) => {
      const res = await axios({
        method: "get",
        baseURL: import.meta.env.VITE_API_URL,
        url: "/login",
        auth: {
          username: values.email,
          password: values.password,
        },
      });

      setAuth(res.data);
    },
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
  });

  if (auth?.user?.id) {
    return <Navigate to="/dashboard" replace={true} />;
  }

  console.log(formik.values);

  return (
    <div>
      <header className="flex flex-col items-center justify-center  p-4 border-b border-red-300">
        <img src="/imgs/logo-2.svg" className="w-32 md:w-40" />
      </header>

      <main className="container max-w-xl p-4">
        <div className="p-4 flex justify-center items-center">
          <a href="/">
            <Icon
              name="back"
              alt="seta para esquerda botão de voltar"
              className="h-6 "
            />
          </a>
          <h2 className="p-4 text-2xl font-bold text-black text-center">
            FAÇA LOGIN NA SUA CONTA
          </h2>
        </div>

        <form className="p-4 space-y-6" onSubmit={formik.handleSubmit}>
          <Input
            type="text"
            name="email"
            placeholder="Endereço de E-mail"
            error={formik.touched.email && formik.errors.email}
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <Input
            type="password"
            name="password"
            placeholder="Senha"
            error={formik.touched.password && formik.errors.password}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          <button
            className=" block w-full text-center text-white border border-white text-2xl px-8 py-3 rounded-xl font-bold bg-red-500 disabled:bg-gray-300"
            disabled={!formik.isValid || formik.isSubmitting}
          >
            <a>{formik.isSubmitting ? "ENTRANDO..." : "ENTRAR"}</a>
          </button>
        </form>
      </main>
    </div>
  );
};
