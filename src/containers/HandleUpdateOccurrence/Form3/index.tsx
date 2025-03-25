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
import AddDriverDialog from "./AddDriverDialog";
import AddVehicleDialog from "./AddVehicleDialog";
import ListItem from "./listItem";
import { TooltipNotVehicle } from "./TooltipNotVehicle";
import toast from "react-hot-toast";
import { api } from "@/services/api";

export default function Form3Update({data}: {data?:ViewOccurenceSchema}) {
  const {
    goToNextStep,
    canGoToPrevStep,
    goToPrevStep,
    canGoToNextStep,
    currentStep,
    setFormValueUpdate,
    isTriggedToast,
    setIsTriggedToast
  } = useMultiStep();
  const dataId = data?.id ? data.id : ""
  const [ocurrenceData , setOcurrenceData] = useState<ViewOccurenceSchema>()
  const VehiclesData = ocurrenceData?.vehicles ? ocurrenceData.vehicles : []
  const DriversData = ocurrenceData?.drivers ? ocurrenceData.drivers : []
  const [isPoked , setIsPoked] = useState<boolean>(false)
  useEffect(()=>{
    if(dataId){
      api.get<ViewOccurenceSchema>(`/occurrences/${dataId}`).then((res)=>{
        setOcurrenceData(res.data)
      }).catch((error)=>{console.error(error)})
    }
  },[dataId , setOcurrenceData , isPoked])
  //   formDataUpdate.form3?.vehicles ? formDataUpdate.form3.vehicles : (VehiclesData ? VehiclesData : [])
  // );
  // const [drivers, setDrivers] = useState<DriverSchema[]>(
  //   formDataUpdate.form3?.drivers ? formDataUpdate.form3.drivers : (DriversData ? DriversData : [])
  // );

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

  useEffect(()=>{
    if(!isTriggedToast){
      toast('Atenção! Todas as as alterações feitas a partir do segundo passo serão salvas automaticamente.', {duration: 5000})
      setIsTriggedToast(true)
    }
  },[isTriggedToast , setIsTriggedToast])

  const onSubmit = (data: LocationSchema) => {
    // createLocation.mutateAsync(data).then(()=>goToNextStep()).catch((error)=>console.error(error))
    setFormValueUpdate("form3", data);
    goToNextStep();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-6"
      >
        <div className="flex justify-between w-full gap-6 max-xl:flex-col max-xl: justify-center">
          <div className="w-full h-auto flex flex-col gap-[1rem] max-xl:mb-4">
            {/* ADICIONAR VEÍCULO */}

            <div className="flex w-full justify-between max-[430px]:flex-col max-[430px]:gap-2">
              <h1 className="text-background-color text-[1.5rem] font-bold">
                Veículos
              </h1>
              <AddVehicleDialog occurrenceId={dataId} poke={setIsPoked} isPoked={isPoked}/>
            </div>

            <div className="w-full h-[3px] rounded-[1.5px] bg-main-color" />

            {/* LISTAGEM DE VEÍCULOS */}

            <div className="flex flex-col w-full gap-2">
              {(VehiclesData?.length ? VehiclesData.length : 0) > 0 ? (
                VehiclesData?.map((vehicle) => {
                  return (
                    <ListItem
                      id={vehicle.id}
                      name={`${vehicle.model} ${vehicle.color}: ${vehicle.plate}`}
                      type="vehicle"
                      data={data} 
                      poke={setIsPoked} 
                      isPoked={isPoked}
                    />
                  );
                })
              ) : (
                <p className="text-gray-500">Nenhum veículo cadastrado.</p>
              )}
            </div>
          </div>

          <div className="flex w-[4px] rounded-[1.5px] bg-main-color max-xl:hidden" />

          <div className="w-full h-auto flex flex-col gap-[1rem]">
            {/* ADICIONAR MOTORISTA */}

            <div className="flex w-full justify-between max-[430px]:flex-col max-[430px]:gap-2">
              <h1 className="text-background-color text-[1.5rem] font-bold">
                Motoristas
              </h1>
              {VehiclesData.length === 0 ? (
                <TooltipNotVehicle />
              ) : (
                <AddDriverDialog
                  occurrenceId={dataId}
                  poke={setIsPoked}
                  isPoked={isPoked}
                />
              )}
            </div>

            <div className="w-full h-[3px] rounded-[1.5px] bg-main-color" />

            {/* LISTAGEM DE MOTORISTAS */}

            <div className="flex flex-col w-full gap-2">
              {(DriversData?.length ? DriversData.length : 0) > 0 ? (
                DriversData?.map((driver) => {
                  return (
                    <ListItem
                      id={driver.id}
                      name={`${driver.name} - ${
                        VehiclesData.find(
                          (vehicle) => vehicle.id === driver.vehicleId
                        )?.model
                      } ${
                        VehiclesData.find(
                          (vehicle) => vehicle.id === driver.vehicleId
                        )?.color
                      }`}
                      type="driver"
                      data={data}
                      poke={setIsPoked} isPoked={isPoked}
                    />
                  );
                })
              ) : (
                <p className="text-gray-500">Nenhum Motorista cadastrado.</p>
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
              <Button type="button" onClick={goToPrevStep} variant={"outline"} className="max-[470px]:w-[70px]">
                <ChevronLeft className="max-[470px]:hidden"/> Anterior
              </Button>
            )}
            <Button
              type="button"
              className="max-[470px]:w-[70px]"
              onClick={(e) => {
                e.preventDefault();
                const data = {
                  vehicles: VehiclesData,
                  drivers: DriversData,
                };
                setFormValueUpdate("form3", data);
                goToNextStep();
              }}
            >
              {canGoToNextStep ? "Próximo" : "Finalizar"}
              <ChevronRight className="max-[470px]:hidden"/>
            </Button>
          </CardFooter>
        </div>
      </form>
    </>
  );
}
