import { createDirectus, authentication, rest } from "@directus/sdk";
import type { CustomDirectusTypes } from "./types";
export * from "@directus/sdk";

export const apiClient = (url: string) => {
	return createDirectus<CustomDirectusTypes>(url).with(authentication()).with(rest());
};

export type ApiClient = ReturnType<typeof apiClient>;
