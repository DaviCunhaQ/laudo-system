import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import MainHeader from "@/components/main-header";
import HandleSelectCompanyDialog from "@/containers/HandleSelectCompanyDialog";
import { useGetOrderServices } from "@/hooks/order-services/useGetOrderServices";
import { useGetSoTypes } from "@/hooks/cities-sotypes/useGetSoTypes";
import { useGetCities } from "@/hooks/cities-sotypes/useGetCities";
import Loading from "@/components/icons/loading";
import { VistoryTable } from "@/components/VistoryTable";

export default function VistoryListPage() {
  // const { setStep } = useStep();
  const { data } = useGetOrderServices();
  const orderServiceData = data ? data : [];
  const { userData, setIsOpenCompany, company } = useContext(AuthContext);
  const { data: soTypes } = useGetSoTypes();
  const { data: cities } = useGetCities();
  const [selected , setSelected]= useState("")

  const companyListConvert = [
    { atState: "A C Q Pereira", atList: ["A C Q Pereira", "A C Q PEREIRA"] },
    { atState: "G W M Arcanjo", atList: ["G W M ARCANJO", "G W M Arcanjo"] },
  ];

  return (
    <>
      <HandleSelectCompanyDialog />
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
                  <select
                    id="custom-select"
                    value={selected}
                    onChange={(e) => setSelected(e.target.value)}
                    className="block w-full px-4 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-secondary-color text-gray-700"
                  >
                    <option value="" disabled>
                      Selecione uma opção
                    </option>
                    {cities.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                </div>
              </MainHeader>

              <VistoryTable
                data={orderServiceData.filter((item) => {
                  return companyListConvert
                    .find((itemConvert) => itemConvert.atState === company)
                    ?.atList.includes(item.company);
                })}
                osTypes={soTypes}
                cities={cities}
                cityId={selected}
              />
            </>
          </ContentLayout>
        </AdminPanelLayout>
      ) : (
        <div className="w-full h-screen flex items-center justify-center">
          <Loading height="80" width="80" />
        </div>
      )}
    </>
  );
}
