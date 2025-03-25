import { FormEvent, useContext, useState } from "react";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { AuthContext } from "../context/authContext";
import { Register } from "../types/formTypes";
import google from "../assets/google.png";

export function SignUpAdminForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const { SignUp } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const formData: Register = {
    email,
    name,
    password,
    role,
  };
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    await SignUp(formData);
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-background-color">
            Cadastrar Usuário
          </CardTitle>
          <CardDescription>Crie e cadastre os usuários.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Digite o nome..."
                  required
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="role">Cargo</Label>
                <Input
                  id="role"
                  type="text"
                  placeholder="Digite o cargo..."
                  required
                  onChange={(e) => {
                    setRole(e.target.value);
                  }}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="exemplo@gmail.com"
                  required
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Senha</Label>
                </div>
                <Input
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  id="password"
                  type="password"
                  placeholder="crie uma senha forte..."
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Cadastrar
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full text-background-color"
              >
                <img src={google} alt="" className="h-[1.5rem] w-[1.5rem]" />
                Cadastrar com o google
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
