export type Box = {
	balance: number;
	date_created?: string | null;
	date_updated?: string | null;
	financial_account: number | FinancialAccount;
	goal: number;
	id: number;
	name: string;
};

export type FinancialAccount = {
	id: number;
	name?: string | null;
	balance: number;
	currency_code: string;
	currency_decimals: number;
	date_created?: string | null;
	date_updated?: string | null;
};

export type Transaction = {
	amount?: number | null;
	box?: number | Box | null;
	year: number;
	month: number;
	day: number;
	date_created?: string | null;
	date_updated?: string | null;
	financial_account?: number | FinancialAccount | null;
	id: number;
	name: string;
};
