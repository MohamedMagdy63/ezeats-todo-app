import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import ServerTaskContainer from "../components/TaskContainer/ServerTaskContainer"
import AddTaskForm from "../components/AddTask/AddTask"
import Header from "../components/Header/Header"


export default async function tasksPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return redirect('/login');
    }

    const userEmail = user.email || ""; // Fallback to empty string if undefined

    return (
        <section>
            <Header />
            <div className="flex flex-col lg:flex-row justify-between w-full">
                <div className="lg:w-1/2 w-full">
                    <ServerTaskContainer />
                </div>
                <div className="lg:w-1/2 w-full">
                    <AddTaskForm userEmail={userEmail} /> {/* Now passing a guaranteed string */}
                </div>
            </div>
        </section>
    );
}
