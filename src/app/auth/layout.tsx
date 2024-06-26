import Image from "next/image"
import BackgroundImage from "../../../public/auth-background.jpg"
import Logo from "@/components/logo";

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="w-full h-screen lg:grid lg:min-h-[400px] lg:grid-cols-2">
            <div className="lg:hidden h-16 flex justify-center items-center lg:justify-start w-full lg:w-[60%] xl:w-[50%] lg:max-w-6xl lg:mx-auto py-2 border-b">
                <Logo />
            </div>
            <div className="flex h-full bg-neutral-100 dark:bg-background items-start lg:items-center justify-center py-8">
                {children}
            </div>
            <div className="hidden lg:flex relative overflow-hidden items-center justify-center">
                <Image
                    src={BackgroundImage}
                    alt="Image"
                    fill
                    className="h-full w-full absolute object-cover object-center"
                    placeholder="blur"
                    priority
                />
                <div className="w-max flex flex-col items-center gap-5 max-w-lg bg-primary/20 p-3 rounded-xl backdrop-blur-xl">
                    <div className="items-center flex flex-col w-max">
                        <h1 className="text-[3rem] -mb-2 font-bold tracking-wider uppercase text-white">Bienvenido a la</h1>
                        <Logo size="sm" />
                    </div>
                    <div className="w-full max-w-full flex flex-col gap-4 items-center p-3 bg-foreground/40 dark:bg-background/40 rounded-xl">
                        <div className="self-start flex flex-col items-start w-max bg-gradient-to-tr from-blue-600 to-blue-400 py-2 px-3 rounded-md rounded-bl-none">
                            <p className="text-white/80">¡La penca de la <b>Copa América<br />2024</b> para estudiantes
                                <b> UCU! &#9917;</b><br /> </p>
                        </div>
                        <div className="self-end flex flex-col items-center w-max bg-gradient-to-tr  from-neutral-300 to-neutral-50 py-2 px-3 rounded-md rounded-br-none">
                            <p className="text-neutral-700 font-medium">¡<b>Primer y segundo puesto</b> <br /> participan por <b>premios</b>! &#127942;</p>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    )
}