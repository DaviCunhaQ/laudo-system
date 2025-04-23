import { DialogHeader } from "@/components/TailwindDialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/TailwindDialog";
import { useEffect, useState } from "react";
import { IoLocationSharp } from "react-icons/io5";
import { ServiceOrderFormThreeSchema, ServiceOrderListSchema } from "@/dtos";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useUpdateOrderService } from "@/hooks/order-services/useUpdateOrderService";
import toast from "react-hot-toast";
import Map from "@/components/map";

export default function HandleLocationDialog({
  initialCoordinates,
  orderData,
  id,
}: {
  initialCoordinates: string;
  orderData: ServiceOrderListSchema;
  id: string;
  soType: string;
}) {
  const [isOpen, setIsOpen] = useState<boolean>();
  const updateOrderService = useUpdateOrderService();
  const [position, setPosition] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    control,
  } = useForm<ServiceOrderFormThreeSchema>({
    resolver: zodResolver(ServiceOrderFormThreeSchema),
    defaultValues: {
      batch: orderData?.batch ? orderData?.batch : "",
      block: orderData?.block ? orderData?.block : "",
      complement: orderData?.complement ? orderData?.complement : "",
      neighborhood: orderData?.neighborhood ? orderData?.neighborhood : "",
      number: orderData?.number ? orderData?.number : undefined,
      street: orderData?.street ? orderData?.street : "",
      coordenates: orderData?.coordenates
        ? orderData?.coordenates
        : initialCoordinates,
    },
  });

  const onSubmit = (data: ServiceOrderFormThreeSchema) => {
    updateOrderService.mutateAsync({ id, ...data }).then(() => {
      toast.success("Localização cadastrada com sucesso!");
      setIsOpen(false);
    });
  };

  useEffect(() => {
    if (orderData) {
      if (orderData.coordenates) {
        setPosition(orderData.coordenates);
      }
    }
  }, [orderData, setPosition]);

  useEffect(() => {
    if (position) setValue("coordenates", position);
  }, [position, setValue]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(isModalOpen) => setIsOpen(isModalOpen)}
    >
      <DialogTrigger>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="w-full aspect-[2/1] bg-secondary-color rounded-md flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-all duration-200 ease-in-out shadow-[0px_8px_8px_0px_rgba(0,_0,_0,_0.1)]">
                <IoLocationSharp color="#fff" size={28} />
                <p className="text-white font-semibold max-[500px]:hidden">
                  Localização
                </p>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Localização</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </DialogTrigger>
      <DialogContent className="max-sm:!w-[400px] max-[500px]:!w-[300px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="max-[500px]:hidden">
          <h1 className="text-[1.5rem] text-secondary-color font-bold">
            Localização
          </h1>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-6 max-[500px]:mt-[3rem]"
        >
          <div className="w-full h-auto flex flex-col gap-[1rem]">
            <div className="flex flex-col w-full gap-2">
              <Label>Posição no mapa</Label>
              <Map
                onPositionChange={setPosition}
                positionDefault={
                  initialCoordinates ? initialCoordinates : position
                }
              />
              <Input
                type="hidden"
                value={position}
                readOnly
                placeholder="Selecione um ponto no mapa"
              />
              <p className="text-red-warning">{errors.coordenates?.message}</p>
            </div>
            <div className="flex w-full flex-col items-end justify-start gap-4">
              <div className="flex items-center justify-between w-full max-md:flex-col max-md:justify-center">
                <div className="flex flex-col w-[47%] gap-2 max-md:w-full max-md:mb-4">
                  <Label>Rua</Label>
                  <Input
                    {...register("street")}
                    type="text"
                    placeholder="Rua..."
                  />
                  <p className="text-red-warning">{errors.street?.message}</p>
                </div>
                <div className="flex flex-col w-[47%] gap-2 max-md:w-full">
                  <Label>Lote</Label>
                  <Input
                    {...register("batch")}
                    type="text"
                    placeholder="lote..."
                  />
                  <p className="text-red-warning">{errors.batch?.message}</p>
                </div>
              </div>
              <div className="flex items-center justify-between w-full max-md:flex-col max-md:justify-center">
                <div className="flex flex-col w-[47%] gap-2 max-md:w-full max-md:mb-4">
                  <Label>Quadra</Label>
                  <Input
                    {...register("block")}
                    type="text"
                    placeholder="Quadra..."
                  />
                  <p className="text-red-warning">{errors.block?.message}</p>
                </div>
                <div className="flex flex-col w-[47%] gap-2 max-md:w-full">
                  <Label>Número</Label>
                  <Controller
                    control={control}
                    name="number"
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="number"
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        value={field.value ?? ""}
                        placeholder="..."
                        min={0}
                      />
                    )}
                  />
                  <p className="text-red-warning">{errors.number?.message}</p>
                </div>
              </div>
              <div className="flex items-center justify-between w-full max-md:flex-col max-md:justify-center">
                <div className="flex flex-col w-[47%] gap-2 max-md:w-full max-md:mb-4">
                  <Label>Bairro</Label>
                  <Input
                    {...register("neighborhood")}
                    type="text"
                    placeholder="Bairro..."
                  />
                  <p className="text-red-warning">
                    {errors.neighborhood?.message}
                  </p>
                </div>
                <div className="flex flex-col w-[47%] gap-2 max-md:w-full">
                  <Label>Complemento</Label>
                  <Input
                    {...register("complement")}
                    type="text"
                    placeholder="Complemento..."
                  />
                  <p className="text-red-warning">
                    {errors.complement?.message}
                  </p>
                </div>
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
              <Button
                type="submit"
                isLoading={isSubmitting}
                className="w-[47%]"
              >
                Cadastrar
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
