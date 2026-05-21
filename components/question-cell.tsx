"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface QuestionCellProps {
    value: number;
    used: boolean;
    disabled?: boolean;
    onClick: () => void;
}

export default function QuestionCell({
    value,
    used,
    disabled = false,
    onClick,
}: QuestionCellProps) {
    const isInactive = used || disabled;

    return (
        <motion.div
            whileHover={!isInactive ? { scale: 1.05, zIndex: 10 } : {}}
            whileTap={!isInactive ? { scale: 0.95 } : {}}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
            <Card
                className={cn(
                    "cursor-pointer transition-all duration-300 border-2",
                    isInactive
                        ? "bg-blue-900/20 text-blue-900/40 border-blue-900/30"
                        : "bg-blue-800 hover:bg-blue-700 text-yellow-500 border-blue-500/50 quiz-card-glow"
                )}
                onClick={!isInactive ? onClick : undefined}
            >
                <CardContent className="flex items-center justify-center p-1 sm:p-2 md:p-4 h-10 sm:h-14 md:h-20 lg:h-24">
                    <span className={cn(
                        "text-sm sm:text-lg md:text-xl lg:text-3xl font-black italic tracking-tighter",
                        !isInactive && "gold-glow"
                    )}>
                        {disabled ? "-" : `$${value}`}
                    </span>
                </CardContent>
            </Card>
        </motion.div>
    );
}
