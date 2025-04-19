import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import MainHeader from "@/components/main-header";
import HandleSelectCompanyDialog from "@/containers/HandleSelectCompanyDialog";
import { useGetOrderServices } from "@/hooks/order-services/useGetOrderServices";
import { useGetSoTypes } from "@/hooks/cities-sotypes/useGetSoTypes";
import { useGetCities } from "@/hooks/cities-sotypes/useGetCities";
import HandleNewOrderServiceDialog from "@/containers/HandleNewOrderServiceDialog";
import HandleAllOptions from "@/containers/HandleAllOptions";
import Loading from "@/components/icons/loading";
import { StatusTable } from "@/components/StatusTable";
import HandleImportOrderServiceDialog from "@/containers/HandleImportOrderServiceDialog";

export default function Home() {
  // const { setStep } = useStep();
  const { data } = useGetOrderServices();
  const orderServiceData = data ? data : [];
  const {userData, setIsOpenCompany, company} = useContext(AuthContext)
  const {data: soTypes} = useGetSoTypes()
  const {data: cities} = useGetCities()
  const [isOpenAllOptions, setIsOpenAllOptions] = useState(false);
  const [idAllOptions, setIdAllOptions] = useState<string>("");

  const setModal = (id: string)=>{
    setIdAllOptions(id)
    setIsOpenAllOptions(true)
  }
  

  return (
    <>
      <HandleSelectCompanyDialog/>
      <HandleAllOptions id={idAllOptions} isOpen={isOpenAllOptions} setIsOpen={setIsOpenAllOptions}/>
      {userData && orderServiceData && soTypes && cities ? (
        <AdminPanelLayout>
          <ContentLayout title={`Seja bem vindo(a), ${userData?.name}!`}>
            <>
              <div className="hidden max-lg:flex max-lg:flex-col max-lg:items-center max-lg:font-bold max-lg:text-xl max-lg:text-background-color">
                <p>Empresa: {company}</p>
                <a
                  className="underline cursor-pointer"
                  onClick={() => setIsOpenCompany(true)}
                >
                  Trocar empresa
                </a>
              </div>
              <MainHeader title="Central de Ordens de Serviço">
                <div className="flex items-center gap-8 max-[1200px]:flex-col-reverse max-[1200px]:gap-2">
                  <HandleImportOrderServiceDialog/>
                  <HandleNewOrderServiceDialog/>
                </div>
              </MainHeader>
              <StatusTable data={orderServiceData} osTypes={soTypes} handleClick={setModal}/>
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
