// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		interface Error {
			id: string | undefined;
		}
		interface Locals {
			access_token: string | undefined;
			refresh_token: string | undefined;
			trace: string | undefined;
			logger: import("pino").Logger;
			apiClient: import("$lib/server/api").ApiClient;
			financial_account: number;
		}
		interface PageData {}
		interface Platform {}
	}
}

export {};
