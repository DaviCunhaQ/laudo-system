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
import { FaPencilAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import formatDateBR from "@/utils/formatDate";
import { useListDrafts } from "@/hooks/drafts/useListDrafts";
import HandleDeleteDraftDialog from "@/containers/HandleDeleteDraftDialog";

export default function Drafts() {
  const { data } = useListDrafts();
  const draftData = data ? data : [];
  const {userData} = useContext(AuthContext)
  return (
    <>
      <AdminPanelLayout>
        <ContentLayout title={`Seja bem vindo(a), ${userData?.name}!`}>
          <>
            <MainHeader title="Rascunhos">
              <></>
            </MainHeader>
            <Table>
              {draftData ? (
                draftData.length === 0 && (
                  <TableCaption>
                    Nao há nenhum rascunho.
                  </TableCaption>
                )
              ) : (
                <></>
              )}
              <TableHeader>
                <TableRow>
                  <TableHead>Data de criação</TableHead>
                  <TableHead className="text-center">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {draftData && draftData.map((draft)=>(
                  <TableRow key={draft.id}>
                  <TableCell className="font-medium">{formatDateBR(draft.createdAt ? draft.createdAt : "2017-11-18T16:02:00.000Z")}</TableCell>
                  <TableCell className="flex items-center justify-center max-sm:flex-col gap-2">
                    <div className="flex items-center w-max gap-2">
                      <Link to={`/create?draftId=${draft.id}`}>
                        <Button
                          type="button"
                          variant={"rounded"}
                          className=" bg-green-main"
                        >
                          <FaPencilAlt />
                        </Button>
                      </Link>
                      <HandleDeleteDraftDialog id={draft.id} />
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
