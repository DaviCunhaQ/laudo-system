import { DialogHeader } from "@/components/TailwindDialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/TailwindDialog";
import { FormEvent, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useDeleteOrderService } from "@/hooks/order-services/useDeleteOrderService";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function HandleDeleteOrderServiceDialog({
  id,
  setIsOpenDad,
}: {
  id: string;
  setIsOpenDad: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [isOpen, setIsOpen] = useState<boolean>();
  const deleteOrderService = useDeleteOrderService();
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    deleteOrderService.mutateAsync(id).then(() => {
      setIsOpen(false);
      setIsOpenDad(false);
    });
  };
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(isModalOpen) => setIsOpen(isModalOpen)}
    >
      <DialogTrigger>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="w-full aspect-[2/1] bg-red-warning rounded-md flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-all duration-200 ease-in-out shadow-[0px_8px_8px_0px_rgba(0,_0,_0,_0.1)]">
                <FaTrashAlt color="#fff" size={26} />
                <p className="text-white font-semibold max-[500px]:hidden">
                  Deletar O.S.
                </p>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Deletar O.S.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </DialogTrigger>
      <DialogContent className="max-sm:!w-[400px] max-[500px]:!w-[300px]">
        <DialogHeader className="max-[500px]:hidden">
          <h1 className="text-[1.5rem] text-main-color font-bold">
            Deletar Ordem de Serviço
          </h1>
        </DialogHeader>
        <header className="flex w-full justify-start items-center max-sm:justify-center">
          <h2 className="text-[20px] text-background-color max-sm:text-center max-[500px]:mt-8 max-[500px]:font-normal">
            Você tem certeza em deletar a ordem de serviço?
          </h2>
        </header>
        <form
          onSubmit={handleSubmit}
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
