import Header from "@/components/Header/Header"
import TaskContainer from "@/components/TaskContainer/TaskContainer"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import ServerTaskContainer from "../components/TaskContainer/ServerTaskContainer"


export default async function tasksPage(){
    const supabase = await createClient()
    
    const {data :{user}} =await supabase.auth.getUser()

    if(!user){
        return redirect('/login')
    }
    return(
        <section>
            <Header/>
            <ServerTaskContainer />
        </section>
    )
}