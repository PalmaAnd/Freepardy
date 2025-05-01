import type React from "react";
import "@/app/globals.css";
import { Inter } from "next/font/google";
import { GameDataProvider } from "@/hooks/use-game-data";

const inter = Inter({ subsets: ["latin"] });

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
            <body className={inter.className}>
                <GameDataProvider>{children}</GameDataProvider>
            </body>
        </html>
    );
}
