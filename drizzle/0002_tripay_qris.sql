ALTER TABLE `order` ADD COLUMN `payment_gateway` text DEFAULT 'tripay' NOT NULL;
--> statement-breakpoint
ALTER TABLE `order` ADD COLUMN `payment_reference` text;
--> statement-breakpoint
ALTER TABLE `order` ADD COLUMN `payment_channel` text DEFAULT 'QRIS' NOT NULL;
--> statement-breakpoint
ALTER TABLE `order` ADD COLUMN `payment_status` text DEFAULT 'unpaid' NOT NULL;
--> statement-breakpoint
ALTER TABLE `order` ADD COLUMN `payment_url` text;
--> statement-breakpoint
ALTER TABLE `order` ADD COLUMN `qr_string` text;
--> statement-breakpoint
ALTER TABLE `order` ADD COLUMN `qr_image_url` text;
--> statement-breakpoint
ALTER TABLE `order` ADD COLUMN `expired_at` integer;
--> statement-breakpoint
ALTER TABLE `order` ADD COLUMN `paid_at` integer;
--> statement-breakpoint
ALTER TABLE `order` ADD COLUMN `gateway_payload` text;
--> statement-breakpoint
CREATE UNIQUE INDEX `order_payment_reference_unique` ON `order` (`payment_reference`);
