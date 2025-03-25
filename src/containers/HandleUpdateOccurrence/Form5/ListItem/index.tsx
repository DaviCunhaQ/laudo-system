
import DeleteAuthorityDialog from "./DeleteAuthorityDialog";

interface ListItemProps{
  id: string,
  name: string,
  poke:React.Dispatch<React.SetStateAction<boolean>>,
  isPoked: boolean,
}

export default function ListItem({
  id,
  name,
  poke,
  isPoked
}: ListItemProps){
  return (
    <div className="w-full h-[2rem] flex items-center justify-between rounded-[0.5rem] ">
      <p className="text-gray-600">{name}</p>
      <DeleteAuthorityDialog id={id} poke={poke} isPoked={isPoked}/>
    </div>
  )
}