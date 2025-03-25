import { useCallback, useEffect, useState } from "react";
import { AuthContext } from "./authContext";
import axios, { AxiosError } from "axios";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";
import { Register } from "../types/formTypes";
import toast, { Toaster } from "react-hot-toast";
import { ErrorAxiosDto, LoginData, ResponseAxiosDto, UserData } from "../dtos";
import { useCreateDraft } from "@/hooks/drafts/useCreateDraft";
interface AuthProviderProps {
  children: React.ReactNode;
}

interface ResponseAxiosAuth extends ResponseAxiosDto<{ message: string }> {
  token: string;
  id: string;
  name: string;
  role:string;
}

export function AuthProvider({ children }: AuthProviderProps) {
  // const userId = localStorage.getItem("id")
  const createDraft = useCreateDraft();
  const [isLogged, SetIsLogged] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  // const [user, setUser] = useState(null)
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>(null);
  // const location = useLocation()

  function handleError(error: unknown) {
    if (error instanceof axios.AxiosError) {
      console.log(error);
      toast.error(error.response?.data.message);
    } else {
      console.log(error);
    }
  }

  const showUser = useCallback(async () => {
    const userId = localStorage.getItem("userId");

    try {
      const userResponse = await api.get(`/users/${userId}`);
      const dataUser = userResponse.data;
      setUserData(dataUser);
    } catch (error) {
      handleError(error);
    }
  }, []);

  async function login({ email, password }: LoginData) {
    const serializedLogin = {
      email: email,
      password: password,
    };
    try {
      const response = await api
        .post<ResponseAxiosAuth>("/login", serializedLogin)
        .catch((data: ErrorAxiosDto) => {
          const message =
            data.response?.data.message ||
            "Ocorreu um erro ao adicionar estes dados.";
          toast.error(message);
        });

      if (!response) {
        throw new Error("Ocorreu um erro no login.");
      } else {
        localStorage.setItem(
          "userId",
          response.data?.id ? response.data.id : ""
        );
        localStorage.setItem(
          "token",
          response.data?.token ? response.data.token : ""
        );
        localStorage.setItem(
          "role",
          response.data?.role ? response.data.role : ""
        );
        localStorage.setItem(
          "userName",
          response.data?.name ? response.data.name : ""
        );
        SetIsLogged(true);
        await showUser();
        navigate("/");
        toast.success("Login realizado com sucesso!");
      }
    } catch (error) {
      throw new Error(`ocorreu um erro ao fazer login: ${error}`);
    }
  }

  async function SignUp(formData: Register) {
    try {
      await api.post("/users", formData);
      navigate("/login");
      toast.success("Cadastrado com sucesso");
    } catch (error) {
      handleError(error);
    }
  }

  async function ForgotPassword(email: string) {
    try {
      await api.post("/forgot-password", { email });
      setIsSubmitted(true);
      toast.success("Email enviado com sucesso!");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
        console.error(error);
      } else {
        console.error(error);
      }
    }
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    SetIsLogged(false);
    navigate("/login");
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { replace: true });
      SetIsLogged(false);
    } else {
      SetIsLogged(true);
      setTimeout(() => showUser(), 100); // Pequeno delay para garantir que o token foi salvo
    }
  }, []);

  useEffect(() => {
    const formInStorage = localStorage.getItem("draftFormData");
    const id = localStorage.getItem("draftId");
    const idToMutate = id === null || id === "null" ? undefined : id;
    if (formInStorage) {
      const formToDraft = JSON.parse(formInStorage);
      createDraft
        .mutateAsync({ payload: formToDraft, id: idToMutate })
        .then(() => {
          localStorage.removeItem("draftFormData");
          localStorage.removeItem("draftId");
          toast.success("Rascunho criado.");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [localStorage]);

  useEffect(() => {
    const withoutAuthRoutes = ["/login", "/sign-up", "/sign-up-administrator"];
    const isInWithoutAuthRoute = withoutAuthRoutes.includes(location.pathname);
    if (!isInWithoutAuthRoute && !isLogged) {
      navigate("/login", { replace: true });
    } else if (isInWithoutAuthRoute && isLogged) {
      navigate("/", { replace: true });
    }
  }, [isLogged]);

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        SignUp,
        isLogged,
        ForgotPassword,
        isSubmitted,
        setIsSubmitted,
        userData,
      }}
    >
      <Toaster />
      {children}
    </AuthContext.Provider>
  );
}
