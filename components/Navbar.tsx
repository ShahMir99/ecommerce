import { UserButton, auth } from "@clerk/nextjs";
import { MainNav } from "@/components/MainNav";
import StoreSwitcher from "./StoreSwitcher";
import { redirect } from "next/navigation";
import Prisma from "@/lib/prismadb";
import { ThemeToggle } from "./theme-toggle";

const Navbar = async () => {

    const {userId} = auth()

    if(!userId) {
        redirect("/sign-in")
    }

    const store = await Prisma.store.findMany({
        where : {
            userId
        }
    })

    return (
        <div className="border-b">
            <div className="flex h-16 items-center px-4">
                <StoreSwitcher items={store}/>
                <MainNav className="mx-6"/>
                <div className="ml-auto flex items-center space-x-4">
                    <ThemeToggle />
                    <UserButton afterSignOutUrl="/"/>
                </div>
            </div>
        </div>
    );
}

export default Navbar;