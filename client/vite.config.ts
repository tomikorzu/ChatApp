import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

const serverHost = "http://localhost:3000";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/socket.io": {
        target: serverHost,
        ws: true,
      },
    },
  },
});
