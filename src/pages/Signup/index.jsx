import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import { Icon, Input } from "@/components";
import { Navigate } from "react-router-dom";
import { useLocalStorage } from "react-use";

const validationSchema = yup.object().shape({
  name: yup.string().required("Campo obrigatório!"),
  lastname: yup.string().required("Campo obrigatório!"),
  username: yup.string().required("Campo obrigatório!"),
  email: yup
    .string()
    .email("Você deve utilizar um E-mail Valido!")
    .required("Campo obrigatório!"),
  password: yup.string().required("Campo obrigatório!"),
});

export const Signup = () => {
  const [auth, setAuth] = useLocalStorage("auth", {});
  const formik = useFormik({
    onSubmit: async (values) => {
      const res = await axios({
        method: "post",
        baseURL: import.meta.env.VITE_API_URL,
        url: "/users",
        data: values,
      });
      console.log(res.data);
    },
    initialValues: {
      name: "",
      lastname: "",
      username: "",
      email: "",
      password: "",
    },
    validationSchema,
  });

  if (auth?.user?.id) {
    return <Navigate to="/dashboard" replace={true} />;
  }

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
            TORNE-SE UM MEMBRO DA NA TRAVE
          </h2>
        </div>

        <form className="p-4 space-y-6" onSubmit={formik.handleSubmit}>
          <Input
            type="text"
            name="name"
            placeholder="Nome"
            error={formik.touched.name && formik.errors.name}
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {/*Aqui é o input de Nome*/}
          <Input
            type="text"
            name="lastname"
            placeholder="Sobrenome"
            value={formik.values.lastname}
            error={formik.touched.lastname && formik.errors.lastname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {/*Aqui é o input de Sobrenome*/}
          <Input
            type="text"
            name="username"
            placeholder="Nome de usuário"
            value={formik.values.username}
            error={formik.touched.username && formik.errors.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {/*Aqui é o input de Usuario*/}
          <Input
            type="text"
            name="email"
            placeholder="Endereço de E-mail"
            value={formik.values.email}
            error={formik.touched.email && formik.errors.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {/*Aqui é o input de E-mail*/}
          <Input
            type="password"
            name="password"
            placeholder="Senha"
            value={formik.values.password}
            error={formik.touched.password && formik.errors.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {/*Aqui é o input de Senha*/}

          <button
            className=" block w-full text-center text-white border border-white text-2xl px-8 py-3 rounded-xl font-bold bg-red-500 disabled:bg-gray-300"
            type="submit"
            href="/dashboard"
            disabled={!formik.isValid || formik.isSubmitting}
          >
            {formik.isSubmitting ? "FALTA POUCO..." : "JUNTE-SE A NÓS"}
          </button>
        </form>
      </main>
    </div>
  );
};
