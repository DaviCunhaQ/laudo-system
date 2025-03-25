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
import HandleDeleteOccurrenceDialog from "@/containers/HandleDeleteOccurrenceDialog";
import { Link } from "react-router-dom";
import { HandleViewOccurrenceDialog } from "@/containers/HandleViewOccurrenceDialog";
import { useGetOccurrences } from "@/hooks/occurrence/useGetOccurrence";
import formatDateBR from "@/utils/formatDate";
import formatEnumCombobox from "@/utils/formatEnumCombobox";
import PDFGenerator from "@/utils/convertOccurrenceToPDF";

export default function Home() {
  // const { setStep } = useStep();
  const { data } = useGetOccurrences();
  const occurrenceData = data ? data : [];
  const {userData} = useContext(AuthContext)

  return (
    <>
      <AdminPanelLayout>
        <ContentLayout title={`Seja bem vindo(a), ${userData?.name}!`}>
          <>
            <MainHeader title="Central de Ocorrências">
              <Link to="/create">
                <Button type="button" className="flex items-center">
                  <p className="max-sm:hidden">Gerar ocorrência</p> <FaPlus />
                </Button>
              </Link>
            </MainHeader>
            <Table>
              {occurrenceData ? (
                occurrenceData.length === 0 && (
                  <TableCaption>
                    Nao há nenhuma ocorrência cadastrada.
                  </TableCaption>
                )
              ) : (
                <></>
              )}
              <TableHeader>
                <TableRow>
                  <TableHead>Data de criação</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-center">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {occurrenceData && occurrenceData.map((occurrence)=>(
                  <TableRow key={occurrence.id}>
                  <TableCell className="font-medium">{formatDateBR(occurrence.registeredAt)}</TableCell>
                  <TableCell>{formatEnumCombobox(occurrence.status)}</TableCell>
                  <TableCell className="flex items-center justify-center max-sm:flex-col gap-2">
                    <div className="flex items-center w-max gap-2">
                      <HandleViewOccurrenceDialog id={occurrence.id} />
                      <Link to={`/update?OccurrenceId=${occurrence.id}`}>
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
                      <HandleDeleteOccurrenceDialog id={occurrence.id} />
                      <PDFGenerator 
                        occurrenceId={occurrence.id}
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
