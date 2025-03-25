import { DialogHeader } from "@/components/TailwindDialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/TailwindDialog";
import { FormEvent, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useDeleteDraft } from "@/hooks/drafts/useDeleteDrafts";

export default function HandleDeleteDraftDialog({ id }: { id: string }) {
  const [isOpen, setIsOpen] = useState<boolean>();
  const deleteDraft = useDeleteDraft();
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    deleteDraft.mutateAsync(id);
  };
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(isModalOpen) => setIsOpen(isModalOpen)}
    >
      <DialogTrigger>
        <Button
          type="button"
          variant={"rounded"}
          className="bg-red-warning"
        >
          <FaTrashAlt />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-sm:!w-[400px] max-[500px]:!w-[300px]">
        <DialogHeader className="max-[500px]:hidden">
          <h1 className="text-[1.5rem] text-main-color font-bold">
            Deletar rascunho
          </h1>
        </DialogHeader>
        <header className="flex w-full justify-start items-center max-sm:justify-center">
          <h2 className="text-[20px] text-background-color max-sm:text-center max-[500px]:mt-8 max-[500px]:font-normal">
            Você tem certeza em deletar o rascunho?
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
