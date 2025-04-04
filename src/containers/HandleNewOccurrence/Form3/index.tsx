
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { useMultiStep } from "@/context/Multistepper";
import {
  ServiceOrderFormThreeSchema,
  ViewDraftSchema,
} from "@/dtos";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Map from "@/components/map";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function Form3({draftData}: {draftData?:ViewDraftSchema}) {
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
    const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
      setValue,
    } = useForm<ServiceOrderFormThreeSchema>({
      resolver: zodResolver(ServiceOrderFormThreeSchema),
      defaultValues: {
        batch: draftData?.form3?.batch ? draftData.form3.batch : formData.form3?.batch,
        block: draftData?.form3?.block ? draftData.form3.block : formData.form3?.block,
        cep: draftData?.form3?.cep ? draftData.form3.cep : formData.form3?.cep,
        complement: draftData?.form3?.complement ? draftData.form3.complement : formData.form3?.complement,
        neighborhood: draftData?.form3?.neighborhood ? draftData.form3.neighborhood : formData.form3?.neighborhood,
        number: draftData?.form3?.number ? draftData.form3.number : formData.form3?.number,
        street: draftData?.form3?.street ? draftData.form3.street : formData.form3?.street,
        coordenates: draftData?.form3?.coordenates ? draftData.form3.coordenates : formData.form3?.coordenates,
      },
    });
  
    const onSubmit = (data: ServiceOrderFormThreeSchema) => {
      // createLocation.mutateAsync(data).then(()=>goToNextStep()).catch((error)=>console.error(error))
      setFormValue("form2", data);
      goToNextStep();
    };

  useEffect(() => {
    if (formData.form3?.coordenates) {
      setPosition(formData.form3.coordenates);
    }
  }, [formData, setPosition]);

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
                formData.form3?.coordenates
                  ? formData.form3.coordenates
                  : "-3.4640, -40.6775"
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
              {/* <div className="flex flex-col w-[47%] gap-2 max-md:w-full max-md:mb-4">
                <Label>Estado</Label>
                <Input
                  {...register("state")}
                  type="text"
                  placeholder="Estado..."
                />
                <p className="text-red-warning">{errors.state?.message}</p>
              </div> */}
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
              {/* <div className="flex flex-col w-[47%] gap-2 max-md:w-full">
                <Label>Cidade</Label>
                <Input
                  {...register("city")}
                  type="text"
                  placeholder="Cidade..."
                />
                <p className="text-red-warning">{errors.city?.message}</p>
              </div> */}
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
