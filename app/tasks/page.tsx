import Header from "@/components/Header/Header"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

export default async function tasksPage(){
    const supabase = await createClient()
    
    const {data :{user}} =await supabase.auth.getUser()

    if(!user){
        return redirect('/login')
    }
    return(
        <section>
            <Header/>
        </section>
    )
}