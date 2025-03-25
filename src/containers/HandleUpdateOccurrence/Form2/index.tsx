import Map from "@/components/map";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMultiStep } from "@/context/Multistepper";
import {
  UpdateLocationSchema
} from "@/dtos"
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function Form2Update({ data }: { data?: UpdateLocationSchema }) {
  const {
    goToNextStep,
    canGoToPrevStep,
    goToPrevStep,
    canGoToNextStep,
    currentStep,
    formDataUpdate,
    setFormValueUpdate,
  } = useMultiStep();
  const [position, setPosition] = useState<string>("");
  // const createLocation = useCreateLocation()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<UpdateLocationSchema>({
    resolver: zodResolver(UpdateLocationSchema),
    defaultValues: {
      id: data?.id ? data.id : "",
      occurrenceId: formDataUpdate.form1?.id,
      city: formDataUpdate.form2?.city ? formDataUpdate.form2.city : data?.city,
      geolocation: formDataUpdate.form2?.geolocation
        ? formDataUpdate.form2.geolocation
        : data?.geolocation,
      neighborhood: formDataUpdate.form2?.neighborhood
        ? formDataUpdate.form2.neighborhood
        : data?.neighborhood,
      number: formDataUpdate.form2?.number
        ? formDataUpdate.form2.number
        : data?.number,
      reference: formDataUpdate.form2?.reference
        ? formDataUpdate.form2.reference
        : data?.reference,
      state: formDataUpdate.form2?.state
        ? formDataUpdate.form2.state
        : data?.state,
      street: formDataUpdate.form2?.street
        ? formDataUpdate.form2.street
        : data?.street,
    },
  });

  useEffect(() => {
    if (formDataUpdate.form2?.geolocation) {
      setPosition(formDataUpdate.form2.geolocation);
    }
  }, [formDataUpdate, setPosition]);

  useEffect(() => {
    if (position) setValue("geolocation", position);
  }, [position, setValue]);

  const onSubmit = (data: UpdateLocationSchema) => {
    // createLocation.mutateAsync(data).then(()=>goToNextStep()).catch((error)=>console.error(error))
    setFormValueUpdate("form2", data);
    goToNextStep();
  };

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
                formDataUpdate.form2?.geolocation
                  ? formDataUpdate.form2.geolocation
                  : "-3.4640, -40.6775"
              }
            />
            <Input
              type="hidden"
              value={position}
              readOnly
              placeholder="Selecione um ponto no mapa"
            />
            <p className="text-red-warning">{errors.geolocation?.message}</p>
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
                <Label>Ponto de referência</Label>
                <Input
                  {...register("reference")}
                  type="text"
                  placeholder="Ponto de referência..."
                />
                <p className="text-red-warning">{errors.reference?.message}</p>
              </div>
            </div>
            <div className="flex items-center justify-between w-full max-md:flex-col max-md:justify-center">
              <div className="flex flex-col w-[47%] gap-2 max-md:w-full max-md:mb-4">
                <Label>Estado</Label>
                <Input
                  {...register("state")}
                  type="text"
                  placeholder="Estado..."
                />
                <p className="text-red-warning">{errors.state?.message}</p>
              </div>
              <div className="flex flex-col w-[47%] gap-2 max-md:w-full">
                <Label>Número</Label>
                <Input
                  {...register("number")}
                  type="number"
                  placeholder="Número..."
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
                <Label>Cidade</Label>
                <Input
                  {...register("city")}
                  type="text"
                  placeholder="Cidade..."
                />
                <p className="text-red-warning">{errors.city?.message}</p>
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
