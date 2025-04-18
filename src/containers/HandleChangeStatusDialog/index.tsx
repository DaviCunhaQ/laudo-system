import { DialogHeader } from "@/components/TailwindDialog";
import { Button } from "@/components/ui/button";
import { TbStatusChange } from "react-icons/tb";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/TailwindDialog";
import { useState } from "react";
import { ChangeStatusSchema, ServiceOrderListSchema } from "@/dtos";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Loading from "@/components/icons/loading";
import { useUpdateOrderService } from "@/hooks/order-services/useUpdateOrderService";
import toast from "react-hot-toast";
import { statusList } from "@/utils/statusList";

export default function HandleChangeStatusDialog({setIsOpenDad, orderData,id}:{setIsOpenDad: React.Dispatch<React.SetStateAction<boolean>>,orderData: ServiceOrderListSchema, id: string}) {
  const [isOpen, setIsOpen] = useState<boolean>();
  const [selectedStatus, setSelectedStatus] = useState<string>(orderData?.status ? orderData?.status : "");
  const updateOrderService = useUpdateOrderService()
  const {
    handleSubmit,
    control,
    setValue
  } = useForm<ChangeStatusSchema>({
    resolver: zodResolver(ChangeStatusSchema),
    defaultValues: {
      status: orderData?.status ? orderData?.status : "",
    },
  });

  const onSubmit = (data: ChangeStatusSchema) => {
    updateOrderService.mutateAsync({
        id,
        status: data.status
    }).then(()=>{
        setValue("status", "")
        setIsOpen(false)
        setIsOpenDad(false)
        setSelectedStatus("")
        toast.success("Status alterado com sucesso!")
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
                    <div className="w-full aspect-[2/1] bg-[#1e0184] rounded-md flex items-center justify-center cursor-pointer hover:scale-105 transition-all duration-200 ease-in-out shadow-[0px_8px_8px_0px_rgba(0,_0,_0,_0.1)]">
                        <TbStatusChange color="#fff" size={32}/>
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Trocar Status</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
      </DialogTrigger>
      <DialogContent className="max-sm:!w-[400px] max-[500px]:!w-[300px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="max-[500px]:hidden">
          <h1 className="text-[1.5rem] text-secondary-color font-bold">
            Trocar Status da O.S.
          </h1>
        </DialogHeader>
        {orderData?.status ? (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col items-center max-sm:mt-10"
          >
            <div className="mt-2 mb-4 w-full">
              <Controller
                control={control}
                name="status"
                render={({ field }) => (
                    <Select 
                        {...field}
                        value={selectedStatus} 
                        onValueChange={(value) => {
                            setSelectedStatus(value as string)
                            field.onChange(value)
                        }}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione um status..." />
                        </SelectTrigger>
                        <SelectContent>
                            {statusList?.map((status)=>{
                                return(
                                    <SelectItem value={status.label}>{status.name}</SelectItem>
                                )
                            })}
                        </SelectContent>
                    </Select>
                )}/>
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
                Selecionar
              </Button>
            </div>
          </form>
        ):(
          <>
            <Loading/>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
