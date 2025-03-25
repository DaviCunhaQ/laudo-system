import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { useMultiStep } from "@/context/Multistepper";
import { LocationSchema, ViewOccurenceSchema } from "@/dtos";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ListItem from "./ListItem";
import AddAuthorityDialog from "./AddAuthorityDialog";
import { api } from "@/services/api";

export default function Form5Update({data}: {data?:ViewOccurenceSchema}) {
  const {
    canGoToPrevStep,
    goToPrevStep,
    goToNextStep,
    currentStep,
    setFormValue,
  } = useMultiStep();
  const dataId = data?.id ? data.id : ""
  const [ocurrenceData , setOcurrenceData] = useState<ViewOccurenceSchema>()
  const [isPoked , setIsPoked] = useState<boolean>(false)
  const AuthorityData = ocurrenceData?.authorities ? ocurrenceData.authorities : []
  useEffect(()=>{
    if(dataId){
      api.get<ViewOccurenceSchema>(`/occurrences/${dataId}`).then((res)=>{
        setOcurrenceData(res.data)
      }).catch((error)=>{console.error(error)})
    }
  },[dataId , setOcurrenceData , isPoked])
  const {
    handleSubmit,
  } = useForm<LocationSchema>({
    resolver: zodResolver(LocationSchema),
  });

  // useEffect(()=>{
  //   if(vehicles.length !== 0){
  //     setValue("vehicles", vehicles)
  //   }
  //   if(drivers.length !== 0){
  //     setValue("drivers", drivers)
  //   }

  // },[])

  const onSubmit = (data: LocationSchema) => {
    console.log(data)
    // createLocation.mutateAsync(data).then(()=>goToNextStep()).catch((error)=>console.error(error))
    // setFormValue("form3" , data)
    // goToNextStep()
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-6"
      >
        <div className="flex justify-between w-full gap-6">
          <div className="w-full h-auto flex flex-col gap-[1rem]">
            {/* ADICIONAR PARTICIPANTE */}

            <div className="flex w-full justify-between">
              <h1 className="text-background-color text-[1.5rem] font-bold">
                Autoridades acionadas
              </h1>
              <AddAuthorityDialog
                occurrenceId={dataId}
                poke={setIsPoked}
                isPoked={isPoked}
              />
            </div>

            <div className="w-full h-[3px] rounded-[1.5px] bg-main-color" />

            {/* LISTAGEM DE PARTICIPANTES */}

            <div className="flex flex-col w-full gap-2">
              {(AuthorityData?.length ? AuthorityData.length : 0) > 0 ? (
                AuthorityData?.map((authority) => {
                  return (
                    <ListItem
                      id={authority.id}
                      name={`${authority.name}: ${authority.serviceTime}`}
                      poke={setIsPoked}
                      isPoked={isPoked}
                    />
                  );
                })
              ) : (
                <p className="text-gray-500">Nenhuma autoridade cadastrada.</p>
              )}
            </div>
          </div>
        </div>
        <div className="w-full h-auto flex flex-col gap-[1rem]">
          <CardFooter
            className={`flex px-0 pt-8 ${
              currentStep === 1 ? "justify-between" : "justify-end"
            } gap-4 w-full`}
          >
            {canGoToPrevStep && (
              <Button type="button" onClick={goToPrevStep} variant={"outline"}>
                <ChevronLeft /> Anterior
              </Button>
            )}
            <Button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                const data = {
                  authorities: AuthorityData,
                };
                setFormValue("form5", data);

                goToNextStep();
              }}
            >
              Atualizar
              <ChevronRight />
            </Button>
          </CardFooter>
        </div>
      </form>
    </>
  );
}
