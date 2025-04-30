"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

interface QuestionCellProps {
    value: number;
    used: boolean;
    onClick: () => void;
}

export default function QuestionCell({
    value,
    used,
    onClick,
}: QuestionCellProps) {
    return (
        <motion.div
            whileHover={!used ? { scale: 1.05 } : {}}
            whileTap={!used ? { scale: 0.95 } : {}}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
            <Card
                className={`cursor-pointer transition-colors ${
                    used
                        ? "bg-gray-300 text-gray-500"
                        : "bg-blue-500 hover:bg-blue-600 text-white"
                }`}
                onClick={!used ? onClick : undefined}
            >
                <CardContent className="flex items-center justify-center p-1 sm:p-2 md:p-4 h-10 sm:h-14 md:h-20 lg:h-24">
                    <span className="text-sm sm:text-lg md:text-xl lg:text-2xl font-bold">
                        ${value}
                    </span>
                </CardContent>
            </Card>
        </motion.div>
    );
}
