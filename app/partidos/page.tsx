import Header from "@/components/header";
import Navbar from "@/components/navbar";

export default function Page() {
    return (
        <>
            <Header />

            <main className="w-[92%] lg:w-[75%] mx-auto flex flex-col relative" style={{ minHeight: 'calc(100vh - 4rem)' }}>
                <Navbar />
            </main>
        </>
    );
}