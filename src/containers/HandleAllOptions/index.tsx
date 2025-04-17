import { DialogHeader } from "@/components/TailwindDialog";
import {
  Dialog,
  DialogContent
} from "@/components/TailwindDialog";
import { useShowOrderService } from "@/hooks/order-services/useShowOrderService";
import HandleChecklistDialog from "../HandleChecklistDialog";
import { ServiceOrderListSchema } from "@/dtos";
import { useGetSoTypes } from "@/hooks/cities-sotypes/useGetSoTypes";
import HandleDeleteOrderServiceDialog from "../HandleDeleteOrderServiceDialog";
import PDFGenerator from "@/utils/convertOccurrenceToPDF";
import HandleUpdateOrderServiceDialog from "../HandleUpdateOrderServiceDialog";
import { HandleViewOccurrenceDialog } from "../HandleViewOccurrenceDialog";
import HandleLocationDialog from "../HandleLocationDialog";
import { citiesCoordinates } from "@/utils/citiesCoordernates";
import { useGetCities } from "@/hooks/cities-sotypes/useGetCities";
import HandleChangeStatusDialog from "../HandleChangeStatusDialog";
import Loading from "@/components/icons/loading";

export default function HandleAllOptions(
  {isOpen,setIsOpen,id}:{isOpen:boolean,setIsOpen:React.Dispatch<React.SetStateAction<boolean>>,id:string}
) {
  const {data} = useShowOrderService(id)
  const {data:soTypes} = useGetSoTypes()
  const {data: cities} = useGetCities()
  const soType = soTypes?.find((soType) => soType.id === data?.order_type)
  const cityCoordinate = citiesCoordinates.find((city)=>city.name === cities?.find((city)=>city.id === data?.city)?.name)?.coordinates as string
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(isModalOpen) => {
        if (!isModalOpen) setIsOpen(false);
      }}
      modal={true}
    >
      <DialogContent className="max-sm:!w-[400px] max-[500px]:!w-[300px] w-[400px] flex flex-col items-center pb-10">
        <DialogHeader className="w-full text-start max-[500px]:hidden">
          <h1 className="text-[1.5rem] text-secondary-color font-bold">
            {data?.order_number}
          </h1>
        </DialogHeader>
        {data ? (
          <div className="w-[90%] grid grid-cols-2 grid-rows-4 gap-8 mt-4">
            <HandleChecklistDialog id={id} orderData={data as ServiceOrderListSchema} soType={soType?.code as string}/>
            <HandleLocationDialog initialCoordinates={cityCoordinate} id={id} orderData={data as ServiceOrderListSchema} soType={soType?.code as string}/>
            <HandleUpdateOrderServiceDialog setIsOpenDad={setIsOpen} id={id} orderData={data as ServiceOrderListSchema} soType={soType?.code as string}/>
            <HandleViewOccurrenceDialog id={id}/>
            <HandleChangeStatusDialog setIsOpenDad={setIsOpen} id={id} orderData={data as ServiceOrderListSchema}/>
            <HandleChecklistDialog id={id} orderData={data as ServiceOrderListSchema} soType={soType?.code as string}/>
            <PDFGenerator occurrenceId={id}/>
            <HandleDeleteOrderServiceDialog id={id} setIsOpenDad={setIsOpen}/>
          </div>
        ) : (
          <>
            <Loading/>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
