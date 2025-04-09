import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/TailwindDialog";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import DropdownView from "./DropdownView";
import { useShowOrderService } from "@/hooks/order-services/useShowOrderService";
import { Label } from "@/components/ui/label";
import { DialogTitle } from "@/components/ui/dialog";
import { useGetSoTypes } from "@/hooks/cities-sotypes/useGetSoTypes";
import { useGetCities } from "@/hooks/cities-sotypes/useGetCities";

export function HandleViewOccurrenceDialog({ id }: { id: string }) {
  const [isOpen, setIsOpen] = useState<boolean>();
  const { data } = useShowOrderService(id);
  const {data: soTypes} = useGetSoTypes()
  const {data: cities} = useGetCities()
  const [soType, setSoType] = useState<string>("")	

  useEffect(() => {
    const findType = soTypes?.find((order) => order.id === data?.order_type)?.code
    setSoType(findType as string)
  },[data , soTypes])

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
          <DialogTitle className="text-[1.7rem] text-main-color font-bold">
            Visualizar ordem de serviço
          </DialogTitle>
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
              <div className="flex flex-col w-full gap-2">
                <Label>Nome do cliente</Label>
                <p className="text-background-color break-words">
                  {data?.client_name}
                </p>
              </div>
              <div className="flex flex-col w-full gap-2">
                <Label>Cidade</Label>
                <p className="text-background-color break-words">
                  {cities?.find((city) => city.id === data?.city)?.name}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-8 max-lg:!flex-col">
              <div className="flex flex-col w-full gap-2">
                <Label>Nome do Contato</Label>
                <p className="text-background-color break-words">
                  {data?.contact_name}
                </p>
              </div>
              <div className="flex flex-col w-full gap-2">
                <Label>Número do Contato</Label>
                <p className="text-background-color break-words">
                  {data?.contact_number}
                </p>
              </div>
              <div className="flex flex-col w-full gap-2">
                <Label>Tipo de O.S.</Label>
                <p className="text-background-color break-words">
                  {soType}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-8 max-lg:!flex-col">
              <div className="flex flex-col w-full gap-2">
                <Label>Valor de Serviço</Label>
                <p className="text-background-color break-words">
                  {data?.service_value}
                </p>
              </div>
              <div className="flex flex-col w-full gap-2">
                <Label>Valor de deslocamento</Label>
                <p className="text-background-color break-words">
                  {data?.displacement_value}
                </p>
              </div>
              <div className="flex flex-col w-full gap-2">
                <Label>Matrícula do RGI</Label>
                <p className="text-background-color break-words">
                  {data?.rgi_registration}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-8 max-lg:!flex-col">
              <div className="flex flex-col w-full gap-2">
                <Label>Data de abertura</Label>
                <p className="text-background-color break-words">
                  {data?.opening_date}
                </p>
              </div>
            </div>
          </div>
        </DropdownView>
        <DropdownView
          title="Informações por tipo de O.S."
          className="max-lg:w-5/5 max-sm:mt-12"
        >
          <div className="w-full flex flex-col gap-8">
            <div className="flex items-start gap-8 max-lg:!flex-col">
              <div className="flex flex-col w-full gap-2">
                <Label>CPF/CNPJ</Label>
                <p className="text-background-color break-words">
                  {data?.cpf || data?.cnpj}
                </p>
              </div>
              {(soType.startsWith("G") || (soType === "A413")) && (
                <div className="flex flex-col w-full gap-2">
                  <Label>Tipo de imóvel</Label>
                  <p className="text-background-color break-words">
                    {data?.property_type}
                  </p>
                </div>
              )}
              {(soType.startsWith("G") || (soType === "A413")) && (
                <div className="flex flex-col w-full gap-2">
                  <Label>Condição do imóvel</Label>
                  <p className="text-background-color break-words">
                    {data?.property_status}
                  </p>
                </div>
              )}
            </div>
            {(soType.startsWith("G") || (soType === "A413") || soType.startsWith("B")) && (
              <div className="flex items-start gap-8 max-lg:!flex-col">
                {(soType.startsWith("G") || (soType === "A413") || soType.startsWith("B")) && (
                  <div className="flex flex-col w-full gap-2">
                    <Label>Matrícula consta no sistema?</Label>
                    <p className="text-background-color break-words">
                      {data?.registration_on_system}
                    </p>
                  </div>
                )}
                {(soType.startsWith("G") || (soType === "A413") || soType.startsWith("B")) && (
                  <div className="flex flex-col w-full gap-2">
                    <Label>Dados da Matrícula no documento coincide com o que está descrito no Siopi (nº de matrícula, livro e cartório)?</Label>
                    <p className="text-background-color break-words">
                      {data?.siopi_coincides}
                    </p>
                  </div>
                )}
                {(soType.startsWith("G") || (soType === "A413") || soType.startsWith("B")) && (
                  <div className="flex flex-col w-full gap-2">
                    <Label>Tipo de Matrícula</Label>
                    <p className="text-background-color break-words">
                      {data?.registration_type}
                    </p>
                  </div>
                )}
              </div>
            )}
            {(soType.startsWith("G") || (soType === "A413") || (soType.startsWith("B"))) && (
              <div className="flex items-start gap-8 max-lg:!flex-col">
                {(soType.startsWith("G") || (soType === "A413")) && (
                  <div className="flex flex-col w-full gap-2">
                    <Label>Existe averbação de área construída na matrícula?</Label>
                    <p className="text-background-color break-words">
                      {data?.averbation_exists ? 'Sim' : 'Não'}
                    </p>
                  </div>
                )}
                {(soType.startsWith("G") || (soType === "A413") || (soType.startsWith("B"))) && (
                  <div className="flex flex-col w-full gap-2">
                    <Label>Data da Matrícula</Label>
                    <p className="text-background-color break-words">
                      {data?.registration_date}
                    </p>
                  </div>
                )}
                {(soType.startsWith("G") || (soType === "A413")) && (
                  <div className="flex flex-col w-full gap-2">
                    <Label>Área construída presente na matrícula</Label>
                    <p className="text-background-color break-words">
                      {data?.built_area_presents ? 'Sim' : 'Não'}
                    </p>
                  </div>
                )}
              </div>
            )}
            {(soType.startsWith("G") || (soType === "A413")) && (
              <div className="flex items-start gap-8 max-lg:!flex-col">
                <div className="flex flex-col w-full gap-2">
                  <Label>Documentos obrigatórios para imóvel novo</Label>
                  {data?.mandatory_documents?.map((document)=>(
                    <p className="text-background-color break-words">
                      {document}
                    </p>
                  ))}
                </div>
                <div className="flex flex-col w-full gap-2">
                  <Label>Verificações de comparação entre o Habite-se e a matrícula:</Label>
                  {data?.dwell_registration_compare?.map((document)=>(
                    <p className="text-background-color break-words">
                      {document}
                    </p>
                  ))}
                </div>
                <div className="flex flex-col w-full gap-2">
                  <Label>Verificações e comparação entre a ART e a matrícula:</Label>
                  {data?.art_registration_compare?.map((document)=>(
                    <p className="text-background-color break-words">
                      {document}
                    </p>
                  ))}
                </div>
              </div>
            )}
            {(soType.startsWith("G") || (soType === "A413")) && (
              <div className="flex items-start gap-8 max-lg:!flex-col">
                <div className="flex flex-col w-full gap-2">
                  <Label>Verificações e comparação entre a DEC e a matrícula/ART:</Label>
                  {data?.dec_registration_compare?.map((document)=>(
                    <p className="text-background-color break-words">
                      {document}
                    </p>
                  ))}
                </div>
              </div>
            )}
            {(soType.startsWith("G") || (soType === "E401")) && (
              <div className="flex items-start gap-8 max-lg:!flex-col">
                <div className="flex flex-col w-full gap-2">
                  <Label>Documentos obrigatórios para imóvel novo</Label>
                  {data?.mandatory_documents?.map((document)=>(
                    <p className="text-background-color break-words">
                      {document}
                    </p>
                  ))}
                </div>
                <div className="flex flex-col w-full gap-2">
                  <Label>Verificações de comparação entre o Habite-se e a matrícula:</Label>
                  {data?.dwell_registration_compare?.map((document)=>(
                    <p className="text-background-color break-words">
                      {document}
                    </p>
                  ))}
                </div>
                <div className="flex flex-col w-full gap-2">
                  <Label>Verificações e comparação entre a ART e a matrícula:</Label>
                  {data?.art_registration_compare?.map((document)=>(
                    <p className="text-background-color break-words">
                      {document}
                    </p>
                  ))}
                </div>
              </div>
            )}
            {(soType.startsWith("G") || (soType === "E401")) && (
              <div className="flex items-start gap-8 max-lg:!flex-col">
                <div className="flex flex-col w-full gap-2">
                  <Label>Verificações e comparação entre a DEC e a matrícula/ART:</Label>
                  {data?.dec_registration_compare?.map((document)=>(
                    <p className="text-background-color break-words">
                      {document}
                    </p>
                  ))}
                </div>
              </div>
            )}
            <div className="flex items-start gap-8 max-lg:!flex-col">
              <div className="flex flex-col w-full gap-2">
                <Label>Valor de Serviço</Label>
                <p className="text-background-color break-words">
                  {data?.service_value}
                </p>
              </div>
              <div className="flex flex-col w-full gap-2">
                <Label>Valor de deslocamento</Label>
                <p className="text-background-color break-words">
                  {data?.displacement_value}
                </p>
              </div>
              <div className="flex flex-col w-full gap-2">
                <Label>Matrícula do RGI</Label>
                <p className="text-background-color break-words">
                  {data?.rgi_registration}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-8 max-lg:!flex-col">
              <div className="flex flex-col w-full gap-2">
                <Label>Valor de Serviço</Label>
                <p className="text-background-color break-words">
                  {data?.service_value}
                </p>
              </div>
              <div className="flex flex-col w-full gap-2">
                <Label>Valor de deslocamento</Label>
                <p className="text-background-color break-words">
                  {data?.displacement_value}
                </p>
              </div>
              <div className="flex flex-col w-full gap-2">
                <Label>Matrícula do RGI</Label>
                <p className="text-background-color break-words">
                  {data?.rgi_registration}
                </p>
              </div>
            </div>
          </div>
        </DropdownView>
        <DropdownView
          title="Localização"
          className="max-lg:w-5/5 max-sm:mt-12"
        >
          <div className="w-full flex flex-col gap-8">
            <div className="flex items-start gap-8 max-lg:!flex-col">
              <div className="flex flex-col w-full gap-2">
                <Label>Bairro</Label>
                <p className="text-background-color break-words">
                  {data?.neighborhood}
                </p>
              </div>
              <div className="flex flex-col w-full gap-2">
                <Label>Rua</Label>
                <p className="text-background-color break-words">
                  {data?.street}
                </p>
              </div>
              <div className="flex flex-col w-full gap-2">
                <Label>Número</Label>
                <p className="text-background-color break-words">
                  {data?.number}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-8 max-lg:!flex-col">
              <div className="flex flex-col w-full gap-2">
                <Label>Lote</Label>
                <p className="text-background-color break-words">
                  {data?.batch}
                </p>
              </div>
              <div className="flex flex-col w-full gap-2">
                <Label>Quadra</Label>
                <p className="text-background-color break-words">
                  {data?.block}
                </p>
              </div>
              <div className="flex flex-col w-full gap-2">
                <Label>Complemento</Label>
                <p className="text-background-color break-words">
                  {data?.complement}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-8 max-lg:!flex-col">
              <div className="flex flex-col w-full gap-2">
                <Label>CEP</Label>
                <p className="text-background-color break-words">
                  {data?.cep}
                </p>
              </div>
              <div className="flex flex-col w-full gap-2">
                <Label>Coordenadas</Label>
                <p className="text-background-color break-words">
                  {data?.coordenates}
                </p>
              </div>
              <div className="flex flex-col w-full gap-2">
                <Label></Label>
                <p className="text-background-color break-words">
                </p>
              </div>
            </div>
          </div>
        </DropdownView>
      </DialogContent>
    </Dialog>
  );
}
