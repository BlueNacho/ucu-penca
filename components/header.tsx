import Logo from "./logo";

export default function Header() {
    return (
        <header className="h-[4rem] flex w-full justify-center border-b border-neutral-300 bg-gradient-to-b from-neutral-200 py-2 backdrop-blur-2xl dark:border-neutral-800 dark:bg-neutral-800/30 dark:from-inherit">
            <Logo />
        </header>
    );
}