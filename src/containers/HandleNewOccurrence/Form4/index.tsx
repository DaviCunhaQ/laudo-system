
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { useMultiStep } from "@/context/Multistepper";
import {
  IncidentParticipantSchema,
  ViewDraftSchema,
} from "@/dtos";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import ListItem from "./ListItem";
import AddParticipantDialog from "./AddParticipantDialog";

export default function Form4({draftData}: {draftData?:ViewDraftSchema}) {
  const {
    goToNextStep,
    canGoToPrevStep,
    goToPrevStep,
    canGoToNextStep,
    currentStep,
    formData,
    setFormValue,
  } = useMultiStep();
  const [participants, setParticipants] = useState<IncidentParticipantSchema[]>(
    draftData?.form4 ?
     draftData.form4 : 
     (formData.form4?.participants ? formData.form4.participants : [])
  );

  // useEffect(()=>{
  //   if(vehicles.length !== 0){
  //     setValue("vehicles", vehicles)
  //   }
  //   if(drivers.length !== 0){
  //     setValue("drivers", drivers)
  //   }

  // },[])

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
      <div
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
                setParticipants={setParticipants}
                participants={participants}
              />
            </div>

            <div className="w-full h-[3px] rounded-[1.5px] bg-main-color" />

            {/* LISTAGEM DE PARTICIPANTES */}

            <div className="flex flex-col w-full gap-2">
              {(participants?.length ? participants.length : 0) > 0 ? (
                participants?.map((participant, index) => {
                  return (
                    <ListItem
                      id={index}
                      name={`${participant.name}: ${convertStatus(
                        participant.status
                      )}`}
                      participants={participants}
                      setParticipants={setParticipants}
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
                  participants: participants,
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
      </div>
    </>
  );
}
