ALTER TABLE transactions ADD `date` text DEFAULT CURRENT_DATE;--> statement-breakpoint
ALTER TABLE `transactions` DROP COLUMN `year`;--> statement-breakpoint
ALTER TABLE `transactions` DROP COLUMN `month`;--> statement-breakpoint
ALTER TABLE `transactions` DROP COLUMN `day`;