import { cleanup, render } from "@testing-library/svelte";
import { beforeEach, describe, expect, it } from "vitest";
import Layout from "./+layout.svelte";

describe("App Layout", () => {
	beforeEach(() => cleanup());

	it("should render", async () => {
		const { container } = render(Layout, { data: { accounts: [], currentAccount: undefined } });
		expect(container).toBeTruthy();
	});
});
