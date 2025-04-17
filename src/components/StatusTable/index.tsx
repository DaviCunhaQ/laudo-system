import { ServiceOrderListSchema } from "@/dtos";
import { SoTypeSchema } from "@/hooks/cities-sotypes/useGetSoTypes";

const statusList = [
  { label: "LAUNCHED", name: "Lançadas", color: "bg-gray-600" },
  { label: "DOCUMENTAL_ANALYSIS", name: "Análise Documental", color: "bg-gray-500" },
  { label: "RELATORY_DEVELOPING", name: "Desenvolvimento de Laudo", color: "bg-gray-600" },
  { label: "VISTORY", name: "Vistoria/Fotos", color: "bg-gray-500" },
  { label: "RELATORY_REVISION", name: "Revisão de Laudo", color: "bg-gray-600" },
  { label: "SIGNATURE", name: "Assinatura", color: "bg-gray-500" },
  { label: "SYSTEM_INSERT", name: "Inserir no Sistema", color: "bg-gray-600" },
  { label: "CONCLUDED", name: "Concluídas", color: "bg-[#08c91c]" },
];

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
      <h2 className="text-[1rem] text-secondary-color width-[90%] font-bold">{title}</h2>
      <p className="font-bold width-[90%] text-black text-[0.75rem]">{subtitle}</p>
      <p className="font-semibold width-[90%] text-black text-[0.75rem]">{information}</p>
    </div>
  );
};

export const StatusTable = ({
  data,
  osTypes,
  handleClick,
}: {
  data: ServiceOrderListSchema[];
  osTypes: SoTypeSchema[];
  handleClick: (id: string) => void;
}) => {
  return (
    <div className="flex flex-col w-full h-[400px] max-h-[400px] items-start justify-start overflow-r-auto overflow-x-auto rounded-lg border border-black">
      <div className="w-auto h-auto min-h-[400px] flex items-start gap-0">
        {statusList.map((status) => (
          <div key={status.label} className="flex flex-col w-[12rem] items-center border-r-2 border-r-black bg-gray-200 min-h-full">
            <div className={`w-full h-[3.5rem] flex items-center justify-center p-2 text-center ${status.color} text-white text-[1rem] font-semibold`}>
              {status.name}
            </div>
            <div className="w-full h-auto bg-transparent p-1">
              {data
                .filter((item) => item.status === status.label)
                .map((item) => (
                  <TableCell
                    key={item.id}
                    title={item.order_number}
                    subtitle={`${item.company} - ${osTypes.find((type) => type.id === item.order_type)?.code || "N/A"}`}
                    information={`Encerra: ${item.date_expire}`}
                    handleClick={() => handleClick(item.id)}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
