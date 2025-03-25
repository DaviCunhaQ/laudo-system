import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/TailwindDialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import DropdownView from "./DropdownView";
import { useShowOccurrence } from "@/hooks/occurrence/useShowOccurence";
import formatEnumCombobox from "@/utils/formatEnumCombobox";
import Map from "@/components/map";
import { Input } from "@/components/ui/input";
import formatDateBR from "@/utils/formatDate";

export function HandleViewOccurrenceDialog({ id }: { id: string }) {
  const [isOpen, setIsOpen] = useState<boolean>();
  const [position, setPosition] = useState<string>("");
  const { data } = useShowOccurrence(id);

  useEffect(() => {
    if (data?.location?.geolocation) {
      setPosition(data.location.geolocation);
    }
  }, [data, setPosition]);

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
            Visualizar ocorrência
          </h1>
        </DialogHeader>
        <DropdownView
          title="Configurações Iniciais"
          className="max-lg:w-5/5 max-sm:mt-12"
        >
          <div className="w-full flex flex-col gap-8">
            <div className="flex items-start gap-8 max-lg:!flex-col">
              <div className="flex flex-col w-full gap-2">
                <Label>Categoria</Label>
                <p className="text-background-color break-words">
                  {data?.category}
                </p>
              </div>
              <div className="flex flex-col w-full gap-2">
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
              </div>
            </div>
            <div className="flex items-start gap-8 max-lg:!flex-col">
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
            </div>
          </div>
        </DropdownView>

        <DropdownView title="Localização" className="max-lg:w-5/5">
          <div className="w-full flex flex-col gap-8">
            <div className="flex items-start gap-8 max-lg:!flex-col">
              <div className="flex flex-col w-full gap-2">
                <Label>Cidade</Label>
                <p className="text-background-color break-words">
                  {data?.location.city}
                </p>
              </div>
              <div className="flex flex-col w-full gap-2">
                <Label>Bairro</Label>
                <p className="text-background-color break-words">
                  {data?.location.neighborhood}
                </p>
              </div>
              <div className="flex flex-col w-full gap-2">
                <Label>Rua</Label>
                <p className="text-background-color break-words">
                  {data?.location.street}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-8 max-lg:!flex-col">
              <div className="flex flex-col w-full gap-2">
                <Label>Estado</Label>
                <p className="text-background-color break-words">
                  {data?.location.state}
                </p>
              </div>
              <div className="flex flex-col w-full gap-2">
                <Label>Número</Label>
                <p className="text-background-color break-words">
                  {data?.location.number}
                </p>
              </div>
              <div className="flex flex-col w-full gap-2">
                <Label>Referência</Label>
                <p className="text-background-color break-words">
                  {data?.location.reference}
                </p>
              </div>
            </div>
          </div>
        </DropdownView>

        <DropdownView title="Localização no mapa" className="max-lg:!hidden">
          <div className="flex flex-col w-full gap-2">
            <Label>Posição no mapa</Label>
            <Map
              onPositionChange={setPosition}
              positionDefault={
                data?.location.geolocation
                  ? data.location.geolocation
                  : "-3.4640, -40.6775"
              }
            />
            <Input
              type="hidden"
              value={position}
              readOnly
              placeholder="Selecione um ponto no mapa"
            />
          </div>
        </DropdownView>

        <DropdownView title="Veículos e Motoristas" className="max-lg:w-5/5">
          <div className="w-full flex flex-row gap-8 max-xl:flex-col">
            <div className="flex flex-col items-start gap-8 w-full">
              {(data?.vehicles.length ? data.vehicles.length : 0) > 0 ? (
                data?.vehicles.map((vehicle, index) => {
                  return (
                    <div className="flex flex-col gap-2 w-full" key={index}>
                      <Label>Veículo {index + 1}</Label>
                      <div className="flex w-full justify-between h-[max-content] border-2 rounded-md px-8 py-4 border-main-color max-lg:flex-col max-lg:gap-4">
                        <div className="flex flex-col gap-1">
                          <Label>Modelo</Label>
                          <p className="text-background-color break-words">
                            {vehicle.model}
                          </p>
                        </div>
                        <div className="h-full w-[2px] rounded-[1px] bg-main-color max-lg:hidden" />
                        <div className="flex flex-col gap-1">
                          <Label>Cor</Label>
                          <p className="text-background-color break-words">
                            {vehicle.color}
                          </p>
                        </div>
                        <div className="h-full w-[2px] rounded-[1px] bg-main-color max-lg:hidden" />
                        <div className="flex flex-col gap-1">
                          <Label>Placa</Label>
                          <p className="text-background-color break-words">
                            {vehicle.plate}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p>Nenhum veículo encontrado</p>
              )}
            </div>
            <div className="flex flex-col items-start gap-8 w-full">
              {(data?.drivers.length ? data?.drivers.length : 0) > 0 ? (
                data?.drivers.map((driver, index) => {
                  return (
                    <div className="flex flex-col gap-2 w-full" key={index}>
                      <Label>Motorista {index + 1}</Label>
                      <div className="flex w-full justify-between h-[max-content] border-2 rounded-md px-8 py-4 border-main-color max-lg:flex-col max-lg:gap-4">
                        <div className="flex flex-col gap-1">
                          <Label>Nome</Label>
                          <p className="text-background-color break-words">
                            {driver.name}
                          </p>
                        </div>
                        <div className="h-full w-[2px] rounded-[1px] bg-main-color max-lg:hidden" />
                        <div className="flex flex-col gap-1">
                          <Label>Veículo</Label>
                          <p className="text-background-color break-words">
                            {data?.vehicles.find(
                              (vehicle) => driver.vehicleId === vehicle.id
                            ) &&
                              `${
                                data?.vehicles.find(
                                  (vehicle) => driver.vehicleId === vehicle.id
                                )?.plate
                              }`}
                          </p>
                        </div>
                        <div className="h-full w-[2px] rounded-[1px] bg-main-color max-lg:hidden" />
                        <div className="flex flex-col gap-1">
                          <Label>Habilitado?</Label>
                          <p className="text-background-color break-words">
                            {driver.isLicensed ? "Sim" : "Não"}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p>Nenhum motorista identificado</p>
              )}
            </div>
          </div>
        </DropdownView>

        <DropdownView title="Participantes" className="max-lg:w-5/5">
          <div className="w-full flex flex-col gap-8">
            <div className="flex flex-col items-start gap-8 w-full">
              {(data?.participants.length ? data?.participants.length : 0) >
              0 ? (
                data?.participants.map((participant, index) => {
                  return (
                    <div className="flex flex-col gap-2 w-full" key={index}>
                      <Label>Participante {index + 1}</Label>
                      <div className=" border-2 rounded-md px-8 py-4 border-main-color flex flex-col gap-2 ">
                        <div className="flex w-full justify-between h-[max-content] max-lg:flex-col max-lg:gap-4 max-lg:mb-4">
                          <div className="flex flex-col gap-1">
                            <Label>Nome</Label>
                            <p className="text-background-color">
                              {participant.name}
                            </p>
                          </div>
                          <div className="h-full w-[2px] rounded-[1px] bg-main-color" />
                          <div className="flex flex-col gap-1">
                            <Label>Contato</Label>
                            <p className="text-background-color">
                              {participant.contact}
                            </p>
                          </div>
                          <div className="h-full w-[2px] rounded-[1px] bg-main-color" />
                          <div className="flex flex-col gap-1">
                            <Label>Participação</Label>
                            <p className="text-background-color">
                              {formatEnumCombobox(participant.participation)}
                            </p>
                          </div>
                          <div className="h-full w-[2px] rounded-[1px] bg-main-color" />
                          <div className="flex flex-col gap-1">
                            <Label>Estado</Label>
                            <p className="text-background-color">
                              {formatEnumCombobox(
                                participant.status ? participant.status : ""
                              )}
                            </p>
                          </div>
                        </div>
                        <div className="w-full h-[2px] rounded-1 bg-main-color max-lg:hidden" />
                        <Label>Descrição</Label>
                        <p className="text-background-color">
                          {participant.description}
                        </p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p>Nenhum participante encontrado</p>
              )}
            </div>
          </div>
        </DropdownView>

        <DropdownView title="Autoridades" className="mb-4 max-lg:w-5/5">
          <div className="w-full flex flex-col gap-8">
            <div className="flex flex-col items-start gap-8 w-full">
              {(data?.authorities.length ? data?.authorities.length : 0) > 0 ? (
                data?.authorities.map((authority, index) => {
                  return (
                    <div className="flex flex-col gap-2 w-full" key={index}>
                      <Label>Autoridade {index + 1}</Label>
                      <div className=" border-2 rounded-md px-8 py-4 border-main-color flex flex-col gap-3">
                        <div className="flex w-full justify-between h-[max-content] max-lg:flex-col max-lg:gap-4">
                          <div className="flex flex-col gap-1">
                            <Label>Nome</Label>
                            <p className="text-background-color">
                              {authority.name}
                            </p>
                          </div>
                          <div className="h-full w-[2px] rounded-[1px] bg-main-color max-lg:hidden" />
                          <div className="flex flex-col gap-1">
                            <Label>Tempo de Resposta</Label>
                            <p className="text-background-color">
                              {authority.serviceTime}
                            </p>
                          </div>
                        </div>
                        <div className="w-full h-[2px] rounded-1 bg-main-color max-lg:hidden" />
                        <Label>Providências</Label>
                        <p className="text-background-color">
                          {authority.providences}
                        </p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p>Nenhuma autoridade encontrada</p>
              )}
            </div>
          </div>
        </DropdownView>
      </DialogContent>
    </Dialog>
  );
}
