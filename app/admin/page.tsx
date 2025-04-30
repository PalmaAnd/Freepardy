"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CategoryEditor from "@/components/category-editor";
import ImportExport from "@/components/import-export";
import { useGameData } from "@/hooks/use-game-data";

export default function AdminPage() {
    useGameData();
    const [activeTab, setActiveTab] = useState("editor");

    return (
        <div className="container mx-auto px-4 py-8">
            <header className="mb-8 flex items-center justify-between">
                <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                    Freepardy Admin
                </h1>
                <Button variant="outline" asChild>
                    <Link href="/">Back to Game</Link>
                </Button>
            </header>

            <Card>
                <CardHeader>
                    <CardTitle>Game Configuration</CardTitle>
                    <CardDescription>
                        Create and manage your Freepardy categories and
                        questions
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs
                        defaultValue="editor"
                        onValueChange={setActiveTab}
                        value={activeTab}
                    >
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="editor">
                                Category Editor
                            </TabsTrigger>
                            <TabsTrigger value="import-export">
                                Import/Export
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="editor">
                            <CategoryEditor />
                        </TabsContent>
                        <TabsContent value="import-export">
                            <ImportExport />
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
}
