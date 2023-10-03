import { describe, expect, it, beforeEach } from "vitest";
import { cleanup, render } from "@testing-library/svelte";
import Transactions from "./+page.svelte";

const data = {
	transactions: [
		{
			name: "Starbucks",
			amount: -799,
			date: "2023-09-24",
			box: {
				name: "😏 Fun"
			},
			financial_account: {
				name: "Chase",
				currency: {
					code: "USD",
					decimals: 2
				}
			}
		},
		{
			name: "Payday",
			amount: 2000,
			date: "2023-09-24",
			box: null,
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

describe("Transactions", () => {
	beforeEach(() => cleanup());

	it("should render", async () => {
		const { container } = render(Transactions, {
			data
		});
		expect(container).toBeTruthy();
	});
});
