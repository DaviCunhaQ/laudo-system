import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import MainHeader from "@/components/main-header";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import HandleSelectCompanyDialog from "@/containers/HandleSelectCompanyDialog";
import { useGetOrderServices } from "@/hooks/order-services/useGetOrderServices";
import { useGetSoTypes } from "@/hooks/cities-sotypes/useGetSoTypes";
import { useGetCities } from "@/hooks/cities-sotypes/useGetCities";
import HandleNewOrderServiceDialog from "@/containers/HandleNewOrderServiceDialog";
import HandleAllOptions from "@/containers/HandleAllOptions";
import Loading from "@/components/icons/loading";

export default function Home() {
  // const { setStep } = useStep();
  const { data } = useGetOrderServices();
  const orderServiceData = data ? data : [];
  const {userData} = useContext(AuthContext)
  const {data: soTypes} = useGetSoTypes()
  const {data: cities} = useGetCities()
  const [isOpenAllOptions, setIsOpenAllOptions] = useState(false);
  const [idAllOptions, setIdAllOptions] = useState<string>("");

  return (
    <>
      <HandleSelectCompanyDialog/>
      <HandleAllOptions id={idAllOptions} isOpen={isOpenAllOptions} setIsOpen={setIsOpenAllOptions}/>
      {userData && orderServiceData && soTypes && cities ? (
        <AdminPanelLayout>
          <ContentLayout title={`Seja bem vindo(a), ${userData?.name}!`}>
            <>
              <MainHeader title="Central de Ordens de Serviço">
                <HandleNewOrderServiceDialog/>
              </MainHeader>
              <Table>
                {orderServiceData ? (
                  orderServiceData.length === 0 && (
                    <TableCaption>
                      Nao há nenhuma ordem de serviço cadastrada.
                    </TableCaption>
                  )
                ) : (
                  <></>
                )}
                <TableHeader>
                  <TableRow>
                    <TableHead>Número da os</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Empresa</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Cidade</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orderServiceData && orderServiceData.map((orderService)=>(
                    <TableRow onClick={()=>{
                      setIdAllOptions(orderService.id)
                      setIsOpenAllOptions(true)
                    }} key={orderService.id}>
                    <TableCell className="font-medium">{orderService.order_number}</TableCell>
                    <TableCell>{orderService.status}</TableCell>
                    <TableCell>{(orderService.company as string)}</TableCell>
                    <TableCell>{soTypes?.find((type)=>type.id === (orderService.order_type as string))?.code}</TableCell>
                    <TableCell>{cities?.find((city)=>city.id === (orderService.city as string))?.name}</TableCell>
                  </TableRow>
                  ))}
                </TableBody>
              </Table>
            </>
          </ContentLayout>
        </AdminPanelLayout>
      ) : (
        <>
          <Loading/>
        </>
      )}
    </>
  );
}
