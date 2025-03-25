import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { useMultiStep } from "@/context/Multistepper";
import { AuthoritySchema } from "@/dtos";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import ListItem from "./ListItem";
import AddAuthorityDialog from "./AddAuthorityDialog";

export default function Form5() {
  const {
    canGoToPrevStep,
    goToPrevStep,
    goToNextStep,
    currentStep,
    formData,
    setFormValue,
  } = useMultiStep();
  const [authorities, setAuthorities] = useState<AuthoritySchema[]>(
    formData.form5?.authorities ? formData.form5.authorities : []
  );

  // useEffect(()=>{
  //   if(vehicles.length !== 0){
  //     setValue("vehicles", vehicles)
  //   }
  //   if(drivers.length !== 0){
  //     setValue("drivers", drivers)
  //   }

  // },[])

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
                Autoridades acionadas
              </h1>
              <AddAuthorityDialog
                setAuthorities={setAuthorities}
                authorities={authorities}
              />
            </div>

            <div className="w-full h-[3px] rounded-[1.5px] bg-main-color" />

            {/* LISTAGEM DE PARTICIPANTES */}

            <div className="flex flex-col w-full gap-2">
              {(authorities?.length ? authorities.length : 0) > 0 ? (
                authorities?.map((authority, index) => {
                  return (
                    <ListItem
                      id={index}
                      name={`${authority.name}: ${authority.serviceTime}`}
                      authorities={authorities}
                      setAuthorities={setAuthorities}
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
                  authorities: authorities,
                };
                setFormValue("form5", data);

                goToNextStep();
              }}
            >
              Finalizar
              <ChevronRight />
            </Button>
          </CardFooter>
        </div>
      </div>
    </>
  );
}
