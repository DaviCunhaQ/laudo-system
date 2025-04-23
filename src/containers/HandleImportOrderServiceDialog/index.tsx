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

export default function HandleImportOrderServiceDialog() {
  const [isOpen, setIsOpen] = useState<boolean>();
  const createOrderService = useCreateOrderService();
  const { data: cities } = useGetCities();
  const { data: osTypes } = useGetSoTypes();
  const [jsonData, setJsonData] = useState<any>();

  const citiesCoordinates = [
    { name: "Alcântaras", coordinates: "-3.5850, -40.5478", cep: "62120-000" },
    { name: "Ararendá", coordinates: "-4.7456, -40.8310", cep: "62210-000" },
    { name: "Barroquinha", coordinates: "-3.0208, -41.1356", cep: "62410-000" },
    { name: "Camocim", coordinates: "-2.9006, -40.8411", cep: "62400-000" },
    { name: "Cariré", coordinates: "-3.9483, -40.4767", cep: "62184-000" },
    { name: "Carnaubal", coordinates: "-4.1592, -40.9414", cep: "62375-000" },
    { name: "Catunda", coordinates: "-4.6433, -40.2017", cep: "62295-000" },
    { name: "Chaval", coordinates: "-3.0350, -41.2439", cep: "62420-000" },
    { name: "Coreaú", coordinates: "-3.5411, -40.6589", cep: "62160-000" },
    { name: "Crateús", coordinates: "-5.1677, -40.6669", cep: "63700-000" },
    { name: "Croatá", coordinates: "-4.4044, -40.9025", cep: "62390-000" },
    { name: "Forquilha", coordinates: "-3.7994, -40.2639", cep: "62115-000" },
    { name: "Frecheirinha", coordinates: "-3.7558, -40.8186", cep: "62340-000" },
    { name: "Graça", coordinates: "-4.0444, -40.7492", cep: "62365-000" },
    { name: "Granja", coordinates: "-3.1208, -40.8375", cep: "62430-000" },
    { name: "Groaíras", coordinates: "-3.9172, -40.3858", cep: "62190-000" },
    { name: "Guaraciaba do Norte", coordinates: "-4.1611, -40.7475", cep: "62380-000" },
    { name: "Hidrolândia", coordinates: "-4.4097, -40.4381", cep: "62270-000" },
    { name: "Ibiapina", coordinates: "-3.9242, -40.8914", cep: "62360-000" },
    { name: "Independência", coordinates: "-5.3944, -40.3086", cep: "63640-000" },
    { name: "Ipaporanga", coordinates: "-4.8972, -40.7531", cep: "62215-000" },
    { name: "Ipu", coordinates: "-4.3175, -40.7058", cep: "62250-000" },
    { name: "Ipueiras", coordinates: "-4.5383, -40.7117", cep: "62230-000" },
    { name: "Martinópole", coordinates: "-3.2250, -40.6897", cep: "62450-000" },
    { name: "Massapê", coordinates: "-3.5233, -40.3425", cep: "62140-000" },
    { name: "Meruoca", coordinates: "-3.5392, -40.4533", cep: "62130-000" },
    { name: "Monsenhor Tabosa", coordinates: "-4.7919, -40.0644", cep: "63780-000" },
    { name: "Moraújo", coordinates: "-3.4639, -40.6775", cep: "62480-000" },
    { name: "Mucambo", coordinates: "-3.9025, -40.7458", cep: "62170-000" },
    { name: "Nova Russas", coordinates: "-4.7050, -40.5633", cep: "62200-000" },
    { name: "Novo Oriente", coordinates: "-5.5250, -40.7714", cep: "63740-000" },
    { name: "Pacujá", coordinates: "-3.9833, -40.6986", cep: "62180-000" },
    { name: "Pires Ferreira", coordinates: "-4.2392, -40.6442", cep: "62255-000" },
    { name: "Poranga", coordinates: "-4.7450, -40.9208", cep: "62240-000" },
    { name: "Reriutaba", coordinates: "-4.1419, -40.5758", cep: "62260-000" },
    { name: "Santa Quitéria", coordinates: "-4.3269, -40.1528", cep: "62280-000" },
    { name: "Santana do Acaraú", coordinates: "-3.4619, -40.2114", cep: "62150-000" },
    { name: "São Benedito", coordinates: "-4.0475, -40.8592", cep: "62370-000" },
    { name: "Senador Sá", coordinates: "-3.3533, -40.4664", cep: "62470-000" },
    { name: "Sobral", coordinates: "-3.6894, -40.3481", cep: "62010-000" },
    { name: "Tamboril", coordinates: "-4.8314, -40.3192", cep: "63750-000" },
    { name: "Tianguá", coordinates: "-3.7322, -40.9925", cep: "62320-000" },
    { name: "Ubajara", coordinates: "-3.8547, -40.9203", cep: "62350-000" },
    { name: "Uruoca", coordinates: "-3.3083, -40.5625", cep: "62460-000" },
    { name: "Varjota", coordinates: "-4.1933, -40.4742", cep: "62265-000" },
  ];

  const citiesInExcel = [
    { name: "Alcântaras", excel: "ALCANTARAS" },
    { name: "Ararendá", excel: "ARARENDA" },
    { name: "Barroquinha", excel: "BARROQUINHA" },
    { name: "Camocim", excel: "CAMOCIM"},
    { name: "Cariré", excel: "CARIRE"},
    { name: "Carnaubal", excel: "CARNAUBAL"},
    { name: "Catunda", excel: "CATUNDA"},
    { name: "Chaval", excel: "CHAVAL"},
    { name: "Coreaú", excel: "COREAU"},
    { name: "Crateús", excel: "CRATEUS"},
    { name: "Croatá", excel: "CROATA"},
    { name: "Forquilha", excel: "FORQUILHA"},
    { name: "Frecheirinha", excel: "FRECHEIRINHA"},
    { name: "Graça", excel: "GRACA"},
    { name: "Granja", excel: "GRANJA"},
    { name: "Groaíras", excel: "GROAIRAS"},
    { name: "Guaraciaba do Norte", excel: "GUARACIABA DO NORTE"},
    { name: "Hidrolândia", excel: "HIDROLANDIA"},
    { name: "Ibiapina", excel: "IBIAPINA"},
    { name: "Independência", excel: "INDEPENDENCIA"},
    { name: "Ipaporanga", excel: "IPAPORANGA"},
    { name: "Ipu", excel: "IPU"},
    { name: "Ipueiras", excel: "IPUEIRAS"},
    { name: "Martinópole", excel: "MARTINOPOLE"},
    { name: "Massapê", excel: "MASSAPE"},
    { name: "Meruoca", excel: "MERUOCA"},
    { name: "Monsenhor Tabosa", excel: "MONSENHOR TABOSA"},
    { name: "Moraújo", excel: "MORAUJO"},
    { name: "Mucambo", excel: "MUCAMBO"},
    { name: "Nova Russas", excel: "NOVA RUSSAS"},
    { name: "Novo Oriente", excel: "NOVO ORIENTE"},
    { name: "Pacujá", excel: "PACUJA"},
    { name: "Pires Ferreira", excel: "PIRES FERREIRA"},
    { name: "Poranga", excel: "PORANGA"},
    { name: "Reriutaba", excel: "RERIUTABA"},
    { name: "Santa Quitéria", excel: "SANTA QUITERIA"},
    { name: "Santana do Acaraú", excel: "SANTANA DO ACARAU"},
    { name: "São Benedito", excel: "SAO BENEDITO"},
    { name: "Senador Sá", excel: "SENADOR SA"},
    { name: "Sobral", excel: "SOBRAL"},
    { name: "Tamboril", excel: "TAMBORIL"},
    { name: "Tianguá", excel: "TIANGUA"},
    { name: "Ubajara", excel: "UBAJARA"},
    { name: "Uruoca", excel: "URUOCA"},
    { name: "Varjota", excel: "VARJOTA"},
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
