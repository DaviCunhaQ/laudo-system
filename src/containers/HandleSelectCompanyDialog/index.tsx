import { DialogHeader } from "@/components/TailwindDialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/TailwindDialog";
import { FormEvent, useContext, useState } from "react";
import { AuthContext } from "@/context/authContext";

export default function HandleSelectCompanyDialog() {
  const { isOpenCompany, setIsOpenCompany, company, setCompany } =
    useContext(AuthContext);
  const [selectedCompany, setSelectedCompany] = useState<
    "A C Q Pereira" | "G W M Arcanjo"
  >(company);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setCompany(selectedCompany);
    setIsOpenCompany(false);
    localStorage.removeItem("currentCompany")
  };
  return (
    <Dialog
      open={isOpenCompany}
      onOpenChange={(isModalOpen) => {
        if (!isModalOpen) setIsOpenCompany(false);
      }}
      modal={true}
    >
      <DialogContent className="max-sm:!w-[400px] max-[500px]:!w-[300px]">
        <DialogHeader className="max-[500px]:hidden">
          <h1 className="text-[1.5rem] text-background-color font-bold">
            Selecionar empresa
          </h1>
        </DialogHeader>
        <header className="flex w-full justify-start items-center max-sm:justify-center">
          <h2 className="text-[20px] text-background-color max-sm:text-center max-[500px]:mt-8 max-[500px]:font-normal">
            Empresa selecionada: {company}
          </h2>
        </header>
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-center"
        >
          <div className="mt-2 mb-4 w-full">
            <select
              value={selectedCompany}
              onChange={(e) =>
                setSelectedCompany(
                  e.target.value as "A C Q Pereira" | "G W M Arcanjo"
                )
              }
              className="focus:ring-0 focus:border-input outline-none w-full px-4 py-2 text-sm border border-input bg-background rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring transition-colors"
            >
              <option value="" disabled>
                Empresa...
              </option>
              <option value="A C Q Pereira">A C Q Pereira</option>
              <option value="G W M Arcanjo">G W M Arcanjo</option>
            </select>
          </div>
          <div className="mt-4 w-full flex items-center justify-between">
            <Button
              type="button"
              variant={"outline"}
              onClick={() => setIsOpenCompany(false)}
              className="w-[47%]"
            >
              Cancelar
            </Button>
            <Button type="submit" className="w-[47%]">
              Selecionar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
