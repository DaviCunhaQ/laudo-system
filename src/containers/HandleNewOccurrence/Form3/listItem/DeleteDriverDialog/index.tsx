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

export default function DeleteDriverDialog({
  id,
  drivers,
  setDrivers,
}: DeleteVehicleorDriverProps) {
  const [isOpen, setIsOpen] = useState<boolean>();
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
            const newDrivers = [
              ...drivers.slice(0, id as number ), // Elementos antes do índice
              ...drivers.slice(id as number + 1) // Elementos após o índice
            ];
            setDrivers(newDrivers);
            setIsOpen(false);
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
