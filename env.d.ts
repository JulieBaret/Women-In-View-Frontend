/// <reference types="vite/client" />

import 'vite/client'

interface ImportMetaEnv {
    readonly VITE_API_URL: string
    readonly VITE_API_ROOT: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}