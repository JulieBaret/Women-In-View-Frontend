/// <reference types="vite/client" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_TMDB_API_KEY: string
  readonly VITE_TMDB_TOKEN: string
  readonly VITE_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}