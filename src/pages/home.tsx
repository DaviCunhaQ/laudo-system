import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { Button } from "@/components/ui/button";
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
import { FaPencilAlt, FaPlus } from "react-icons/fa";
import HandleDeleteOrderServiceDialog from "@/containers/HandleDeleteOrderServiceDialog";
import { Link } from "react-router-dom";
import { HandleViewOccurrenceDialog } from "@/containers/HandleViewOccurrenceDialog";
import formatDateBR from "@/utils/formatDate";
import PDFGenerator from "@/utils/convertOccurrenceToPDF";
import HandleSelectCompanyDialog from "@/containers/HandleSelectCompanyDialog";
import { useGetOrderServices } from "@/hooks/order-services/useGetOrderServices";

export default function Home() {
  // const { setStep } = useStep();
  const { data } = useGetOrderServices();
  const orderServiceData = data ? data : [];
  const {userData} = useContext(AuthContext)

  return (
    <>
      <HandleSelectCompanyDialog/>
      <AdminPanelLayout>
        <ContentLayout title={`Seja bem vindo(a), ${userData?.name}!`}>
          <>
            <MainHeader title="Central de Ordens de Serviço">
              <Link to="/create">
                <Button type="button" className="flex items-center">
                  <p className="max-sm:hidden">Gerar Ordem de Serviço</p> <FaPlus />
                </Button>
              </Link>
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
                  <TableHead>Data de criação</TableHead>
                  <TableHead>Saldo</TableHead>
                  <TableHead className="text-center">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orderServiceData && orderServiceData.map((orderService)=>(
                  <TableRow key={orderService.id}>
                  <TableCell className="font-medium">{formatDateBR(orderService.created_at)}</TableCell>
                  <TableCell>{((orderService.service_value as number) + (orderService.displacement_value as number))}</TableCell>
                  <TableCell className="flex items-center justify-center max-sm:flex-col gap-2">
                    <div className="flex items-center w-max gap-2">
                      <HandleViewOccurrenceDialog id={orderService.id} />
                      <Link to={`/update?OrderId=${orderService.id}`}>
                        <Button
                          type="button"
                          variant={"rounded"}
                          className=" bg-green-main"
                        >
                          <FaPencilAlt />
                        </Button>
                      </Link>
                    </div>
                    <div className="flex items-center w-max gap-2">
                      <HandleDeleteOrderServiceDialog id={orderService.id} />
                      <PDFGenerator 
                        occurrenceId={orderService.id}
                      />
                    </div>
                  </TableCell>
                </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        </ContentLayout>
      </AdminPanelLayout>
    </>
  );
}
