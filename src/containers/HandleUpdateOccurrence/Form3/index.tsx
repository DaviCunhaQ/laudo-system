import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { useMultiStep } from "@/context/Multistepper";
import {
  ServiceOrderFormThreeSchema,
  ServiceOrderListSchema
} from "@/dtos";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Map from "@/components/map";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function Form3Update({data}: {data?:ServiceOrderListSchema}) {
  const {
    goToNextStep,
    canGoToPrevStep,
    goToPrevStep,
    canGoToNextStep,
    currentStep,
    formDataUpdate,
    setFormValueUpdate
  } = useMultiStep();
  const [position, setPosition] = useState<string>("");
  const cep = localStorage.getItem("cityCep") as string

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    control
  } = useForm<ServiceOrderFormThreeSchema>({
    resolver: zodResolver(ServiceOrderFormThreeSchema),
    defaultValues: {
      batch: formDataUpdate.form3?.batch ? formDataUpdate.form3.batch : data?.batch ? data.batch : "",
      block: formDataUpdate.form3?.block ? formDataUpdate.form3.block : data?.block ? data.block : "",
      cep: formDataUpdate.form3?.cep ? formDataUpdate.form3.cep : data?.cep ? data.cep : localStorage.getItem("cityCep") ? localStorage.getItem("cityCep") as string : "",
      complement: formDataUpdate.form3?.complement ? formDataUpdate.form3.complement : data?.complement ? data.complement : "",
      neighborhood: formDataUpdate.form3?.neighborhood ? formDataUpdate.form3.neighborhood : data?.neighborhood ? data.neighborhood : "",
      number: formDataUpdate.form3?.number ? formDataUpdate.form3.number : data?.number ? data.number : undefined,
      street: formDataUpdate.form3?.street ? formDataUpdate.form3.street : data?.street ? data.street : "",
      coordenates: formDataUpdate.form3?.coordenates ? formDataUpdate.form3.coordenates : data?.coordenates ? data.coordenates : localStorage.getItem("cityCoordinates") ? localStorage.getItem("cityCoordinates") as string : "-3.4640, -40.6775"
    },
  });

  const onSubmit = (data: ServiceOrderFormThreeSchema) => {
    // createLocation.mutateAsync(data).then(()=>goToNextStep()).catch((error)=>console.error(error))
    // console.log(data)
    setFormValueUpdate("form3", data);
    goToNextStep();
  };

useEffect(() => {
  if (formDataUpdate.form3?.coordenates) {
    setPosition(formDataUpdate.form3.coordenates);
  }
}, [formDataUpdate, setPosition]);

useEffect(() => {
  if (position) setValue("coordenates", position);
}, [position, setValue]);

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-6"
      >
        <div className="w-full h-auto flex flex-col gap-[1rem]">
          <div className="flex flex-col w-full gap-2">
            <Label>Posição no mapa</Label>
            <Map
              onPositionChange={setPosition}
              positionDefault={
                formDataUpdate.form3?.coordenates
                  ? formDataUpdate.form3.coordenates
                  : data?.coordenates?
                    data.coordenates
                  : localStorage.getItem("cityCoordinates") ? localStorage.getItem("cityCoordinates") as string : "-3.4640, -40.6775"
              }
            />
            <Input
              type="hidden"
              value={position}
              readOnly
              placeholder="Selecione um ponto no mapa"
            />
            <Input
              {...register("cep")}
              type="hidden"
              value={cep}
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
                <p className="text-red-warning">{errors.complement?.message}</p>
              </div>
            </div>
          </div>
          <CardFooter
            className={`flex px-0 pt-8 ${
              currentStep === 1 ? "justify-between" : "justify-end"
            } gap-4 w-full`}
          >
            {canGoToPrevStep && (
              <Button
                onClick={goToPrevStep}
                variant={"outline"}
                className="max-[450px]:w-[70px]"
              >
                <ChevronLeft className="max-[450px]:hidden" /> Anterior
              </Button>
            )}
            <Button
              type="submit"
              isLoading={isSubmitting}
              className="max-[450px]:w-[70px]"
            >
              {canGoToNextStep ? "Próximo" : "Finalizar"}
              <ChevronRight className="max-[450px]:hidden" />
            </Button>
          </CardFooter>
        </div>
      </form>
    </>
  );
}
