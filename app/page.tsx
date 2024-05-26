import Logo from "@/components/my-ui/logo";
import { Button } from "@/components/ui/button";
import { AuthForm } from "@/components/auth-form";

export default function Page() {
  return (
    <main className="min-h-[512px] h-screen w-full">
      <div className="lg:hidden h-full max-w-full flex flex-col items-center justify-center">
        <div className="w-max flex flex-col items-center gap-5 max-w-lg md:border md:rounded-xl p-5 md:bg-background/40">
          <div className="items-center flex flex-col w-max">
            <h1 className="text-[2rem] -mb-2 font-bold tracking-wider uppercase text-foreground dark:text-white">Bienvenido a la</h1>
            <Logo size="sm" />
          </div>
          <div className="w-full max-w-full flex flex-col gap-4 items-center border bg-secondary/60 p-3 rounded-xl">
            <div className="self-start flex flex-col items-start w-max bg-gradient-to-tr from-blue-600 to-blue-400 py-2 px-3 rounded-md rounded-bl-none">
              <p className="text-white/80">¡La penca de la <b>Copa América<br />2024</b> para estudiantes
                <b> UCU! &#9917;</b><br /> </p>
            </div>
            <div className="self-end flex flex-col items-center w-max bg-gradient-to-tr from-foreground to-foreground/85 dark:from-neutral-300 dark:to-neutral-50 py-2 px-3 rounded-md rounded-br-none">
              <p className="text-white dark:text-neutral-700 font-medium">¡<b>Primer y segundo puesto</b> <br /> participan por <b>premios</b>! &#127942;</p>
            </div>
          </div>
          <div className="w-full flex flex-col gap-1">
            <Button className="w-full">Iniciar Sesión</Button>
            <p className="text-sm text-center text-foreground">¿No tenés cuenta? <span className="underline font-medium">Registrate</span></p>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex flex-col h-full max-w-full items-center justify-center">
        <div className="flex flex-row border rounded-xl bg-background/40 w-[1000px] h-[500px]">
          <div className="w-1/2 h-full rounded-l-xl relative overflow-hidden bg-cover bg-center flex flex-col items-center justify-center" style={{ backgroundImage: "url(/background-login.jpg)" }}>
            <div className="w-max flex flex-col items-center gap-5 max-w-lg bg-secondary/60 p-3 rounded-xl border backdrop-blur-[2px]">
              <div className="items-center flex flex-col w-max">
                <h1 className="text-[2rem] -mb-2 font-bold tracking-wider uppercase text-foreground dark:text-white">Bienvenido a la</h1>
                <Logo size="sm" />
              </div>
              <div className="w-full max-w-full flex flex-col gap-4 items-center p-3 bg-background/40 rounded-xl">
                <div className="self-start flex flex-col items-start w-max bg-gradient-to-tr from-blue-600 to-blue-400 py-2 px-3 rounded-md rounded-bl-none">
                  <p className="text-white/80">¡La penca de la <b>Copa América<br />2024</b> para estudiantes
                    <b> UCU! &#9917;</b><br /> </p>
                </div>
                <div className="self-end flex flex-col items-center w-max bg-gradient-to-tr from-foreground to-foreground/85 dark:from-neutral-300 dark:to-neutral-50 py-2 px-3 rounded-md rounded-br-none">
                  <p className="text-white dark:text-neutral-700 font-medium">¡<b>Primer y segundo puesto</b> <br /> participan por <b>premios</b>! &#127942;</p>
                </div>
              </div>
            </div>

          </div>
          <div className="w-1/2 h-full z-10 flex flex-col items-center justify-center py-10">
            <AuthForm />
          </div>
        </div>
      </div>
    </main>



  );
}
