import { Trophy } from "lucide-react";

export default function Logo({ size = 'nav' }: { size?: 'nav' | 'sm' }) {
    return (
        <>
            {size === 'nav' && (
                <div className="w-max flex flex-row items-start gap-1">
                    <p className="font-black tracking-normal flex flex-row bg-clip-text text-transparent bg-gradient-to-r text-5xl from-blue-600 to-blue-400">
                        UCU
                    </p>
                    <div className="flex flex-col w-max">
                        <p className="italic font-black tracking-wider flex flex-row text-2xl text-foreground dark:text-white">PENCA</p>
                        <div className="self-center -mt-1 bg-gradient-to-r from-blue-600/80 to-blue-400/80 rounded-full w-full text-center">
                            <p className="items-center text-xs font-black tracking-wider text-white">CA 2024</p>
                        </div>
                    </div>
                </div>
            )}

            {size === 'sm' && (
                <div className="w-max flex flex-col items-start">
                    <div className="inline-flex">
                        <p className="italic font-black tracking-wider flex flex-row text-7xl text-white">
                            <span className="flex not-italic flex-row bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
                                UCU&nbsp;
                            </span>
                            PENCA
                        </p>
                    </div>

                    <div className=" self-center bg-gradient-to-r from-blue-600 to-blue-400 rounded-full w-full text-center">
                        <p className="inline-flex items-center text-lg font-black tracking-wider text-white">Copa América 2024</p>
                    </div>

                </div>
            )}
        </>

    );
}