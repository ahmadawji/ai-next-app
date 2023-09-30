import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react-swc"

// https://vitest.dev/config/#options
export default defineConfig({
  plugins: [react()],
  test: {
    include: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
    globals: true,
    environment: "jsdom",
    setupFiles: "setupTests", //run this file before each test
    mockReset: true, //This will clear mock history and reset its implementation to an empty function (will return undefined).
  },
})
