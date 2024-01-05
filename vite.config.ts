import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ["src/**/*.{test,spec}.{js,ts}"],
		coverage: {
			reporter: ["lcov", "text-summary"],
			reportsDirectory: "./test-results/coverage",
			include: ["src/**"],
			exclude: [
				"src/lib/components/ui/**",
				"src/lib/utils.ts",
				"**/*types.ts",
				"**/*.d.ts"
			]
		},
		reporters: ["junit", process.env.CI ? "dot" : "default"],
		outputFile: {
			junit: "./test-results/junit-report.xml",
		},
		environment: "jsdom"
	}
});
