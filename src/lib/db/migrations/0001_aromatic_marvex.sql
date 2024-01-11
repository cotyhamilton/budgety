ALTER TABLE transactions ADD `date` text DEFAULT CURRENT_DATE NOT NULL;--> statement-breakpoint
ALTER TABLE transactions ADD `adjustment` integer DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE `transactions` DROP COLUMN `year`;--> statement-breakpoint
ALTER TABLE `transactions` DROP COLUMN `month`;--> statement-breakpoint
ALTER TABLE `transactions` DROP COLUMN `day`;