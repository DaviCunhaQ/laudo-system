import { DialogHeader } from "@/components/TailwindDialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/TailwindDialog";
import { useState } from "react";
import { FaPlus} from "react-icons/fa";
import { DriverSchema} from "@/dtos";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ComboboxDemo, IComboArrayItem } from "@/components/ui/combobox";
import { Controller } from "react-hook-form";
import { useShowOccurrence } from "@/hooks/occurrence/useShowOccurence";
import { useCreateDrivers } from "@/hooks/drivers_and_vehicles/useCreateDrivers";
import toast from "react-hot-toast";

interface DriverDialogProps {
  occurrenceId: string;
  poke:React.Dispatch<React.SetStateAction<boolean>>;
  isPoked: boolean;
}

export default function AddDriverDialog({
  occurrenceId,
  poke,
  isPoked
}: DriverDialogProps) {
  const [isOpen, setIsOpen] = useState<boolean>();
  const {data} = useShowOccurrence(occurrenceId)
  const VehicleData = data?.vehicles ? data.vehicles : []
  const vehicleCombobox: IComboArrayItem[] = VehicleData.map((vehicle) => {
    const newObject: IComboArrayItem = {
      value: vehicle.id,
      label: `${vehicle.model}: ${vehicle.plate}`,
    };
    return newObject;
  });

  const createDrivers = useCreateDrivers()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting},
    control,
  } = useForm<DriverSchema>({
    resolver: zodResolver(DriverSchema),
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

  const onSubmit = (data: DriverSchema) => {
    const dataInArray = [data]
    createDrivers.mutateAsync(dataInArray).then(()=>{
      setIsOpen(false)
      poke(isPoked? false: true)
      toast.success("Motorista criado com sucesso!")
    }).catch((error)=>{console.error(error)})
  };
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(isModalOpen) => setIsOpen(isModalOpen)}
    >
      <DialogTrigger>
        <Button type="button" className="bg-main-color flex items-center'">
          <p className="max-[470px]:hidden">Adicionar</p>
          <FaPlus />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <h1 className="text-[1.5rem] text-main-color font-bold">
            Adicionar motorista
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
            <Label>Possui habilitação?</Label>
            <Controller
              name="isLicensed"
              control={control}
              render={({ field }) => (
                <div className="flex items-center justify-between w-1/2 gap-4">
                  <Label className="flex items-center gap-2 cursor-pointer w-full">
                    <Input
                      type="radio"
                      checked={field.value === true}
                      onChange={() => field.onChange(true)}
                      className="w-5 h-5"
                    />
                    Sim
                  </Label>
                  <Label className="flex items-center gap-2 cursor-pointer w-full">
                    <Input
                      type="radio"
                      checked={field.value === false}
                      onChange={() => field.onChange(false)}
                      className="w-5 h-5"
                    />
                    Não
                  </Label>
                </div>
              )}
            />
            <p className="text-red-warning">{errors.isLicensed?.message}</p>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <Label>Veículo</Label>
            <ComboboxDemo
              array={vehicleCombobox}
              control={control}
              emptyMessage="Nenhum veículo encontrado"
              {...register("vehicleId")}
              placeholder="Veículos"
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
