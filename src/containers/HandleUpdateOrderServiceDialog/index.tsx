import { DialogHeader } from "@/components/TailwindDialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/TailwindDialog";
import { useEffect, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { ServiceOrderFormOneSchema, ServiceOrderListSchema } from "@/dtos";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IMaskInput } from "react-imask";
import toast from "react-hot-toast";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useUpdateOrderService } from "@/hooks/order-services/useUpdateOrderService";

export default function HandleUpdateOrderServiceDialog({setIsOpenDad, orderData,id,soType}:{setIsOpenDad:  React.Dispatch<React.SetStateAction<boolean>>,orderData: ServiceOrderListSchema, id: string, soType: string}) {
  const [isOpen, setIsOpen] = useState<boolean>();
  const updateOrderService = useUpdateOrderService()
  const [isValueVisible, setIsValueVisible] = useState<boolean>(false)

  useEffect(()=>{
    if(soType){
      if (soType.startsWith("G")){
        setIsValueVisible(true)
      }
    }
  },[soType])
  
  const {
      register,
      handleSubmit,
      control,
      setValue,
      formState: { errors, isSubmitting},
    } = useForm<ServiceOrderFormOneSchema>({
      resolver: zodResolver(ServiceOrderFormOneSchema),
      defaultValues:{
        company: orderData?.company,
        order_type: orderData?.order_type,
        order_number: orderData?.order_number,
        client_name: orderData?.client_name,
        rgi_registration: orderData?.rgi_registration,
        service_value: orderData?.service_value,
        displacement_value: orderData?.displacement_value,
        opening_date: orderData?.opening_date,
        contact_name: orderData?.contact_name,
        contact_number: orderData?.contact_number,
        cep: orderData?.cep,
        form_link: "https://forms.clickup.com/9013984055/f/8cmcytq-933/NMO50UG4OJ3DK26M6Z",
        city: orderData?.city,
      }
    });

    useEffect(()=>{
      if (orderData?.order_type){
        setValue("order_type", orderData.order_type)
      }
    },[orderData])

    const onSubmit = (data: ServiceOrderFormOneSchema) => {
      updateOrderService.mutateAsync({
        id,
        ...data
      }).then(()=>{
        setIsOpen(false)
        setIsOpenDad(false)
        toast.success("Ordem de serviço atualizada com sucesso!")
      })
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
                    <div className="w-full aspect-[2/1] bg-main-color rounded-md flex items-center justify-center cursor-pointer hover:scale-105 transition-all duration-200 ease-in-out shadow-[0px_8px_8px_0px_rgba(0,_0,_0,_0.1)]">
                        <FaPencilAlt color="#fff" size={32}/>
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Atualizar O.S.</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
      </DialogTrigger>
      <DialogContent className="max-sm:!w-[400px] max-[500px]:!w-[300px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="max-[500px]:hidden">
          <h1 className="text-[1.5rem] text-secondary-color font-bold">
            Atualizar Ordem de Serviço
          </h1>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-6 max-[500px]:mt-[3rem]">
            <div className="w-full h-auto flex flex-col gap-[1rem]">
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
                    onClick={() => setIsOpen(false)}
                    className="w-[47%]"
                  >
                    Cancelar
                  </Button>
                  <Button type="submit" isLoading={isSubmitting} className="w-[47%]">
                    Atualizar
                  </Button>
                </div>
            </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
