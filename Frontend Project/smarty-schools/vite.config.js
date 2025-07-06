import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": "/src", // this should match the alias in the jsconfig.json file
        },
    },
    server: {
        port: 3000,
    },
});
