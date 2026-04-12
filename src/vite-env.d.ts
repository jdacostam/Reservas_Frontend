/// <reference types="vite/client" />

declare module "*.css";

interface ImportMetaEnv {
    readonly VITE_API_BASE_URL: string;
    // Agrega más variables de entorno aquí según las necesites
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
