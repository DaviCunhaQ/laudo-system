// import { useNavigate } from 'react-router-dom'
// import { AuthContext } from '../context/authContext'
// import { useContext, useEffect } from 'react'
import { LoginForm } from "../components/login-form";
import Engenheiro from "@/../public/engenheiro.png";
import Logo from "@/../public/icon-eng.svg";
function LoginPage() {
  // const navigate = useNavigate()
  // const {isLogado} = useContext(AuthContext)
  // useEffect(()=>{
  //   if(isLogado){
  //    navigate('/app')
  //   }
  // },[isLogado])
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-end">
          <a
            href="#"
            className="flex items-center gap-2 font-medium text-background-color"
          >
            {/* <div className="flex h-6 w-6 items-center justify-center rounded-md bg-white text-background-color">
              <GalleryVerticalEnd className="size-4" />
            </div> */}
            {/* LIND - DEV */}
          </a>
        </div>
        <div className="flex flex-col flex-1 items-center justify-center">
          <img src={Logo} className="h-[6rem] mb-[1.5rem]" />
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src={Engenheiro}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
export default LoginPage;
