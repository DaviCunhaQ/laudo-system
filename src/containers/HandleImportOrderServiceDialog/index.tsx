"use client";

import { DialogHeader } from "@/components/TailwindDialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/TailwindDialog";
import { useState } from "react";
import { FaFileExcel } from "react-icons/fa";
import { useGetCities } from "@/hooks/cities-sotypes/useGetCities";
import { useGetSoTypes } from "@/hooks/cities-sotypes/useGetSoTypes";
import { ServiceOrderFormOneSchema } from "@/dtos";
import { read, utils } from "xlsx";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import { useCreateOrderService } from "@/hooks/order-services/useCreateOrderService";
import { generateLinkForm } from "../HandleNewOrderServiceDialog";
import { citiesCoordinates } from "@/utils/citiesCoordernates";

export default function HandleImportOrderServiceDialog() {
  const [isOpen, setIsOpen] = useState<boolean>();
  const createOrderService = useCreateOrderService();
  const { data: cities } = useGetCities();
  const { data: osTypes } = useGetSoTypes();
  const [jsonData, setJsonData] = useState<any>();

  const citiesInExcel = [
    { name: "Alcântaras", excel: "ALCANTARAS" },
    { name: "Ararendá", excel: "ARARENDA" },
    { name: "Barroquinha", excel: "BARROQUINHA" },
    { name: "Camocim", excel: "CAMOCIM" },
    { name: "Cariré", excel: "CARIRE" },
    { name: "Carnaubal", excel: "CARNAUBAL" },
    { name: "Catunda", excel: "CATUNDA" },
    { name: "Chaval", excel: "CHAVAL" },
    { name: "Coreaú", excel: "COREAU" },
    { name: "Crateús", excel: "CRATEUS" },
    { name: "Croatá", excel: "CROATA" },
    { name: "Forquilha", excel: "FORQUILHA" },
    { name: "Frecheirinha", excel: "FRECHEIRINHA" },
    { name: "Graça", excel: "GRACA" },
    { name: "Granja", excel: "GRANJA" },
    { name: "Groaíras", excel: "GROAIRAS" },
    { name: "Guaraciaba do Norte", excel: "GUARACIABA DO NORTE" },
    { name: "Hidrolândia", excel: "HIDROLANDIA" },
    { name: "Ibiapina", excel: "IBIAPINA" },
    { name: "Independência", excel: "INDEPENDENCIA" },
    { name: "Ipaporanga", excel: "IPAPORANGA" },
    { name: "Ipu", excel: "IPU" },
    { name: "Ipueiras", excel: "IPUEIRAS" },
    { name: "Martinópole", excel: "MARTINOPOLE" },
    { name: "Massapê", excel: "MASSAPE" },
    { name: "Meruoca", excel: "MERUOCA" },
    { name: "Monsenhor Tabosa", excel: "MONSENHOR TABOSA" },
    { name: "Moraújo", excel: "MORAUJO" },
    { name: "Mucambo", excel: "MUCAMBO" },
    { name: "Nova Russas", excel: "NOVA RUSSAS" },
    { name: "Novo Oriente", excel: "NOVO ORIENTE" },
    { name: "Pacujá", excel: "PACUJA" },
    { name: "Pires Ferreira", excel: "PIRES FERREIRA" },
    { name: "Poranga", excel: "PORANGA" },
    { name: "Reriutaba", excel: "RERIUTABA" },
    { name: "Santa Quitéria", excel: "SANTA QUITERIA" },
    { name: "Santana do Acaraú", excel: "SANTANA DO ACARAU" },
    { name: "São Benedito", excel: "SAO BENEDITO" },
    { name: "Senador Sá", excel: "SENADOR SA" },
    { name: "Sobral", excel: "SOBRAL" },
    { name: "Tamboril", excel: "TAMBORIL" },
    { name: "Tianguá", excel: "TIANGUA" },
    { name: "Ubajara", excel: "UBAJARA" },
    { name: "Uruoca", excel: "URUOCA" },
    { name: "Varjota", excel: "VARJOTA" },
    { name: "Beberibe", excel: "BEBERIBE" },
    { name: "Cascavel", excel: "CASCAVEL" },
    { name: "Chorozinho", excel: "CHOROZINHO" },
    { name: "Horizonte", excel: "HORIZONTE" },
    { name: "Pacajus", excel: "PACAJUS" },
    { name: "Pacatuba", excel: "PACATUBA" },
    { name: "Pindoretama", excel: "PINDORETAMA" },
    { name: "Maracanaú", excel: "MARACANAU" },
    { name: "Viçosa do Ceará", excel: "VICOSA DO CEARA" }
  ];
  

  const handleImportOS = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
  
    try {
      const data = await file.arrayBuffer();
      const workbook = read(data);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const parsed = utils.sheet_to_json<any>(worksheet);
  
      if (parsed && parsed.length > 0) {
        const raw = parsed[0];
  
        const formatted = {
          ...raw,
          displacement_value: parseFloat(String(raw.displacement_value).replace(",", ".")),
          service_value: parseFloat(String(raw.service_value).replace(",", ".")),
        };
  
        setJsonData(formatted);
      } else {
        toast.error("O arquivo está vazio ou mal formatado.");
      }
    } catch (error) {
      toast.error("Erro ao ler o arquivo. Verifique se está no formato correto.");
      console.error(error);
    }
  };
  

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (jsonData) {
        const { city , order_type , ...rest} = jsonData
        const cityInExcel = citiesInExcel.find((cityItem) => cityItem.excel === city)?.name;
        const formattedData: ServiceOrderFormOneSchema = {
            ...rest,
            address: "XXX",
            order_type: osTypes?.find((type) => type.code === order_type)?.id as string,
            city: cities?.find((cityItem) => cityItem.name === cityInExcel)?.id as string,
            cep: citiesCoordinates.find((cityItem) => cityItem.name === cityInExcel)?.cep as string,
            form_link: generateLinkForm(rest.company , osTypes?.find((type) => type.code === order_type)?.code as string)
        }
        await createOrderService.mutateAsync(formattedData).then(()=>{
            toast.success("Ordem de serviço criada com sucesso!");
            setIsOpen(false);   
        })
    } else {
      toast.error("Nenhum dado encontrado no arquivo.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(isModalOpen) => setIsOpen(isModalOpen)}>
      <DialogTrigger>
        <Button variant={"outline"} type="button" className="flex items-center">
          <p className="max-sm:hidden">Importar Ordem de Serviço</p> <FaFileExcel />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-sm:!w-[400px] max-[500px]:!w-[300px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="max-[500px]:hidden">
          <h1 className="text-[1.5rem] text-secondary-color font-bold">
            Importar O.S.
          </h1>
        </DialogHeader>

        <form onSubmit={onSubmit} className="flex flex-col items-center gap-6 max-[500px]:mt-10">
          <div className="w-full h-auto flex flex-col gap-[1rem]">
            <div className="flex justify-between items-center w-full max-[1200px]:flex-col max-[1200px]:justify-center">
              <div className="flex flex-col w-full gap-2 max-[1200px]:w-full max-[1200px]:mb-4">
                <Label>Arquivo da O.S. (xlsx , xls)</Label>
                <Input type="file" accept=".xlsx, .xls" onChange={handleImportOS} />
              </div>
            </div>

            <div className="mt-4 w-full flex items-center justify-between">
              <Button
                type="button"
                variant={"outline"}
                onClick={() => setIsOpen(false)}
                className="w-[47%]"
              >
                Cancelar
              </Button>
              <Button type="submit" className="w-[47%]">
                Importar
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
