import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [react(), babel({presets: [reactCompilerPreset()]}), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173, // 포트 고정
    strictPort: true, // 5173이 사용 중이면 서버를 띄우지 않음 (실수로 포트 바뀌는 것 방지)
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin-allow-popups",
      "Cross-Origin-Embedder-Policy": "unsafe-none", // 추가로 시도해 볼 만한 옵션
    },
  },
});