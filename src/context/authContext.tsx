import { createContext } from "react"
import { Login, Register } from "../types/formTypes"
import { UserData } from "@/dtos"
interface contentState {
  isLogged: boolean
  login: (formData: Login)=>Promise<void>
  SignUp: (formData: Register)=>Promise<void>
  logout: ()=>void
  isSubmitted: boolean
  setIsSubmitted: React.Dispatch<React.SetStateAction<boolean>>
  userData: UserData | null
  setCompany: React.Dispatch<React.SetStateAction<'A C Q Pereira' | 'G W M Arcanjo'>>
  company: 'A C Q Pereira' | 'G W M Arcanjo'
  isOpenCompany: boolean
  setIsOpenCompany: React.Dispatch<React.SetStateAction<boolean>>
}
export const AuthContext = createContext<contentState>({
  isLogged: false,
  logout: () => {},
  login: async () => {},
  SignUp: async () => {},
  isSubmitted: false,
  setIsSubmitted: () => {},
  userData: null,
  setCompany: ()=>{},
  company: 'A C Q Pereira',
  isOpenCompany: false,
  setIsOpenCompany: ()=>{}
})