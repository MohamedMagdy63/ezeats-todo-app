import { logOut } from "@/app/login/actions";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function Header() {
    const supabase = await createClient();

    const {data :{user}} =await supabase.auth.getUser()
    return(
        <header>
            <div>
                {
                    user !== null ?(
                        <form action={logOut}>
                            <p>{user.email}</p>
                            <button>Sign Out</button>
                        </form>
                    )
                    :
                    (
                        <button>
                            <Link href={'/tasks'}></Link>
                        </button>
                    )
                }
            </div>
        </header>
    )
}