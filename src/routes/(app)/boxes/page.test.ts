import { describe, expect, it, beforeEach } from "vitest";
import { cleanup, render } from "@testing-library/svelte";
import Boxes from "./+page.svelte";

const data = {
	boxes: [
		{
			name: "😏 Fun",
			goal: 1000,
			balance: 500,
			financial_account: {
				name: "Chase",
				currency: {
					code: "USD",
					decimals: 2
				}
			}
		}
	]
};

describe("Boxes", () => {
	beforeEach(() => cleanup());

	it("should render", async () => {
		const { container } = render(Boxes, {
			data
		});
		expect(container).toBeTruthy();
	});
});
