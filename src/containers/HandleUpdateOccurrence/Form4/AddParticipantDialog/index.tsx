import { DialogHeader } from "@/components/TailwindDialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/TailwindDialog";
import { useState } from "react";
import { FaPlus} from "react-icons/fa";
import {IncidentParticipantSchema} from "@/dtos";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ComboboxDemo, IComboArrayItem } from "@/components/ui/combobox";
import { Textarea } from "@/components/ui/textarea";
import { useCreateParticipant } from "@/hooks/participants/useCreateParticipant";
import toast from "react-hot-toast";

interface ParticipantDialogProps {
  occurrenceId : string;
  poke:React.Dispatch<React.SetStateAction<boolean>>;
  isPoked: boolean;
}

export default function AddParticipantDialog({
  occurrenceId,
  isPoked,
  poke
}: ParticipantDialogProps) {
  const [isOpen, setIsOpen] = useState<boolean>();
  const participations: IComboArrayItem[] = [
    {
      value: "PASSAGEIRO",
      label: "Passageiro",
    },
    {
      value: "TESTEMUNHA",
      label: "Testemunha",
    },
    {
      value: "PEDESTRE",
      label: "Pedestre",
    },
  ];

  const status: IComboArrayItem[] = [
    {
      value: "FERIDO",
      label: "Ferido",
    },
    {
      value: "OBITO",
      label: "Óbito",
    },
    {
      value: "SEM_FERIMENTOS",
      label: "Sem ferimentos",
    },
  ];

  const createParticipant = useCreateParticipant()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting},
    control,
  } = useForm<IncidentParticipantSchema>({
    resolver: zodResolver(IncidentParticipantSchema),
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

  const onSubmit = (data: IncidentParticipantSchema) => {
    const dataInArray = {
      participants: [data]
    }
    createParticipant.mutateAsync(dataInArray).then(()=>{
      setIsOpen(false)
      poke(isPoked? false: true)
      toast.success("Participante criado com sucesso!")
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
            Adicionar participante
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
            <Label>Contato</Label>
            <Input {...register("contact")} placeholder="(xx)-xxxxx-xxxx" />
            <p className="text-red-warning">{errors.contact?.message}</p>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <Label>Descrição</Label>
            <Textarea
              {...register("description")}
              placeholder="Descrição da participação..."
            />
            <p className="text-red-warning">{errors.description?.message}</p>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <Label>Participação</Label>
            <ComboboxDemo
              array={participations}
              control={control}
              emptyMessage="Nenhuma participação encontrado"
              {...register("participation")}
              placeholder="Participações"
              searchPlaceholder="Procurar..."
            />
            <p className="text-red-warning">{errors.contact?.message}</p>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <Label>Estado físico</Label>
            <ComboboxDemo
              array={status}
              control={control}
              emptyMessage="Nenhum estado encontrado"
              {...register("status")}
              placeholder="Estados"
              searchPlaceholder="Procurar..."
            />
            <p className="text-red-warning">{errors.contact?.message}</p>
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
