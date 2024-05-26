export default function Navbar() {
    return (
        <nav className="lg:hidden sticky top-3 w-full bg-neutral-400/20 rounded-lg p-1 flex flex-row gap-2 justify-between backdrop-blur-2xl mt-2">
            <div className="p-3 text-lg bg-background rounded-md w-1/3 text-center font-bold tracking-wide">Partidos</div>
            <div className="p-3 text-lg rounded-md w-1/3 text-center text-neutral-400 font-bold tracking-wide">Fixture</div>
            <div className="p-3 text-lg rounded-md w-1/3 text-center text-neutral-400 font-bold tracking-wide">Perfil</div>
        </nav>
    );
}