import { ServiceOrderListSchema } from "@/dtos";
import { SoTypeSchema } from "@/hooks/cities-sotypes/useGetSoTypes";
import { useEffect, useState } from "react";
import bgNoConcludes from "@/../public/background-no-concludes.png";
import toast from "react-hot-toast";
import { CitySchema } from "@/hooks/cities-sotypes/useGetCities";

export function firstTwoNames(completeName: string) {
  const parts = completeName.trim().split(/\s+/); // Divide por espaços, ignorando múltiplos espaços
  return parts.slice(0, 2).join(" ");
}

const TableCell = ({
  title,
  subtitle,
  information,
  handleClick,
}: {
  title: string;
  subtitle: string;
  information: string;
  handleClick: () => void;
}) => {
  return (
    <div
      onClick={handleClick}
      style={{ zIndex: 100 }}
      className="cursor-pointer hover:scale-[102%] transition-all duration-200 ease-in-out shadow-[0px_8px_8px_0px_rgba(0,_0,_0,_0.1)] w-full h-auto flex flex-col gap-2 mb-2 items-start bg-white rounded-md border border-black p-2"
    >
      <h2 className="text-[1rem] text-secondary-color break-all width-[90%] font-bold">
        {title}
      </h2>
      <p className="font-bold width-[90%] text-black text-[0.75rem]">
        {subtitle}
      </p>
      <p className="font-semibold width-[90%] text-black text-[0.75rem]">
        {information}
      </p>
    </div>
  );
};

const statusList = [
  { label: "LAUNCHED", name: "Lançadas", color: "bg-gray-600" },
  {
    label: "DOCUMENTAL_ANALYSIS",
    name: "Análise Documental",
    color: "bg-gray-500",
  },
  {
    label: "RELATORY_DEVELOPING",
    name: "Desenvolvimento de Laudo",
    color: "bg-gray-600",
  },
  { label: "VISTORY", name: "Vistoria/Fotos", color: "bg-gray-500" },
  {
    label: "RELATORY_REVISION",
    name: "Revisão de Laudo",
    color: "bg-gray-600",
  },
  { label: "SIGNATURE", name: "Assinatura", color: "bg-gray-500" },
  { label: "SYSTEM_INSERT", name: "Inserir no Sistema", color: "bg-gray-600" },
  { label: "CONCLUDED", name: "Concluídas", color: "bg-[#08c91c]" },
];

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
      title={`Clique para copiar ( ${content} )`}
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

const ActionColumn = ({
  title,
  data,
  handleClick,
  isHideConcludes
}: {
  title: string;
  data: ServiceOrderListSchema[];
  handleClick: (id: string) => void;
  isHideConcludes: boolean;
}) => (
  <div className="flex flex-col min-w-[12rem] w-full max-w-[18rem] border-r border-black bg-gray-200 h-max">
    <div className="bg-gray-600 text-white text-center font-semibold py-2 px-1 text-sm truncate">
      {title}
    </div>
    <div className="flex-1 h-max">
      {isHideConcludes && data
        .filter((item) => item.status !== "CONCLUDED")
        .map((item) => (
          <div
            key={item.id}
            onClick={() => handleClick(item.id)}
            className="w-full h-[2.5rem] px-2 py-1 text-sm font-medium text-blue-600 border-b border-black flex items-center truncate cursor-pointer hover:bg-blue-100 transition-all duration-150"
          >
            Ver detalhes
          </div>
        ))}

      {!isHideConcludes && data.map((item) => (
          <div
            key={item.id}
            onClick={() => handleClick(item.id)}
            className="w-full h-[2.5rem] px-2 py-1 text-sm font-medium text-blue-600 border-b border-black flex items-center truncate cursor-pointer hover:bg-blue-100 transition-all duration-150"
          >
            Ver detalhes
          </div>
        ))}
    </div>
  </div>
);

