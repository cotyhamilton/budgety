import { cleanup, render } from "@testing-library/svelte";
import { beforeEach, describe, expect, it } from "vitest";
import Boxes from "./+page.svelte";

describe("Boxes", () => {
	beforeEach(() => cleanup());

	it("should render", async () => {
		const { container } = render(Boxes);
		expect(container).toBeTruthy();
	});
});
