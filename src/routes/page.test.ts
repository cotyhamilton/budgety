import { cleanup, render } from "@testing-library/svelte";
import { beforeEach, describe, expect, it } from "vitest";
import Landing from "./+page.svelte";

describe("Landing", () => {
	beforeEach(() => cleanup());

	it("should render", async () => {
		const { container } = render(Landing);
		expect(container).toBeTruthy();
	});
});
