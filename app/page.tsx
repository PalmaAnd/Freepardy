import Link from "next/link";
import { Button } from "@/components/ui/button";
import GameBoard from "@/components/game-board";
import TeamScoring from "@/components/team-scoring";
import GameSettings from "@/components/game-settings";

export default function Home() {
    return (
        <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
            <header className="mb-4 sm:mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center">
                    <h1 className="text-3xl sm:text-4xl font-bold text-blue-600">
                        Freepardy!
                    </h1>
                </div>
                <div className="flex gap-2 sm:gap-4">
                    <Button variant="outline" size="sm" asChild>
                        <Link href="/admin">Admin Panel</Link>
                    </Button>
                    <GameSettings />
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-8">
                <div className="lg:col-span-3">
                    <GameBoard />
                </div>
                <div className="lg:col-span-1">
                    <TeamScoring />
                </div>
            </div>
        </div>
    );
}
