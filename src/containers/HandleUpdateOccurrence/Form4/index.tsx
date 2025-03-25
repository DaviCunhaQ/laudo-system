
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { useMultiStep } from "@/context/Multistepper";
import {
  LocationSchema,
  ViewOccurenceSchema,
} from "@/dtos";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ListItem from "./ListItem";
import AddParticipantDialog from "./AddParticipantDialog";
import { api } from "@/services/api";

export default function Form4Update({data}: {data?:ViewOccurenceSchema}) {
  const {
    goToNextStep,
    canGoToPrevStep,
    goToPrevStep,
    canGoToNextStep,
    currentStep,
    setFormValue,
  } = useMultiStep();
  const dataId = data?.id ? data.id : ""
  const [ocurrenceData , setOcurrenceData] = useState<ViewOccurenceSchema>()
  const [isPoked , setIsPoked] = useState<boolean>(false)
  const ParticipantData = ocurrenceData?.participants ? ocurrenceData.participants : []
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

  const convertStatus = (word: string | undefined) => {
    if (word === "FERIDO") {
      return "Ferido";
    } else if (word === "OBITO") {
      return "Óbito";
    } else if (word === "SEM_FERIMENTOS") {
      return "Sem ferimentos";
    } else {
      return "";
    }
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
                Participantes do ocorrido
              </h1>
              <AddParticipantDialog
                occurrenceId={dataId}
                poke={setIsPoked}
                isPoked={isPoked}
              />
            </div>

            <div className="w-full h-[3px] rounded-[1.5px] bg-main-color" />

            {/* LISTAGEM DE PARTICIPANTES */}

            <div className="flex flex-col w-full gap-2">
              {(ParticipantData?.length ? ParticipantData.length : 0) > 0 ? (
                ParticipantData?.map((participant) => {
                  return (
                    <ListItem
                      id={participant.id}
                      name={`${participant.name}: ${convertStatus(
                        participant.status
                      )}`}
                      poke={setIsPoked} isPoked={isPoked}
                    />
                  );
                })
              ) : (
                <p className="text-gray-500">Nenhum participante cadastrado.</p>
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
                  participants: ParticipantData,
                };
                setFormValue("form4", data);
                goToNextStep();
              }}
            >
              {canGoToNextStep ? "Próximo" : "Finalizar"}
              <ChevronRight />
            </Button>
          </CardFooter>
        </div>
      </form>
    </>
  );
}
