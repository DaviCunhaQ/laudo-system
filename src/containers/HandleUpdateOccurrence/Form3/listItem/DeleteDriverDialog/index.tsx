import { DialogHeader } from "@/components/TailwindDialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/TailwindDialog";
import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { DeleteVehicleorDriverProps } from "../DeleteVehicleDialog";
import { useDeleteDriver } from "@/hooks/drivers_and_vehicles/useDeleteDriver";

export default function DeleteDriverDialog({
  id,
  poke,
  isPoked
}: DeleteVehicleorDriverProps) {
  const [isOpen, setIsOpen] = useState<boolean>();
  const deleteDriver = useDeleteDriver()
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
            Deletar motorista
          </h1>
        </DialogHeader>
        <header className="flex w-full justify-start items-center">
          <h2 className="text-[20px] text-background-color">
            Você tem certeza em deletar o motorista?
          </h2>
        </header>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            deleteDriver.mutateAsync(id).then(()=>{
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
