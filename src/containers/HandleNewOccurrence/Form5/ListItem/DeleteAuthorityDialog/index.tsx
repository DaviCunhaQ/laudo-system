import { DialogHeader } from "@/components/TailwindDialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/TailwindDialog";
import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { AuthoritySchema } from "@/dtos";
interface DeleteAuthorityProps {
  id: number;
  setAuthorities: React.Dispatch<React.SetStateAction<AuthoritySchema[]>>;
  authorities: AuthoritySchema[];
}

export default function DeleteAuthorityDialog({
  id,
  authorities,
  setAuthorities,
}: DeleteAuthorityProps) {
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
            Deletar autoridade
          </h1>
        </DialogHeader>
        <header className="flex w-full justify-start items-center">
          <h2 className="text-[20px] text-background-color">
            Você tem certeza em deletar a autoridade?
          </h2>
        </header>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const newAuthorities = [
              ...authorities.slice(0, id as number), // Elementos antes do índice
              ...authorities.slice(id as number + 1) // Elementos após o índice
            ];
            setAuthorities(newAuthorities);
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
