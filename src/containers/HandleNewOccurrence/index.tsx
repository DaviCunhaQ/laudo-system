import { MultiStepper } from "@/components/multistepper"
import { useSearchParams } from "react-router-dom"
import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout"
import { ContentLayout } from "@/components/admin-panel/content-layout"
import { useShowDraft } from "@/hooks/drafts/useShowDraft"
import { useContext } from "react"
import { AuthContext } from "@/context/authContext"

export default function HandleNewOccurrence(){
    const {company} = useContext(AuthContext)
    const [searchParams]  = useSearchParams()
    const id = searchParams.get("draftId")
    localStorage.setItem("draftId" , id ? id : "null")
    const { data , isLoading} = useShowDraft(id ?? ""); // Evita que seja undefined

    return(
        <AdminPanelLayout>
            <ContentLayout title="Criação de ordens de serviço" >
                {!isLoading && (
                    <div className="w-full h-auto px-[4rem] py-[2rem] flex flex-col items-center gap-[1rem]">
                        {/* <Form setIsOpen={setIsOpen}/> */}
                        <h1 className="font-bold text-[1.25rem]">Empresa selecionada: {company}</h1>
                        <MultiStepper data={data}/>
                    </div>   
                )} 
            </ContentLayout>
        </AdminPanelLayout>
    )
}