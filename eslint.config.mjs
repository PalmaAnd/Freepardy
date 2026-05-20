import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";

const eslintConfig = [
    ...nextCoreWebVitals,
    ...nextTypeScript,
    {
        ignores: [
            ".next/**/*",
            "components/ui/**/*",
            "next-env.d.ts",
            "node_modules/**/*",
            "out/**/*",
        ],
    },
];

export default eslintConfig;
