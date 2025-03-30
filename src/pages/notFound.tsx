import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/authContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import Eng from '@/../public/icon-eng.svg'

export default function NotFound (){
  const {isLogged} = useContext(AuthContext)
  return (
    <>
      <div className="h-screen w-full flex flex-col items-center justify-center gap-2">
        <div className="flex flex-col items-center justify-center gap-2 border-2 rounded-md p-4 border-background-color">
          <img src={Eng} alt="Ícone do Sistema" className="w-[5rem]" />
          <h2 className="font-regular w-[17rem] text-center">Essa página não foi encontrada nesse servidor, por favor verificar se a URL é condizente ou verdadeira.</h2>
          <Link to={`${isLogged?'/':'/login'}`}>
            <Button type="button" variant='outline'>Voltar para o {isLogged ? 'início' : 'login'}</Button>
          </Link>
        </div>
      </div>
    </>
  )
}