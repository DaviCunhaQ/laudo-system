import { DialogHeader } from "@/components/TailwindDialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/TailwindDialog";
import { useState } from "react";
import { FaPlus} from "react-icons/fa";
import {
  AuthoritySchema,
} from "@/dtos";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateAuthority } from "@/hooks/authorities/useCreateAuthority";
import toast from "react-hot-toast";

interface AuthorityDialogProps {
  occurrenceId: string;
  poke:React.Dispatch<React.SetStateAction<boolean>>;
  isPoked: boolean;
}

export default function AddAuthorityDialog({
  occurrenceId,
  isPoked,
  poke
}: AuthorityDialogProps) {
  const [isOpen, setIsOpen] = useState<boolean>();
  const createAuthority = useCreateAuthority()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting},
  } = useForm<AuthoritySchema>({
    resolver: zodResolver(AuthoritySchema),
    defaultValues: {
      occurrenceId: occurrenceId,
      //     accompaniment: formData.form1?.accompaniment,
      //     category: formData.form1?.category,
      //     comments: formData.form1?.comments,
      //     description: formData.form1?.description,
      //     details: formData.form1?.details,
      //     materialDamage: formData.form1?.materialDamage,
      //     registeredAt: formData.form1?.registeredAt
      //         ? new Date(formData.form1.registeredAt).toISOString().slice(0, 16) // Converte para "YYYY-MM-DDTHH:MM"
      //         : "",
      //     status: formData.form1?.status,
      //     subcategory: formData.form1?.subcategory,
      //     trafficImpact: formData.form1?.trafficImpact,
      // }
    },
  });

  const onSubmit = (data: AuthoritySchema) => {
    createAuthority.mutateAsync({authorities: [data]}).then(()=>{
      setIsOpen(false)
      poke(isPoked? false: true)
      toast.success("Autoridade criada com sucesso!")
    }).catch((error)=>{console.error(error)})
  };
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(isModalOpen) => setIsOpen(isModalOpen)}
    >
      <DialogTrigger>
        <Button type="button" className="bg-main-color flex items-center'">
          <p>Adicionar</p>
          <FaPlus />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <h1 className="text-[1.5rem] text-main-color font-bold">
            Adicionar autoridade
          </h1>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-4 w-full flex flex-col gap-4 items-start"
        >
          <div className="flex flex-col gap-2 w-full">
            <Label>Nome</Label>
            <Input {...register("name")} placeholder="Nome do Indivíduo" />
            <p className="text-red-warning">{errors.name?.message}</p>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <Label>Providências</Label>
            <Input
              {...register("providences")}
              placeholder="Medidas tomadas..."
            />
            <p className="text-red-warning">{errors.providences?.message}</p>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <Label>Tempo de resopsta</Label>
            <Input
              {...register("serviceTime")}
              placeholder="Ex: 12 minutos..."
            />
            <p className="text-red-warning">{errors.serviceTime?.message}</p>
          </div>

          <div className="w-full flex justify-between items-center mt-2">
            <Button
              type="button"
              disabled={isSubmitting}
              variant={"outline"}
              onClick={() => setIsOpen(false)}
              className="w-[47%]"
            >
              Cancelar
            </Button>
            <Button type="submit" className="w-[47%]">
              Adicionar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
