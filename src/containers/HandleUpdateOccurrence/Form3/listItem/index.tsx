
import DeleteDriverDialog from "./DeleteDriverDialog"
import DeleteVehicleDialog from "./DeleteVehicleDialog"
import { ViewOccurenceSchema } from "@/dtos";

interface ListItemProps{
  id: string,
  name: string,
  type: "driver" | "vehicle",
  data?: ViewOccurenceSchema,
  poke:React.Dispatch<React.SetStateAction<boolean>>,
  isPoked: boolean,
}

export default function ListItem({
  id,
  name,
  type, 
  isPoked,
  poke
}: ListItemProps){
  return (
    <div className="w-full h-[2rem] flex items-center justify-between rounded-[0.5rem] ">
      <p className="text-gray-600">{name}</p>
      {type === "driver" ? <DeleteDriverDialog id={id} poke={poke} isPoked={isPoked} /> : <DeleteVehicleDialog id={id} poke={poke} isPoked={isPoked}/> }
    </div>
  )
}