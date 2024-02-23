/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string
    readonly VITE_TMDB_API_KEY: string
    readonly VITE_TMDB_TOKEN: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}