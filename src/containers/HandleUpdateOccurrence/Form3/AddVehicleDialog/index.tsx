import { DialogHeader } from "@/components/TailwindDialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/TailwindDialog";
import { useState } from "react";
import { FaPlus} from "react-icons/fa";
import { VehicleSchema } from "@/dtos";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import cuid from "cuid";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useCreateVehicles } from "@/hooks/drivers_and_vehicles/useCreateVehicles";

interface VehicleDialogProps {
  occurrenceId: string;
  poke:React.Dispatch<React.SetStateAction<boolean>>;
  isPoked: boolean;
}

export default function AddVehicleDialog({
  occurrenceId,
  poke,
  isPoked
}: VehicleDialogProps) {
  const [isOpen, setIsOpen] = useState<boolean>();
  const createVehicle = useCreateVehicles()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting},
    setValue,
  } = useForm<VehicleSchema>({
    resolver: zodResolver(VehicleSchema),
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

  const onSubmit = (data: VehicleSchema) => {
    const dataInArray = [data]
    createVehicle.mutateAsync(dataInArray).then(()=>{
      setIsOpen(false)
      poke(isPoked? false: true)
      toast.success("Veículo criado com sucesso!")
    }).catch((error)=>{console.error(error)})
  };
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(isModalOpen) => setIsOpen(isModalOpen)}
    >
      <DialogTrigger>
        <Button type="button" className="bg-main-color flex items-center">
          <p className="max-[470px]:hidden">Adicionar</p>
          <FaPlus />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <h1 className="text-[1.5rem] text-main-color font-bold">
            Adicionar veículo
          </h1>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-4 w-full flex flex-col gap-4 items-start"
        >
          <div className="flex flex-col gap-2 w-full">
            <Label>Placa</Label>
            <Input {...register("plate")} placeholder="Placa" />
            <p className="text-red-warning">{errors.plate?.message}</p>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <Label>Modelo</Label>
            <Input {...register("model")} placeholder="Ex: Chevrolet onix..." />
            <p className="text-red-warning">{errors.model?.message}</p>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <Label>Cor</Label>
            <Input {...register("color")} placeholder="Ex: azul..." />
            <p className="text-red-warning">{errors.color?.message}</p>
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
            <Button
              type="submit"
              className="w-[47%]"
              onClick={() => {
                setValue("id", cuid());
              }}
            >
              Adicionar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
