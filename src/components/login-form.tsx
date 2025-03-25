import { Link } from "react-router-dom";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginSchema } from "../dtos";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  // const navigate = useNavigate()
  const { login } = useContext(AuthContext);
  // useEffect(()=>{
  //   if(isLogado){
  //    navigate('/') //mudar depois saprr
  //   }
  // },[isLogado])
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(LoginSchema),
  });

  async function onSubmit(data: LoginSchema) {
    await login(data);
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold text-secondary-color">
          Entrar na sua conta
        </h1>
        <p className="text-balance text-sm text-muted-foreground">
          Sistema de Cadastro de Ordens de Serviço
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            {...register("email")}
            id="email"
            type="email"
            placeholder="exemplo@gmail.com"
            isLoading={isSubmitting}
            required
          />
          <p className="text-red-warning">{errors.email?.message}</p>
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Senha</Label>
          </div>
          <Input
            {...register("password")}
            id="password"
            type="password"
            placeholder="Digite sua senha..."
            isLoading={isSubmitting}
            required
          />
          <p className="text-red-warning">{errors.password?.message}</p>
        </div>
        <Button type="submit" className="w-full">
          Entrar
        </Button>
      </div>
    </form>
  );
}
