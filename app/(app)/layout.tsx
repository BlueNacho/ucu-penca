import BottomNav from "@/components/bottom-nav";
import Navbar from "@/components/navbar";

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="flex h-screen flex-col lg:min-h-[400px] relative">
            <Navbar />
            <BottomNav />
            <div className="bg-neutral-100 dark:bg-primary/5 h-full">
                <div className="sm:w-[90%] md:w-[90%] lg:w-[60%] xl:w-[50%] lg:max-w-6xl mx-auto h-full p-3 lg:pt-8 md:pt-4">
                    {children}
                </div>
            </div>
            
        </main>
    )
}