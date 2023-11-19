import { cleanup, render } from "@testing-library/svelte";
import { beforeEach, describe, expect, it } from "vitest";
import CreateAccount from "./+page.svelte";

describe("Create Account", () => {
	beforeEach(() => cleanup());

	it("should render", async () => {
		const { container } = render(CreateAccount);
		expect(container).toBeTruthy();
	});
});
