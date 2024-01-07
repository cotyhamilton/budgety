CREATE TABLE `boxes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`balance` integer NOT NULL,
	`goal` integer NOT NULL,
	`financial_account` integer NOT NULL,
	`date_created` text DEFAULT CURRENT_TIMESTAMP,
	`date_updated` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`financial_account`) REFERENCES `financial_accounts`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `financial_accounts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`currency_code` text NOT NULL,
	`currency_decimals` integer NOT NULL,
	`date_created` text DEFAULT CURRENT_TIMESTAMP,
	`date_updated` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `transactions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`amount` integer NOT NULL,
	`box` integer,
	`financial_account` integer,
	`year` integer NOT NULL,
	`month` integer NOT NULL,
	`day` integer NOT NULL,
	`date_created` text DEFAULT CURRENT_TIMESTAMP,
	`date_updated` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`box`) REFERENCES `boxes`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`financial_account`) REFERENCES `financial_accounts`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `financial_accounts_name_unique` ON `financial_accounts` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `financial_accounts_currency_code_unique` ON `financial_accounts` (`currency_code`);--> statement-breakpoint
CREATE UNIQUE INDEX `transactions_name_unique` ON `transactions` (`name`);--> statement-breakpoint
CREATE INDEX `amount_index` ON `transactions` (`amount`);