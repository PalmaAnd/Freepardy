import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
            <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
            <h2 className="text-2xl font-semibold mb-6">Question Not Found</h2>
            <p className="text-lg mb-8 max-w-md">
                Sorry, the clue you`re looking for doesn`t exist in our Jeopardy
                board.
            </p>
            <Button asChild>
                <Link href="/">Return to Game Board</Link>
            </Button>
        </div>
    );
}
