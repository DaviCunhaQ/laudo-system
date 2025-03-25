import { DialogHeader } from "@/components/TailwindDialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/TailwindDialog";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import {
  AuthoritySchema,
} from "@/dtos";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMultiStep } from "@/context/Multistepper";

interface AuthorityDialogProps {
  setAuthorities: React.Dispatch<React.SetStateAction<AuthoritySchema[]>>;
  authorities: AuthoritySchema[];
}

export default function AddAuthorityDialog({
  authorities,
  setAuthorities,
}: AuthorityDialogProps) {
  const { formData } = useMultiStep();
  const [isOpen, setIsOpen] = useState<boolean>();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting},
    reset
  } = useForm<AuthoritySchema>({
    resolver: zodResolver(AuthoritySchema),
    defaultValues: {
      occurrenceId: formData.form1?.id ? formData.form1.id : "",
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
    // createOccurrence.mutateAsync(data).then(()=>goToNextStep()).catch((error)=>{console.error(error)})
    if (authorities) {
      const newauthorities = [...authorities , data];
      setAuthorities(newauthorities);
      reset();
      setIsOpen(false);
    }
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
            <Label>Tempo de resposta</Label>
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
