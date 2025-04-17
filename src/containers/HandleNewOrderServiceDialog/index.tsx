import { DialogHeader } from "@/components/TailwindDialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/TailwindDialog";
import { useContext, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useGetCities } from "@/hooks/cities-sotypes/useGetCities";
import { useGetSoTypes } from "@/hooks/cities-sotypes/useGetSoTypes";
import { ServiceOrderFormOneSchema } from "@/dtos";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IMaskInput } from "react-imask";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCreateOrderService } from "@/hooks/order-services/useCreateOrderService";
import toast from "react-hot-toast";
import { AuthContext } from "@/context/authContext";

export default function HandleNewOrderServiceDialog() {
  const [isOpen, setIsOpen] = useState<boolean>();
  const createOrderService = useCreateOrderService()
  const { data: cities } = useGetCities()
  const { data: osTypes } = useGetSoTypes()
  const {company}= useContext(AuthContext)

  const [selectedCity , setSelectedCity] = useState<string>('')
  const [selectedOrderType , setSelectedOrderType] = useState<string>('')
  const [isValueVisible, setIsValueVisible] = useState<boolean>(false)

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
  
  const {
      register,
      handleSubmit,
      setValue,
      control,
      formState: { errors, isSubmitting},
    } = useForm<ServiceOrderFormOneSchema>({
      resolver: zodResolver(ServiceOrderFormOneSchema),
      defaultValues:{
        company
      }
    });

    useEffect(()=>{
      setValue("cep",citiesCoordinates.find((city) => city.name === cities?.find((city)=>city.id === selectedCity)?.name)?.cep as string)
    }, [selectedCity])

    useEffect(()=>{
      if(selectedOrderType){
          const selectedOsType = osTypes?.find((osType) => osType.id === selectedOrderType)
          if(selectedOsType?.service_value === null){
              setIsValueVisible(true)
          }else{
              setIsValueVisible(false)
              setValue("service_value", undefined)
              setValue("displacement_value", undefined)
          }
      }else{
          setIsValueVisible(false)
          setValue("service_value", undefined)
          setValue("displacement_value", undefined)
      }
  },[selectedOrderType])

    const handleClose = ()=>{
        setIsOpen(false)
        setValue("city", "")
        setValue("order_type", "")
        setValue("order_number", "")
        setValue("client_name", "")
        setValue("rgi_registration", "")
        setValue("service_value", undefined)
        setValue("displacement_value", undefined)
        setValue("opening_date", "")
        setValue("contact_name", "")
        setValue("contact_number", "")
        setValue("cep", "")
        setSelectedCity("")
        setSelectedOrderType("")
        setIsValueVisible(false)
    }

    const onSubmit = (data: ServiceOrderFormOneSchema) => {
      createOrderService.mutateAsync(data).then(()=>{
        handleClose()
        toast.success("Ordem de serviço criada com sucesso!")
      })
    };
  
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(isModalOpen) => setIsOpen(isModalOpen)}
    >
      <DialogTrigger>
        <Button type="button" className="flex items-center">
          <p className="max-sm:hidden">Gerar Ordem de Serviço</p> <FaPlus />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-sm:!w-[400px] max-[500px]:!w-[300px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="max-[500px]:hidden">
          <h1 className="text-[1.5rem] text-secondary-color font-bold">
            Gerar Ordem de Serviço
          </h1>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-6">
            <div className="w-full h-auto flex flex-col gap-[1rem]">
                <h1 className="font-bold text-[1.25rem] max-w-[80%]">Empresa selecionada: {company}</h1>
                <div className="flex justify-between items-center w-full max-[1200px]:flex-col max-[1200px]:justify-center">
                    <div className="flex flex-col w-[47%] gap-2 max-[1200px]:w-full max-[1200px]:mb-4">
                        <Label>
                            Cidade
                        </Label>
                        <Controller
                        control={control}
                        name="city"
                        render={({ field }) => (
                            <Select 
                                {...field}
                                value={selectedCity} 
                                onValueChange={(value) => {
                                    setSelectedCity(value as string)
                                    field.onChange(value)
                                }}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Selecione uma cidade..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {cities?.map((city)=>{
                                        return(
                                            <SelectItem value={city.id}>{city.name}</SelectItem>
                                        )
                                    })}
                                </SelectContent>
                            </Select>
                        )}/>
                        <p className="text-red-warning">{errors.city?.message}</p>
                    </div>
                    <div className="flex flex-col w-[47%] gap-2 max-[1200px]:w-full">
                        <Label>
                            Tipo de O.S.
                        </Label>
                        <Controller 
                        control = {control}	
                        name="order_type"
                        render={({ field }) => (
                            <Select 
                            {...field}
                            value={selectedOrderType} 
                            onValueChange={(value) => {
                                setSelectedOrderType(value as string)
                                field.onChange(value)
                            }}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Tipo de O.S..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {osTypes?.map((osType)=>{
                                        return(
                                            <SelectItem value={osType.id}>{osType.code}</SelectItem>
                                        )
                                    })}
                                </SelectContent>
                            </Select>
                        )}
                        />
                        <p className="text-red-warning">{errors.order_type?.message}</p>
                    </div>
                    
                    <input {...register("form_link")} type="hidden" value="https://forms.clickup.com/9013984055/f/8cmcytq-933/NMO50UG4OJ3DK26M6Z" />
                </div>
                {isValueVisible && (
                    <div className="flex justify-between items-center w-full max-[1200px]:flex-col max-[1200px]:justify-center">
                        <div className="flex flex-col w-[47%] gap-2 max-[1200px]:w-full max-[1200px]:mb-4">
                            <Label>
                                Valor do Serviço
                            </Label>
                            <Controller
                                control={control}
                                name="service_value"
                                render={({ field }) => (
                                <Input
                                    required
                                    {...field}
                                    type="text" // <-- trocar para text
                                    onChange={(e) => {
                                    const rawValue = e.target.value.replace(',', '.');
                                    const numericValue = parseFloat(rawValue);
                                    field.onChange(isNaN(numericValue) ? undefined : numericValue);
                                    }}
                                    value={field.value ?? ""}
                                    placeholder="..."
                                />
                                )}
                            />
                            <p className="text-red-warning">{errors.service_value?.message}</p>
                        </div>
                        <div className="flex flex-col w-[47%] gap-2 max-[1200px]:w-full">
                            <Label>
                                Valor do Deslocamento
                            </Label>
                            <Controller
                                control={control}
                                name="displacement_value"
                                render={({ field }) => (
                                <Input
                                    required
                                    {...field}
                                    type="text" // <-- trocar para text
                                    onChange={(e) => {
                                    const rawValue = e.target.value.replace(',', '.');
                                    const numericValue = parseFloat(rawValue);
                                    field.onChange(isNaN(numericValue) ? undefined : numericValue);
                                    }}
                                    value={field.value ?? ""}
                                    placeholder="..."
                                />
                                )}
                            />
                            <p className="text-red-warning">{errors.displacement_value?.message}</p>
                        </div>
                    </div>
                )}
                
                <div className="flex justify-between items-center w-full max-[1200px]:flex-col max-[1200px]:justify-center">
                    <div className="flex flex-col w-[47%] gap-2 max-[1200px]:w-full max-[1200px]:mb-4">
                        <Label>
                            Número da O.S.
                        </Label>
                        <Input type="text" {...register("order_number")} placeholder="Número da O.S..."/>
                        <p className="text-red-warning">{errors.order_number?.message}</p>
                    </div>
                    <div className="flex flex-col w-[47%] gap-2 max-[1200px]:w-full">
                        <Label>
                            Nome do cliente
                        </Label>
                        <Input type="text" {...register("client_name")} placeholder="Nome do cliente..."/>
                        <p className="text-red-warning">{errors.client_name?.message}</p>
                    </div>
                </div>
                <div className="flex justify-between items-center w-full max-[1200px]:flex-col max-[1200px]:justify-center">
                    <div className="flex flex-col w-[47%] gap-2 max-[1200px]:w-full max-[1200px]:mb-4">
                        <Label>
                            Matrícula do RGI
                        </Label>
                        <Input type="text" {...register("rgi_registration")} placeholder="Matrícula do RGI..."/>
                        <p className="text-red-warning">{errors.rgi_registration?.message}</p>
                    </div>
                    <div className="flex flex-col w-[47%] gap-2 max-[1200px]:w-full">
                        <Label>
                            Data de abertura
                        </Label>
                        <Controller
                            control={control}
                            name="opening_date"
                            render={({ field }) => (
                            <IMaskInput
                                {...field}
                                mask="00/00/0000"
                                placeholder="dd/mm/aaaa"
                                value={field.value || ""}
                                onAccept={(value) => field.onChange(value)}
                                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                            )}
                        />
                        <p className="text-red-warning">{errors.opening_date?.message}</p>
                    </div>
                </div>
                <div className="flex justify-between items-center w-full max-[1200px]:flex-col max-[1200px]:justify-center">
                    <div className="flex flex-col w-[47%] gap-2 max-[1200px]:w-full max-[1200px]:mb-4">
                        <Label>
                            Nome do contato
                        </Label>
                        <Input type="text" {...register("contact_name")} placeholder="Nome do contato..."/>
                        <p className="text-red-warning">{errors.contact_name?.message}</p>
                    </div>
                    <div className="flex flex-col w-[47%] gap-2 max-[1200px]:w-full">
                        <Label>
                            Número do Contato
                        </Label>
                        <Controller
                            control={control}
                            name="contact_number"
                            render={({ field }) => (
                            <IMaskInput
                                {...field}
                                mask="(00) 00000-0000"
                                placeholder="(00) 00000-0000"
                                value={field.value || ""}
                                onAccept={(value) => field.onChange(value)}
                                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                            )}
                        />
                        <p className="text-red-warning">{errors.contact_number?.message}</p>
                    </div>
                </div>
                <div
                  className="mt-4 w-full flex items-center justify-between"
                >
                  <Button
                    type="button"
                    variant={"outline"}
                    onClick={()=>handleClose()}
                    className="w-[47%]"
                  >
                    Cancelar
                  </Button>
                  <Button type="submit" isLoading={isSubmitting} className="w-[47%]">
                    Gerar
                  </Button>
                </div>
            </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
