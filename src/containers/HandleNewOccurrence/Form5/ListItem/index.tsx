import { AuthoritySchema} from "@/dtos";
import DeleteAuthorityDialog from "./DeleteAuthorityDialog";

interface ListItemProps{
  id: number,
  name: string,
  setAuthorities: React.Dispatch<React.SetStateAction<AuthoritySchema[]>>,
  authorities: AuthoritySchema[],
}

export default function ListItem({
  id,
  name,
  setAuthorities,
  authorities
}: ListItemProps){
  return (
    <div className="w-full h-[2rem] flex items-center justify-between rounded-[0.5rem] ">
      <p className="text-gray-600">{name}</p>
      <DeleteAuthorityDialog id={id} authorities={authorities} setAuthorities={setAuthorities}/>
    </div>
  )
}