
import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout"
import { ContentLayout } from "@/components/admin-panel/content-layout"
import { useSearchParams } from "react-router-dom"
import { useShowOccurrence } from "@/hooks/occurrence/useShowOccurence"
import { MultiStepperUpdate } from "@/components/multistepper"
export default function HandleUpdateOccurrence(){
    const [searchParams]  = useSearchParams()
    const id = searchParams.get("OccurrenceId")
    const { data } = useShowOccurrence(id ? id : "");
    return(
        <AdminPanelLayout>
            <ContentLayout title="Atualização de ordens de serviço" >
                <div className="w-full h-auto px-[4rem] py-[2rem] flex flex-col items-center gap-[1rem]">
                    {/* <Form setIsOpen={setIsOpen}/> */}
                    <MultiStepperUpdate data={data}/>
                </div>    
            </ContentLayout>
        </AdminPanelLayout>
    )
}