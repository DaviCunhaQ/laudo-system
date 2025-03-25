import { MultiStepper } from "@/components/multistepper"
import { useSearchParams } from "react-router-dom"
import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout"
import { ContentLayout } from "@/components/admin-panel/content-layout"
import { useShowDraft } from "@/hooks/drafts/useShowDraft"

export default function HandleNewOccurrence(){
    const [searchParams]  = useSearchParams()
    const id = searchParams.get("draftId")
    localStorage.setItem("draftId" , id ? id : "null")
    const { data , isLoading} = useShowDraft(id ?? ""); // Evita que seja undefined

    return(
        <AdminPanelLayout>
            <ContentLayout title="Criação de ocorrências" >
                {!isLoading && (
                    <div className="w-full h-auto px-[4rem] py-[2rem] flex flex-col items-center gap-[1rem]">
                        {/* <Form setIsOpen={setIsOpen}/> */}
                        <MultiStepper data={data}/>
                    </div>   
                )} 
            </ContentLayout>
        </AdminPanelLayout>
    )
}