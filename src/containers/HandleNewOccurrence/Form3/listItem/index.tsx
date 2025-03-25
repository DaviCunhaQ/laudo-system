
import DeleteDriverDialog from "./DeleteDriverDialog"
import DeleteVehicleDialog from "./DeleteVehicleDialog"
import { DriverSchema, VehicleSchema } from "@/dtos";

interface ListItemProps{
  id: string | number,
  name: string,
  type: "driver" | "vehicle",
  setVehicles: React.Dispatch<React.SetStateAction<VehicleSchema[]>>,
  vehicles: VehicleSchema[],
  drivers: DriverSchema[],
  setDrivers: React.Dispatch<React.SetStateAction<DriverSchema[]>>
}

export default function ListItem({
  id,
  name,
  type,
  drivers,
  setDrivers,
  setVehicles,
  vehicles
}: ListItemProps){
  return (
    <div className="w-full h-[2rem] flex items-center justify-between rounded-[0.5rem] ">
      <p className="text-gray-600">{name}</p>
      {type === "driver" ? <DeleteDriverDialog id={id} drivers={drivers} setDrivers={setDrivers} setVehicles={setVehicles} vehicles={vehicles} /> : <DeleteVehicleDialog id={id}  drivers={drivers} setDrivers={setDrivers} setVehicles={setVehicles} vehicles={vehicles}/> }
    </div>
  )
}