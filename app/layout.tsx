import type React from "react";
import "@/app/globals.css";
import { GameDataProvider } from "@/hooks/use-game-data";

export const metadata = {
    title: "Freepardy",
    description:
        "A Jeopardy-style game board built with Next.js and Tailwind CSS",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="antialiased">
                <GameDataProvider>{children}</GameDataProvider>
            </body>
        </html>
    );
}
