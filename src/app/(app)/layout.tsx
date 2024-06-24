import MobileNav from "@/components/mobile-nav";
import Navbar from "@/components/navbar";
import { getSession } from "@/lib/auth-utils";

export default async function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getSession();
    const name: string = session.user?.name;

    return (
        <main className="bg-neutral-100 dark:bg-primary/5 flex h-screen flex-col relative">
            <Navbar name={name} />
            <MobileNav name={name} />
            <div className="h-screen overflow-y-auto">
                <div className="sm:w-[90%] md:w-[90%] lg:w-[60%] xl:w-[50%] lg:max-w-6xl mx-auto p-3 lg:pt-5 md:pt-4 h-full">
                    {children}
                </div>
            </div>
            
        </main>
    )
}