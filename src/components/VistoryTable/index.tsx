import { ServiceOrderListSchema } from "@/dtos";
import { SoTypeSchema } from "@/hooks/cities-sotypes/useGetSoTypes";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CitySchema } from "@/hooks/cities-sotypes/useGetCities";
const ListCell = ({
  content,
  onClick,
  data
}: {
  content: string;
  onClick: () => void;
  data?:any[];
}) => {
  const [bg , setbg] = useState("")
  const [isGreen , setIsGreen] = useState(false)
  useEffect(()=>{
    if(data){
      const isFinallyGreen = data.find((item)=>item.order_number===content).status === "CONCLUDED"
      setIsGreen(isFinallyGreen)
    }
  },[data,content])
  useEffect(()=>{
    if(isGreen){
      setbg("bg-green-main")
    }
  },[isGreen])
  return(
    <div
      onClick={onClick}
      title="Clique para copiar"
      className={`${bg} w-full h-[2.5rem] px-2 py-1 text-sm font-medium text-black border-b border-black flex items-center truncate cursor-pointer hover:bg-gray-300 transition-all duration-150`}
    >
      {content}
    </div>
  )
};

const ListColumn = ({ title, items, data }: { title: string; items: string[]; data?: any[] }) => (
  <div className="flex flex-col min-w-[12rem] w-full max-w-[18rem] border-r border-black bg-gray-200 h-max">
    <div className="bg-gray-600 text-white text-center font-semibold py-2 px-1 text-sm truncate">
      {title}
    </div>
    <div className="flex-1 h-max">
      {items.map((content, idx) => (
        <ListCell
          key={idx}
          content={content}
          data={data}
          onClick={() => {
            navigator.clipboard.writeText(content);
            toast.success("Copiado!");
          }}
        />
      ))}
    </div>
  </div>
);

export const VistoryTable = ({
  data,
  osTypes,
  cityId
}: {
  data: ServiceOrderListSchema[];
  osTypes: SoTypeSchema[];
  cities: CitySchema[];
  cityId: string;
}) => {
  const listWithoutConcludeds = data.filter((item) => ((item.status !== "CONCLUDED") && (item.photos_status !== "Ok")))
  const finalList = cityId === "" ?
  listWithoutConcludeds :
  listWithoutConcludeds.filter((item) => {
    return item.city === cityId
  })
  return (
    <>
        <div className="flex w-full h-[400px] overflow-x-auto overflow-y-hidden border border-black rounded-lg">
          <ListColumn
            title="O.S."
            items={
              finalList.map((item) => item.order_number)}
          />
          <ListColumn
            title="Cliente"
            items={
              finalList.map((item) => item.client_name)}
          />
          <ListColumn
            title="Tipo"
            items={
              finalList.map((item) => {
                const type = osTypes.find(
                  (type) => type.id === item.order_type
                );
                return type?.code || "N/A";
              })}
          />
          <ListColumn
            title="Endereço"
            items={
              finalList.map((item) => item.address)}
          />
          <ListColumn
            title="Link do Maps"
            items={
              finalList.map((item) => item.location_link || "Não Cadastrado")}
          />
          <ListColumn
            title="Contato"
            items={
              finalList.map((item) => item.contact_name)}
          />
          <ListColumn
            title="Telefone"
            items={
              finalList.map((item) => item.contact_number)}
          />
        </div>
    </>
  )
};
