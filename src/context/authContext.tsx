import { createContext } from "react"
import { Login, Register } from "../types/formTypes"
import { UserData } from "@/dtos"
interface contentState {
  isLogged: boolean,
  login: (formData: Login)=>Promise<void>,
  SignUp: (formData: Register)=>Promise<void>,
  logout: ()=>void,
  ForgotPassword: (email: string)=>Promise<void>
  isSubmitted: boolean,
  setIsSubmitted: React.Dispatch<React.SetStateAction<boolean>>
  userData: UserData | null;
  // user : null | userType,
  // showUser: () => Promise<void>
}
export const AuthContext = createContext<contentState>({
  isLogged: false,
  logout: () => {},
  login: async () => {},
  SignUp: async () => {},
  ForgotPassword: async () => {},
  isSubmitted: false,
  setIsSubmitted: () => {},
  userData: null,
  // user: null,
  // showUser: async () => {}
})