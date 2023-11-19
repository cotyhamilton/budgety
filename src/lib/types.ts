export type Box = {
	balance: number;
	date_created?: string | null;
	date_updated?: string | null;
	financial_account: number | FinancialAccount;
	goal: number;
	id: number;
	name: string;
};

export type Currency = {
	code: string;
	date_created?: string | null;
	date_updated?: string | null;
	decimals: number;
	id: number;
};

export type FinancialAccount = {
	currency?: number | Currency | null;
	date_created?: string | null;
	date_updated?: string | null;
	id: number;
	name?: string | null;
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
