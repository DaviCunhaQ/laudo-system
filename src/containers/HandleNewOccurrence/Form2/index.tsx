import Map from "@/components/map";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMultiStep } from "@/context/Multistepper";
import { LocationSchema, ViewDraftSchema } from "@/dtos";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function Form2({draftData}: {draftData?:ViewDraftSchema}) {
  const {
    goToNextStep,
    canGoToPrevStep,
    goToPrevStep,
    canGoToNextStep,
    currentStep,
    formData,
    setFormValue,
  } = useMultiStep();
  const [position, setPosition] = useState<string>("");
  // const createLocation = useCreateLocation()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<LocationSchema>({
    resolver: zodResolver(LocationSchema),
    defaultValues: {
      occurrenceId: draftData?.form2?.occurrenceId ? draftData.form2.occurrenceId : formData.form1?.id,
      city: draftData?.form2?.city ? draftData.form2.city : formData.form2?.city,
      geolocation: draftData?.form2?.geolocation ? draftData.form2.geolocation : formData.form2?.geolocation,
      neighborhood: draftData?.form2?.neighborhood ? draftData.form2.neighborhood : formData.form2?.neighborhood,
      number: draftData?.form2?.number ? draftData.form2.number : formData.form2?.number,
      reference: draftData?.form2?.reference ? draftData.form2.reference : formData.form2?.reference,
      state: draftData?.form2?.state ? draftData.form2.state : formData.form2?.state,
      street: draftData?.form2?.street ? draftData.form2.street : formData.form2?.street,
    },
  });

  useEffect(() => {
    if (formData.form2?.geolocation) {
      setPosition(formData.form2.geolocation);
    }
  }, [formData, setPosition]);

  useEffect(() => {
    if (position) setValue("geolocation", position);
  }, [position, setValue]);

  const onSubmit = (data: LocationSchema) => {
    // createLocation.mutateAsync(data).then(()=>goToNextStep()).catch((error)=>console.error(error))
    setFormValue("form2", data);
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
                formData.form2?.geolocation
                  ? formData.form2.geolocation
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
