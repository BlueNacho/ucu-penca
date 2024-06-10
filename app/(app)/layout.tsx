import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="flex h-screen flex-col lg:min-h-[400px] relative">
            <Navbar />
            <div className="dark:bg-gradient-to-t dark:from-primary/10 h-full">
                <div className="md:w-[65%] lg:w-[60%] xl:w-[50%] lg:max-w-6xl mx-auto h-full p-3">
                    {children}
                </div>
            </div>
            <Footer />

        </main>
    )
}