import Image from "next/image"
import BackgroundImage from "../../../public/auth-background.jpg"

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="w-full h-screen lg:grid lg:min-h-[400px] lg:grid-cols-2">
            <div className="flex h-full items-center justify-center py-12">
                {children}
            </div>
            <div className="hidden lg:block relative overflow-hidden">
                <div className="h-44 w-44 bg-primary z-10"></div>
                
                <Image
                    src={BackgroundImage}
                    alt="Image"
                    fill
                    style={{ objectFit: "cover", objectPosition: "center" }}
                    className="h-full w-full"
                    placeholder="blur"
                    priority
                />
            </div>
        </main>
    )
}