export const StatusTable = ({
  data,
  osTypes,
  handleClick,
  isHideConcludes,
  isList,
  cities
}: {
  data: ServiceOrderListSchema[];
  osTypes: SoTypeSchema[];
  cities: CitySchema[];
  handleClick: (id: string) => void;
  isHideConcludes: boolean;
  isList: boolean;
}) => {
  const [height, setHeight] = useState<string | undefined>(undefined);
  const finalStatusList = isHideConcludes
    ? statusList.filter((status) => status.label !== "CONCLUDED")
    : statusList;
  function theBiggerToHeight() {
    const numberOfLauncheds = data.filter(
      (order) => order.status === statusList[0].label
    ).length;
    const numberOfAnalysis = data.filter(
      (order) => order.status === statusList[1].label
    ).length;
    const numberOfRelatory = data.filter(
      (order) => order.status === statusList[2].label
    ).length;
    const numberOfVistories = data.filter(
      (order) => order.status === statusList[3].label
    ).length;
    const numberOfRevisions = data.filter(
      (order) => order.status === statusList[4].label
    ).length;
    const numberOfSignatures = data.filter(
      (order) => order.status === statusList[5].label
    ).length;
    const numberOfToInserts = data.filter(
      (order) => order.status === statusList[6].label
    ).length;
    const numberOfConcludeds = data.filter(
      (order) => order.status === statusList[7].label
    ).length;

    let maxNumber = 1;

    if (isHideConcludes) {
      maxNumber = Math.max(
        numberOfLauncheds,
        numberOfAnalysis,
        numberOfRelatory,
        numberOfVistories,
        numberOfRevisions,
        numberOfSignatures,
        numberOfToInserts
      );
    } else {
      maxNumber = Math.max(
        numberOfLauncheds,
        numberOfAnalysis,
        numberOfRelatory,
        numberOfVistories,
        numberOfRevisions,
        numberOfSignatures,
        numberOfToInserts,
        numberOfConcludeds
      );
    }

    const heightToCompare = maxNumber * 117.6;

    if (maxNumber > 2) {
      const finalHeight = `${heightToCompare + 117.6}px`;
      setHeight(finalHeight);
      return;
    } else {
      setHeight("400px");
      return;
    }
  }

  useEffect(() => {
    theBiggerToHeight();
  }, [data]);

  return (
    <>
      {!isList && height && (
        <div
          style={{ height: "400px", maxHeight: "400px" }}
          className="flex flex-col w-full items-start justify-start overflow-r-auto overflow-x-auto rounded-lg border border-black"
        >
          <div
            style={{ minHeight: height }}
            className="w-auto h-auto flex items-start gap-0"
          >
            {finalStatusList.map((status) => (
              <div
                key={status.label}
                style={{ minHeight: height }}
                className="flex flex-col w-[12rem] items-center border-r-2 border-r-black bg-gray-200"
              >
                <div
                  className={`w-full h-[3.5rem] flex items-center justify-center p-2 text-center ${status.color} text-white text-[1rem] font-semibold`}
                >
                  {status.name}
                </div>
                <div className="w-full h-auto bg-transparent p-1">
                  {data
                    .filter((item) => item.status === status.label)
                    .map((item) => (
                      <TableCell
                        key={item.id}
                        title={item.order_number}
                        subtitle={`${firstTwoNames(item.client_name)} - ${
                          osTypes.find((type) => type.id === item.order_type)
                            ?.code || "N/A"
                        }`}
                        information={`Encerra: ${item.date_expire}`}
                        handleClick={() => handleClick(item.id)}
                      />
                    ))}
                </div>
              </div>
            ))}
            {isHideConcludes && (
              <div
                style={{ minHeight: height }}
                className="relative flex flex-col w-[3rem] items-center border-r-2 border-r-black bg-gray-200"
              >
                <div
                  style={{
                    minHeight: height,
                    backgroundImage: `url(${bgNoConcludes})`,
                    backgroundRepeat: "repeat",
                    backgroundSize: "contain",
                    backgroundPosition: "top left",
                    width: "100%",
                    zIndex: 1,
                  }}
                  className="absolute top-0 left-0"
                />
                <div
                  className={`w-full h-[3.5rem] flex items-center justify-center p-2 text-center bg-black text-white text-[1rem] font-semibold`}
                ></div>
                <div className="w-full h-auto bg-transparent p-1"></div>
              </div>
            )}
          </div>
        </div>
      )}
      {isList && isHideConcludes && (
        <div className="flex w-full h-[400px] overflow-x-auto overflow-y-hidden border border-black rounded-lg">
          <ListColumn
            title="O.S."
            items={data
              .filter((item) => item.status !== "CONCLUDED")
              .map((item) => item.order_number)}
          />
          <ListColumn
            title="Cliente"
            items={data
              .filter((item) => item.status !== "CONCLUDED")
              .map((item) => item.client_name)}
          />
          <ListColumn
            title="Tipo"
            items={data
              .filter((item) => item.status !== "CONCLUDED")
              .map((item) => {
                const type = osTypes.find(
                  (type) => type.id === item.order_type
                );
                return type?.code || "N/A";
              })}
          />
          <ListColumn
            title="Data de Abertura"
            items={data
              .filter((item) => item.status !== "CONCLUDED")
              .map((item) => item.opening_date)}
          />
          <ListColumn
            title="Data de Vencimento"
            items={data
              .filter((item) => item.status !== "CONCLUDED")
              .map((item) => item.date_expire)}
          />
          <ListColumn
            title="Cidade"
            items={data
              .filter((item) => item.status !== "CONCLUDED")
              .map((item) => cities.find((city)=>city.id===item.city)?.name as string)}
          />
          <ListColumn
            title="Status"
            items={data
              .filter((item) => item.status !== "CONCLUDED")
              .map((item) => statusList.find((status)=>status.label===item.status)?.name as string)}
          />
          <ListColumn
            title="Status das fotos"
            items={data
              .filter((item) => item.status !== "CONCLUDED")
              .map((item) => item.photos_status)}
          />
          <ActionColumn isHideConcludes title="Ações" data={data} handleClick={handleClick} />
        </div>
      )}
      {isList && !isHideConcludes && (
        <div className="flex w-full h-[400px] overflow-x-auto overflow-y-auto border border-black rounded-lg">
          <ListColumn data={data} title="O.S." items={data.map((item) => item.order_number)} />
          <ListColumn title="Cliente" items={data.map((item) => item.client_name)}
          />
          <ListColumn
            title="Tipo"
            items={data.map((item) => {
                const type = osTypes.find(
                  (type) => type.id === item.order_type
                );
                return type?.code || "N/A";
              })}
          />
          <ListColumn
            title="Data de Abertura"
            items={data.map((item) => item.opening_date)}
          />
          <ListColumn
            title="Data de Vencimento"
            items={data.map((item) => item.date_expire)}
          />
          <ListColumn
            title="Cidade"
            items={data.map((item) => cities.find((city)=>city.id===item.city)?.name as string)}
          />
          <ListColumn
            title="Status"
            items={data.map((item) => statusList.find((status)=>status.label===item.status)?.name as string)}
          />
          <ListColumn
            title="Status das fotos"
            items={data.map((item) => item.photos_status)}
          />
          <ActionColumn isHideConcludes={false} title="Ações" data={data} handleClick={handleClick} />
        </div>
      )}
    </>
  );
};
