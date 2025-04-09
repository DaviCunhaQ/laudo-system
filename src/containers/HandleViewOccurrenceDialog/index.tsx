import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/TailwindDialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import DropdownView from "./DropdownView";
import { useShowOrderService } from "@/hooks/order-services/useShowOrderService";
import { Label } from "@/components/ui/label";

export function HandleViewOccurrenceDialog({ id }: { id: string }) {
  const [isOpen, setIsOpen] = useState<boolean>();
  const { data } = useShowOrderService(id);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(isModalOpen) => setIsOpen(isModalOpen)}
    >
      <DialogTrigger>
        <Button type="button" variant={"rounded"} className="bg-soft-blue">
          <FaEye />
        </Button>
      </DialogTrigger>
      <DialogContent className="!max-w-5xl max-h-[70vh] overflow-y-auto max-xl:!max-w-3xl max-lg:!max-w-xl max-md:!max-w-md  max-[640px]:!max-w-[288px]">
        <DialogHeader className="mb-2 max-sm:hidden">
          <h1 className="text-[1.7rem] text-main-color font-bold">
            Visualizar ordem de serviço
          </h1>
        </DialogHeader>
        <DropdownView
          title="Configurações Iniciais"
          className="max-lg:w-5/5 max-sm:mt-12"
        >
          <div className="w-full flex flex-col gap-8">
            <div className="flex items-start gap-8 max-lg:!flex-col">
              <div className="flex flex-col w-full gap-2">
                <Label>Empresa</Label>
                <p className="text-background-color break-words">
                  {data?.company}
                </p>
              </div>
              {/* <div className="flex flex-col w-full gap-2">
                <Label>Subcategoria</Label>
                <p className="text-background-color break-words">
                  {data?.subcategory}
                </p>
              </div>
              <div className="flex flex-col w-full gap-2">
                <Label>Data e hora do registro</Label>
                <p className="text-background-color break-words">
                  {formatDateBR(
                    data?.registeredAt
                      ? data.registeredAt
                      : "2017-11-18T16:02:00.000Z"
                  )}
                </p>
              </div> */}
            </div>
            {/* <div className="flex items-start gap-8 max-lg:!flex-col">
              <div className="flex flex-col w-full gap-2">
                <Label>Danos Materiais</Label>
                <p className="text-background-color break-words">
                  {data?.materialDamage}
                </p>
              </div>
              <div className="flex flex-col w-full gap-2">
                <Label>Detalhamento</Label>
                <p className="text-background-color break-words">
                  {data?.details}
                </p>
              </div>
              <div className="flex flex-col w-full gap-2">
                <Label>Comentários adicionais</Label>
                <p className="text-background-color break-words">
                  {data?.comments}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-8 max-lg:!flex-col">
              <div className="flex flex-col w-full gap-2">
                <Label>Status</Label>
                <p className="text-background-color break-words">
                  {formatEnumCombobox(data?.status ? data.status : "")}
                </p>
              </div>
              <div className="flex flex-col w-full gap-2">
                <Label>Impacto no trânsito</Label>
                <p className="text-background-color break-words">
                  {formatEnumCombobox(
                    data?.trafficImpact ? data.trafficImpact : ""
                  )}
                </p>
              </div>
              <div className="flex flex-col w-full gap-2">
                <Label>Responsável pelo acompanhamento</Label>
                <p className="text-background-color break-words">
                  {data?.accompaniment}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-8">
              <div className="flex flex-col w-full gap-2">
                <Label>Relato resumido</Label>
                <p className="text-background-color break-words">
                  {data?.description}
                </p>
              </div>
            </div> */}
          </div>
        </DropdownView>
      </DialogContent>
    </Dialog>
  );
}
