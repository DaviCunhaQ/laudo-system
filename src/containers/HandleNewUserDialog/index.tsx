import { DialogHeader } from "@/components/TailwindDialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/TailwindDialog";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { CreateUserSchema } from "@/dtos";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import { useCreateUser } from "@/hooks/users/useCreateUser";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const rolesList = [
  { value: "Admin", label: "Administrador"},
  { value: "Analist", label: "Analista de Documentos"},
  { value: "Redator", label: "Redator de Laudos"}
]

export default function HandleNewUserDialog() {
  const [selectedRole, setSelectedRole] = useState<string>("")
  const [isOpen, setIsOpen] = useState<boolean>();
  const createUser = useCreateUser()
  
  const {
      register,
      handleSubmit,
      setValue,
      control,
      formState: { errors, isSubmitting},
    } = useForm<CreateUserSchema>({
      resolver: zodResolver(CreateUserSchema)
    });

    const handleClose = ()=>{
        setIsOpen(false)
        setValue("name", "")
        setValue("role", "")
        setValue("email", "")
        setValue("password", "")
    }

    const onSubmit = (data: CreateUserSchema) => {
      createUser.mutateAsync(data).then(()=>{
        handleClose()
        toast.success("Usuário cadastrado com sucesso!")
      })
    };
  
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(isModalOpen) => setIsOpen(isModalOpen)}
    >
      <DialogTrigger>
        <Button type="button" className="flex items-center">
          <p className="max-sm:hidden">Cadastrar Usuário</p> <FaPlus />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-sm:!w-[400px] max-[500px]:!w-[300px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="max-[500px]:hidden">
          <h1 className="text-[1.5rem] text-secondary-color font-bold">
            Cadastrar Usuário
          </h1>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-6">
            <div className="w-full h-auto flex flex-col gap-[1rem]">    
                <div className="flex justify-between items-center w-full max-[1200px]:flex-col max-[1200px]:justify-center">
                    <div className="flex flex-col w-[47%] gap-2 max-[1200px]:w-full max-[1200px]:mb-4">
                        <Label>
                            Nome
                        </Label>
                        <Input type="text" {...register("name")} placeholder="Nome..."/>
                        <p className="text-red-warning">{errors.name?.message}</p>
                    </div>
                    <div className="flex flex-col w-[47%] gap-2 max-[1200px]:w-full">
                        <Label>
                            Email
                        </Label>
                        <Input type="email" {...register("email")} placeholder="Email..."/>
                        <p className="text-red-warning">{errors.email?.message}</p>
                    </div>
                </div>
                <div className="flex justify-between items-center w-full max-[1200px]:flex-col max-[1200px]:justify-center">
                    <div className="flex flex-col w-[47%] gap-2 max-[1200px]:w-full max-[1200px]:mb-4">
                        <Label>
                            Senha
                        </Label>
                        <Input type="password" {...register("password")} placeholder="Senha..."/>
                        <p className="text-red-warning">{errors.password?.message}</p>
                    </div>
                    <div className="flex flex-col w-[47%] gap-2 max-[1200px]:w-full">
                        <Label>
                            Cargo
                        </Label>
                        <Controller
                        control={control}
                        name="role"
                        render={({ field }) => (
                            <Select 
                                {...field}
                                value={selectedRole} 
                                onValueChange={(value) => {
                                    setSelectedRole(value as string)
                                    field.onChange(value)
                                }}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Selecione um cargo..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {rolesList?.map((role)=>{
                                        return(
                                            <SelectItem value={role.value}>{role.label}</SelectItem>
                                        )
                                    })}
                                </SelectContent>
                            </Select>
                        )}/>
                        <p className="text-red-warning">{errors.role?.message}</p>
                    </div>
                </div>
                <div
                  className="mt-4 w-full flex items-center justify-between"
                >
                  <Button
                    type="button"
                    variant={"outline"}
                    onClick={()=>handleClose()}
                    className="w-[47%]"
                  >
                    Cancelar
                  </Button>
                  <Button type="submit" isLoading={isSubmitting} className="w-[47%]">
                    Cadastrar
                  </Button>
                </div>
            </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
