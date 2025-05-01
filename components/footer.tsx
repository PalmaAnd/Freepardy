import { Github, Globe, HelpCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { RulesDialog } from "@/components/rules-dialog";

export function Footer() {
    return (
        <footer className="border-t mt-8">
            <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-4">
                        <Link
                            href="https://github.com/PalmaAnd/freepardy"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 hover:text-blue-600"
                        >
                            <Github className="h-5 w-5" />
                            <span>GitHub Repository</span>
                        </Link>
                        <Link
                            href="https://palma-andre.netlify.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 hover:text-blue-600"
                        >
                            <Globe className="h-5 w-5" />
                            <span>My Website</span>
                        </Link>
                        <div className="flex items-center gap-2 hover:text-blue-600 cursor-pointer">
                            <HelpCircle className="h-5 w-5" />
                            <RulesDialog />
                        </div>
                    </div>
                    <div className="flex gap-4 text-sm text-gray-500">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="link" size="sm">
                                    Privacy Policy
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-white">
                                <DialogHeader>
                                    <DialogTitle>Privacy Policy</DialogTitle>
                                    <DialogDescription>
                                        <div className="mt-4 space-y-4">
                                            <p>
                                                Last updated:{" "}
                                                {new Date().toLocaleDateString()}
                                            </p>
                                            <h3 className="text-lg font-semibold">
                                                1. Data Collection
                                            </h3>
                                            <p>
                                                This website does not collect
                                                any personal data. We do not use
                                                cookies or any other tracking
                                                mechanisms.
                                            </p>
                                            <h3 className="text-lg font-semibold">
                                                2. Usage Data
                                            </h3>
                                            <p>
                                                All interactions with this game
                                                happen locally in your browser.
                                                No data is sent to our servers.
                                            </p>
                                            <h3 className="text-lg font-semibold">
                                                3. Third-Party Services
                                            </h3>
                                            <p>
                                                This website is hosted on GitHub
                                                Pages and uses GitHub for
                                                version control. Please refer to
                                                their respective privacy
                                                policies for more information.
                                            </p>
                                        </div>
                                    </DialogDescription>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="link" size="sm">
                                    Terms of Service
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-white">
                                <DialogHeader>
                                    <DialogTitle>Terms of Service</DialogTitle>
                                    <DialogDescription>
                                        <div className="mt-4 space-y-4">
                                            <p>
                                                Last updated:{" "}
                                                {new Date().toLocaleDateString()}
                                            </p>
                                            <h3 className="text-lg font-semibold">
                                                1. License
                                            </h3>
                                            <p>
                                                This project is open source and
                                                available under the MIT License.
                                                You are free to use, modify, and
                                                distribute this software
                                                according to the terms of the
                                                license.
                                            </p>
                                            <h3 className="text-lg font-semibold">
                                                2. Disclaimer
                                            </h3>
                                            <p>
                                                This game is provided &quot;as
                                                is&quot; without warranty of any
                                                kind. The developers are not
                                                responsible for any decisions
                                                made based on this game.
                                            </p>
                                            <h3 className="text-lg font-semibold">
                                                3. Usage
                                            </h3>
                                            <p>
                                                You may use this tool for
                                                educational and commercial
                                                purposes. Attribution is
                                                appreciated but not required.
                                            </p>
                                        </div>
                                    </DialogDescription>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </div>
        </footer>
    );
}
