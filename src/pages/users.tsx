import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useContext, useEffect} from "react";
import { AuthContext } from "../context/authContext";
import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import MainHeader from "@/components/main-header";
import HandleSelectCompanyDialog from "@/containers/HandleSelectCompanyDialog";
import Loading from "@/components/icons/loading";
import { useNavigate } from "react-router-dom";
import { useListUsers } from "@/hooks/users/useListUsers";
import { FaTrashAlt } from "react-icons/fa";
import { useDeleteUser } from "@/hooks/users/useDeleteUser";
import HandleNewUserDialog, { rolesList } from "@/containers/HandleNewUserDialog";

export default function Users() {
  const navigate = useNavigate()
  const { data } = useListUsers();
  const deleteUser = useDeleteUser()
  const usersData = data ? data : [];
  const {userData} = useContext(AuthContext)
  useEffect(()=>{
    const role = localStorage.getItem("role")
    if (role !== "Dev"){
      navigate("/", {replace: true})
    }
  },[])
  function handleDelete(id: string) {
    deleteUser.mutateAsync(id)
  }

  return (
    <>
      <HandleSelectCompanyDialog/>
      {userData && usersData ? (
        <AdminPanelLayout>
          <ContentLayout title={`Seja bem vindo(a), ${userData?.name}!`}>
            <>
              <MainHeader title="Central de Gerenciamento de Usuários">
                <HandleNewUserDialog/>
              </MainHeader>
              <Table>
              {usersData ? (
                usersData.length === 0 && (
                  <TableCaption>
                    Nao há nenhuma ordem de serviço cadastrada.
                  </TableCaption>
                )
              ) : (
                <></>
              )}
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Cargo</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {usersData && usersData.filter((user)=>user.role !== "Dev").map((user)=>(
                  <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{rolesList.find((role)=>role.value === user.role)?.label}</TableCell>
                  <TableCell><FaTrashAlt className="text-red-warning cursor-pointer" onClick={()=>handleDelete(user.id)}/></TableCell>
                </TableRow>
                ))}
              </TableBody>
            </Table>
            </>
          </ContentLayout>
        </AdminPanelLayout>
      ) : (
        <div className="w-full h-screen flex items-center justify-center">
          <Loading height="80" width="80"/>
        </div>
      )}
    </>
  );
}
