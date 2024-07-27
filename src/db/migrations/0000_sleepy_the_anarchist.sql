CREATE TABLE `User` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`username` varchar(100) NOT NULL,
	`email` varchar(100) NOT NULL,
	`password` varchar(100) NOT NULL,
	`role` enum('admin','user') NOT NULL DEFAULT 'user',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `User_id` PRIMARY KEY(`id`),
	CONSTRAINT `User_username_unique` UNIQUE(`username`),
	CONSTRAINT `User_email_unique` UNIQUE(`email`)
);
