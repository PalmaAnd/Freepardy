import Link from "next/link";
import { Button } from "@/components/ui/button";
import GameBoard from "@/components/game-board";
import TeamScoring from "@/components/team-scoring";
import GameSettings from "@/components/game-settings";
import { Footer } from "@/components/footer";
import { RulesDialog } from "@/components/rules-dialog";

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            <div className="container mx-auto px-2 sm:px-4 py-6 sm:py-12 flex-grow">
                <header className="mb-8 sm:mb-12 flex flex-col items-center justify-center gap-6 text-center">
                    <div className="space-y-2">
                        <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tighter text-yellow-500 gold-glow uppercase italic">
                            Freepardy!
                        </h1>
                        <p className="text-blue-300 font-medium tracking-widest uppercase text-xs sm:text-sm">
                            The Ultimate Quiz Experience
                        </p>
                    </div>
                    
                    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 bg-blue-900/40 p-2 rounded-full border border-blue-500/30 backdrop-blur-sm">
                        <RulesDialog />
                        <div className="h-6 w-px bg-blue-500/30 mx-1 hidden sm:block" />
                        <Button variant="ghost" size="sm" asChild className="text-blue-200 hover:text-white hover:bg-blue-800/50">
                            <Link href="/admin">Admin Panel</Link>
                        </Button>
                        <GameSettings />
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-10">
                    <div className="lg:col-span-3">
                        <GameBoard />
                    </div>
                    <div className="lg:col-span-1">
                        <TeamScoring />
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
