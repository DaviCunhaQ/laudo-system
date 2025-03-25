
import DeleteParticipantDialog from "./DeleteParticipantDialog"
import { IncidentParticipantSchema} from "@/dtos";

interface ListItemProps{
  id: number,
  name: string,
  setParticipants: React.Dispatch<React.SetStateAction<IncidentParticipantSchema[]>>,
  participants: IncidentParticipantSchema[],
}

export default function ListItem({
  id,
  name,
  setParticipants,
  participants
}: ListItemProps){
  return (
    <div className="w-full h-[2rem] flex items-center justify-between rounded-[0.5rem] ">
      <p className="text-gray-600">{name}</p>
      <DeleteParticipantDialog id={id} participants={participants} setParticipants={setParticipants}/>
    </div>
  )
}