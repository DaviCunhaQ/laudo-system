import { DialogHeader } from "@/components/TailwindDialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/TailwindDialog";
import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { ViewOccurenceSchema } from "@/dtos";
import { useDeleteVehicle } from "@/hooks/drivers_and_vehicles/useDeleteVehicle";

export interface DeleteVehicleorDriverProps {
  id: string,
  data?:ViewOccurenceSchema,
  poke:React.Dispatch<React.SetStateAction<boolean>>,
  isPoked: boolean,
}

export default function DeleteVehicleDialog({
  id,
  poke,
  isPoked
}: DeleteVehicleorDriverProps) {
  const [isOpen, setIsOpen] = useState<boolean>();
  const deleteVehicle = useDeleteVehicle()
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(isModalOpen) => setIsOpen(isModalOpen)}
    >
      <DialogTrigger>
        <FaTrashAlt className="text-red-warning text-[16px] pointer" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <h1 className="text-[1.5rem] text-main-color font-bold">
            Deletar veículo
          </h1>
        </DialogHeader>
        <header className="flex w-full justify-start items-center">
          <h2 className="text-[20px] text-background-color">
            Todos os motoristas vinculados a esse veículo serão deletados. Você
            tem certeza em deletar o veículo?
          </h2>
        </header>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            deleteVehicle.mutateAsync(id).then(()=>{
              setIsOpen(false)
              poke(isPoked? false: true)
            }).catch((error)=>console.error(error))
          }}
          className="mt-4 w-full flex items-center justify-between"
        >
          <Button
            type="button"
            variant={"outline"}
            onClick={() => setIsOpen(false)}
            className="w-[47%]"
          >
            Cancelar
          </Button>
          <Button type="submit" className="w-[47%]">
            Deletar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
