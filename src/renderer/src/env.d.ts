/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly R_VITE_SPOTIFY_CLIENT_ID: string
  readonly R_VITE_SPOTIFY_CLIENT_SECRET: string
  readonly R_VITE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
