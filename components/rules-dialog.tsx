"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function RulesDialog() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Game Rules</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl bg-blue-950 border-blue-500/30 text-blue-100 max-h-[90vh] overflow-y-auto shadow-[0_0_30px_rgba(37,99,235,0.2)]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-yellow-500 gold-glow italic uppercase tracking-tighter">
                        How to Play Jeopardy!
                    </DialogTitle>
                    <DialogDescription className="text-blue-300">
                        Learn the rules and gameplay for Freepardy!.
                    </DialogDescription>
                </DialogHeader>

                <div className="mt-4">
                    <p className="text-sm text-blue-300/80 mb-4">
                        Select your preferred language below
                    </p>

                    <Tabs defaultValue="english" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 bg-blue-900/50">
                        <TabsTrigger value="english" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">English</TabsTrigger>
                        <TabsTrigger value="german" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Deutsch</TabsTrigger>
                    </TabsList>

                    <TabsContent value="english" className="space-y-4 mt-4 text-blue-100">
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-yellow-500/90 italic">
                                Game Board
                            </h3>

                            <p>
                                The game board consists of categories (columns)
                                and dollar values (rows). Each cell represents a
                                clue worth the corresponding dollar amount.
                            </p>

                            <h3 className="text-lg font-semibold">Gameplay</h3>
                            <ol className="list-decimal pl-5 space-y-2">
                                <li>Divide players into teams.</li>
                                <li>
                                    Teams take turns selecting a category and
                                    dollar value.
                                </li>
                                <li>
                                    When a clue is selected, it appears on
                                    screen.
                                </li>
                                <li>
                                    The team must phrase their answer in the
                                    form of a question (e.g., What is gravity?).
                                </li>
                                <li>
                                    If correct, the team earns the dollar value.
                                    If incorrect, they lose that amount.
                                </li>
                                <li>
                                    After all clues have been played, Final
                                    Jeopardy begins.
                                </li>
                            </ol>

                            <h3 className="text-lg font-semibold">
                                Final Jeopardy
                            </h3>
                            <p>In Final Jeopardy:</p>
                            <ol className="list-decimal pl-5 space-y-2">
                                <li>
                                    Teams are shown the category and must wager
                                    any amount of their current score.
                                </li>
                                <li>
                                    The clue is revealed, and teams have 15
                                    seconds to write their answer.
                                </li>
                                <li>
                                    Teams that answer correctly earn their wager
                                    amount; incorrect answers lose their wager.
                                </li>
                                <li>
                                    The team with the highest score at the end
                                    wins!
                                </li>
                            </ol>
                        </div>
                    </TabsContent>

                    <TabsContent value="german" className="space-y-4 mt-4">
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">
                                Spielbrett
                            </h3>
                            <p>
                                Das Spielbrett besteht aus Kategorien und
                                Punkten. Jede Zelle stellt einen Hinweis dar,
                                der dem entsprechenden Geldbetrag entspricht.
                            </p>

                            <h3 className="text-lg font-semibold">
                                Spielablauf
                            </h3>
                            <ol className="list-decimal pl-5 space-y-2">
                                <li>Teile die Spieler in Teams ein.</li>
                                <li>
                                    Die Teams wählen abwechselnd eine Kategorie
                                    und einen Punkt.
                                </li>
                                <li>
                                    Wenn ein Hinweis ausgewählt wird, erscheint
                                    er auf dem Bildschirm.
                                </li>
                                <li>
                                    Bei richtiger Antwort erhält das Team die
                                    Punkte. Bei falscher Antwort verlieren sie
                                    diesen Betrag.
                                </li>
                                <li>
                                    Nachdem alle Hinweise gespielt wurden,
                                    beginnt das Final Jeopardy.
                                </li>
                            </ol>

                            <h3 className="text-lg font-semibold">
                                Final Jeopardy
                            </h3>
                            <ol className="list-decimal pl-5 space-y-2">
                                <li>
                                    Den Teams wird die Kategorie gezeigt, und
                                    sie müssen einen beliebigen Betrag ihres
                                    aktuellen Punktestands setzen.
                                </li>
                                <li>
                                    Der Hinweis wird enthüllt, und die Teams
                                    haben 15 Sekunden Zeit, ihre Antwort zu
                                    schreiben.
                                </li>
                                <li>
                                    Teams, die richtig antworten, erhalten ihren
                                    Einsatzbetrag; falsche Antworten verlieren
                                    ihren Einsatz.
                                </li>
                                <li>
                                    Das Team mit der höchsten Punktzahl am Ende
                                    gewinnt!
                                </li>
                            </ol>
                        </div>
                    </TabsContent>
                </Tabs>
                </div>
            </DialogContent>
        </Dialog>
    );
}
