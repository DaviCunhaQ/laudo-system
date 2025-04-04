import Map from "@/components/map";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMultiStep } from "@/context/Multistepper";
import { ServiceOrderFormTwoSchema, ViewDraftSchema } from "@/dtos";
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
  } = useForm<ServiceOrderFormTwoSchema>({
    resolver: zodResolver(ServiceOrderFormTwoSchema),
    defaultValues: {
      art_registration_compare: draftData?.form2?.art_registration_compare ? draftData.form2.art_registration_compare : formData.form2?.art_registration_compare,
      averbation_exists: draftData?.form2?.averbation_exists ? draftData.form2.averbation_exists : formData.form2?.averbation_exists,
      bathrooms_number: draftData?.form2?.bathrooms_number ? draftData.form2.bathrooms_number : formData.form2?.bathrooms_number,
      built_area: draftData?.form2?.built_area ? draftData.form2.built_area : formData.form2?.built_area,
      built_area_presents: draftData?.form2?.built_area_presents ? draftData.form2.built_area_presents : formData.form2?.built_area_presents,
      cpf: draftData?.form2?.cpf ? draftData.form2.cpf : formData.form2?.cpf,
      cnpj: draftData?.form2?.cnpj ? draftData.form2.cnpj : formData.form2?.cnpj,
      dec_registration_compare: draftData?.form2?.dec_registration_compare ? draftData.form2.dec_registration_compare : formData.form2?.dec_registration_compare,
      dwell_registration_compare: draftData?.form2?.dwell_registration_compare ? draftData.form2.dwell_registration_compare : formData.form2?.dwell_registration_compare,
      mandatory_documents: draftData?.form2?.mandatory_documents ? draftData.form2.mandatory_documents : formData.form2?.mandatory_documents,
      more_accurate_informations: draftData?.form2?.more_accurate_informations ? draftData.form2.more_accurate_informations : formData.form2?.more_accurate_informations,
      pci_art_compare: draftData?.form2?.pci_art_compare ? draftData.form2.pci_art_compare : formData.form2?.pci_art_compare,
      pci_verifications: draftData?.form2?.pci_verifications ? draftData.form2.pci_verifications : formData.form2?.pci_verifications,
      property_status: draftData?.form2?.property_status ? draftData.form2.property_status : formData.form2?.property_status,
      property_type: draftData?.form2?.property_type ? draftData.form2.property_type : formData.form2?.property_type,
      registration_date: draftData?.form2?.registration_date ? draftData.form2.registration_date : formData.form2?.registration_date,
      registration_on_system: draftData?.form2?.registration_on_system ? draftData.form2.registration_on_system : formData.form2?.registration_on_system,
      registration_type: draftData?.form2?.registration_type ? draftData.form2.registration_type : formData.form2?.registration_type,
      rooms_number: draftData?.form2?.rooms_number ? draftData.form2.rooms_number : formData.form2?.rooms_number,
      siopi_coincides: draftData?.form2?.siopi_coincides ? draftData.form2.siopi_coincides : formData.form2?.siopi_coincides,
      total_measured: draftData?.form2?.total_measured ? draftData.form2.total_measured : formData.form2?.total_measured,
      minimal_documentation: draftData?.form2?.minimal_documentation ? draftData.form2.minimal_documentation : formData.form2?.minimal_documentation,
      pls_verifications: draftData?.form2?.pls_verifications ? draftData.form2.pls_verifications : formData.form2?.pls_verifications,
      pls_built_situation: draftData?.form2?.pls_built_situation ? draftData.form2.pls_built_situation : formData.form2?.pls_built_situation,
      project_permit_verifications: draftData?.form2?.project_permit_verifications ? draftData.form2.project_permit_verifications : formData.form2?.project_permit_verifications,
      terrain_area: draftData?.form2?.terrain_area ? draftData.form2.terrain_area : formData.form2?.terrain_area,
    },
  });

  const onSubmit = (data: ServiceOrderFormTwoSchema) => {
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
