import MobileNav from "@/components/mobile-nav";
import Navbar from "@/components/navbar";

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="bg-neutral-100 dark:bg-primary/5 flex h-screen flex-col relative">
            <Navbar />
            <MobileNav />
            <div className="h-screen overflow-auto">
                <div className="sm:w-[90%] md:w-[90%] lg:w-[60%] xl:w-[50%] lg:max-w-6xl mx-auto p-3 lg:pt-5 md:pt-4">
                    {children}
                </div>
            </div>
            
        </main>
    )
}