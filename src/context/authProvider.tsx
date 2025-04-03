import { useCallback, useEffect, useState } from "react";
import { AuthContext } from "./authContext";
import axios from "axios";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";
import { Register } from "../types/formTypes";
import toast, { Toaster } from "react-hot-toast";
import { ErrorAxiosDto, LoginData, ResponseAxiosDto, UserData } from "../dtos";
import { useCreateDraft } from "@/hooks/drafts/useCreateDraft";
import {jwtDecode} from "jwt-decode"
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
  const createDraft = useCreateDraft();
  const [isOpenCompany , setIsOpenCompany] = useState<boolean>(false)
  const [isLogged, SetIsLogged] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [company , setCompany] = useState<'A C Q Pereira' | 'G W M Arcanjo'>('A C Q Pereira')

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
        setIsOpenCompany(true)
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

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    localStorage.removeItem("userName");
    SetIsLogged(false);
    navigate("/login");
  }

  function isTokenValid(token: string | null): boolean {
    if (!token) return false;
  
    try {
      const decoded: { exp: number } = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Converte milissegundos para segundos
  
      return decoded.exp > currentTime;
    } catch (error) {
      return false; // Se houver erro ao decodificar, o token é inválido
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      SetIsLogged(false);
    } else {
      if(isTokenValid(token)){
        SetIsLogged(true)
        showUser()
      }else{
        logout()
      }
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
    const withoutAuthRoutes = ["/login", "/sign-up", "/sign-up-administrator", "/404"]; 
    const isInWithoutAuthRoute = withoutAuthRoutes.includes(location.pathname);
  
    if (!isInWithoutAuthRoute && !isLogged) {
      navigate("/login", { replace: true });
    } else if (isInWithoutAuthRoute && isLogged && location.pathname !== "/404") {
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
        isSubmitted,
        setIsSubmitted,
        userData,
        setCompany,
        company,
        isOpenCompany,
        setIsOpenCompany
      }}
    >
      <Toaster />
      {children}
    </AuthContext.Provider>
  );
}
