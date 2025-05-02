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
  const { userData, setIsOpenCompany, company } = useContext(AuthContext);
  const { data: soTypes } = useGetSoTypes();
  const { data: cities } = useGetCities();
  const [isOpenAllOptions, setIsOpenAllOptions] = useState(false);
  const [idAllOptions, setIdAllOptions] = useState<string>("");
  const [isHideConcludes, setIsHideConcludes] = useState(false);
  const [isList, setIsList] = useState(false);

  const setModal = (id: string) => {
    setIdAllOptions(id);
    setIsOpenAllOptions(true);
  };

  const companyListConvert = [
    { atState: "A C Q Pereira", atList: ["A C Q Pereira", "A C Q PEREIRA"] },
    { atState: "G W M Arcanjo", atList: ["G W M ARCANJO", "G W M Arcanjo"] },
  ];

  return (
    <>
      <HandleSelectCompanyDialog />
      <HandleAllOptions
        id={idAllOptions}
        isOpen={isOpenAllOptions}
        setIsOpen={setIsOpenAllOptions}
      />
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
                  <HandleImportOrderServiceDialog />
                  <HandleNewOrderServiceDialog />
                </div>
              </MainHeader>
              <div className="w-full flex items-center justify-between px-4 py-2 border rounded-xl shadow-sm bg-white mb-4 max-[470px]:flex-col max-[470px]:items-start max-[470px]:justify-center max-[470px]:gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-700">
                    Visualização:
                  </span>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-sm ${
                        !isList
                          ? "font-semibold text-secondary-color"
                          : "text-gray-500"
                      }`}
                    >
                      Quadro
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={isList}
                        onChange={() => setIsList(!isList)}
                      />
                      <div className="w-9 h-5 bg-gray-200 rounded-full peer peer-checked:bg-secondary-color after:content-[''] after:absolute after:top-[1.5px] after:left-[1.5px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-4" />
                    </label>
                    <span
                      className={`text-sm ${
                        isList
                          ? "font-semibold text-secondary-color"
                          : "text-gray-500"
                      }`}
                    >
                      Lista
                    </span>
                  </div>
                </div>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-secondary-color"
                    checked={!isHideConcludes}
                    onChange={() => setIsHideConcludes(!isHideConcludes)}
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Mostrar concluídas
                  </span>
                </label>
              </div>

              <StatusTable
                isHideConcludes={isHideConcludes}
                isList={isList}
                data={orderServiceData.filter((item) => {
                  return companyListConvert
                    .find((itemConvert) => itemConvert.atState === company)
                    ?.atList.includes(item.company);
                })}
                osTypes={soTypes}
                handleClick={setModal}
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
