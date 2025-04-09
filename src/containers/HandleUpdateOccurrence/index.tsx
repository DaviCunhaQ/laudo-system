
import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout"
import { ContentLayout } from "@/components/admin-panel/content-layout"
import { useSearchParams } from "react-router-dom"
import { MultiStepperUpdate } from "@/components/multistepper"
import { useShowOrderService } from "@/hooks/order-services/useShowOrderService"
export default function HandleUpdateOccurrence(){
    const [searchParams]  = useSearchParams()
    const id = searchParams.get("OrderId")
    const { data } = useShowOrderService(id ? id : "");
    return(
        <AdminPanelLayout>
            <ContentLayout title="Atualização de ordens de serviço" >
                <div className="w-full h-auto px-[4rem] py-[2rem] flex flex-col items-center gap-[1rem]">
                    {/* <Form setIsOpen={setIsOpen}/> */}
                    <MultiStepperUpdate data={data} id={id? id: undefined}/>
                </div>    
            </ContentLayout>
        </AdminPanelLayout>
    )
}