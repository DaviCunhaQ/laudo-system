
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { useMultiStep } from "@/context/Multistepper";
import {
  DriverSchema,
  VehicleSchema,
  ViewDraftSchema,
} from "@/dtos";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import AddDriverDialog from "./AddDriverDialog";
import AddVehicleDialog from "./AddVehicleDialog";
import ListItem from "./listItem";
import { TooltipNotVehicle } from "./TooltipNotVehicle";

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
  const firstVehicles = formData.form3?.vehicles ? formData.form3.vehicles : []
  const firstDrivers = formData.form3?.drivers ? formData.form3.drivers : []
  const [vehicles, setVehicles] = useState<VehicleSchema[]>(
    draftData?.form3?.vehicles ?
    draftData.form3.vehicles :
    firstVehicles
  );
  const [drivers, setDrivers] = useState<DriverSchema[]>(
    draftData?.form3?.drivers ?
    draftData.form3.drivers :
    firstDrivers
  );

  return (
    <>
      <div
        className="flex flex-col items-center gap-6"
      >
        <div className="flex justify-between w-full gap-6">
          <div className="w-full h-auto flex flex-col gap-[1rem]">
            {/* ADICIONAR VEÍCULO */}

            <div className="flex w-full justify-between">
              <h1 className="text-background-color text-[1.5rem] font-bold">
                Veículos
              </h1>
              <AddVehicleDialog setVehicles={setVehicles} vehicles={vehicles} />
            </div>

            <div className="w-full h-[3px] rounded-[1.5px] bg-main-color" />

            {/* LISTAGEM DE VEÍCULOS */}

            <div className="flex flex-col w-full gap-2">
              {(vehicles?.length ? vehicles.length : 0) > 0 ? (
                vehicles?.map((vehicle) => {
                  return (
                    <ListItem
                      key={vehicle.id}
                      id={vehicle.id}
                      name={`${vehicle.model} ${vehicle.color}: ${vehicle.plate}`}
                      type="vehicle"
                      drivers={drivers}
                      setDrivers={setDrivers}
                      vehicles={vehicles}
                      setVehicles={setVehicles}
                    />
                  );
                })
              ) : (
                <p className="text-gray-500">Nenhum veículo cadastrado.</p>
              )}
            </div>
          </div>

          <div className="flex w-[4px] rounded-[1.5px] bg-main-color" />

          <div className="w-full h-auto flex flex-col gap-[1rem]">
            {/* ADICIONAR MOTORISTA */}

            <div className="flex w-full justify-between">
              <h1 className="text-background-color text-[1.5rem] font-bold">
                Motoristas
              </h1>
              {vehicles.length === 0 ? (
                <TooltipNotVehicle />
              ) : (
                <AddDriverDialog
                  vehicles={vehicles}
                  setDrivers={setDrivers}
                  drivers={drivers}
                />
              )}
            </div>

            <div className="w-full h-[3px] rounded-[1.5px] bg-main-color" />

            {/* LISTAGEM DE MOTORISTAS */}

            <div className="flex flex-col w-full gap-2">
              {(drivers?.length ? drivers.length : 0) > 0 ? (
                drivers?.map((driver, index) => {
                  return (
                    <ListItem
                      key={index}
                      id={index}
                      name={`${driver.name} - ${
                        vehicles.find(
                          (vehicle) => vehicle.id === driver.vehicleId
                        )?.model
                      } ${
                        vehicles.find(
                          (vehicle) => vehicle.id === driver.vehicleId
                        )?.color
                      }`}
                      type="driver"
                      drivers={drivers}
                      setDrivers={setDrivers}
                      vehicles={vehicles}
                      setVehicles={setVehicles}
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
              <Button type="button" onClick={goToPrevStep} variant={"outline"}>
                <ChevronLeft /> Anterior
              </Button>
            )}
            <Button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                
                const data = {
                  vehicles: vehicles,
                  drivers: drivers,
                };
                setFormValue("form3", data);
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
