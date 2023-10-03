import { describe, expect, it, beforeEach } from "vitest";
import { cleanup, render } from "@testing-library/svelte";
import Currencies from "./+page.svelte";

const data = {
	currencies: [
		{
			code: "USD",
			decimals: 2
		}
	]
};

describe("Currencies", () => {
	beforeEach(() => cleanup());

	it("should render", async () => {
		const { container } = render(Currencies, {
			data
		});
		expect(container).toBeTruthy();
	});
});
