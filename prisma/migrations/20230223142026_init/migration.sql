-- AlterTable
ALTER TABLE `ranklist` ADD COLUMN `contest_id` INTEGER NULL;

-- CreateTable
CREATE TABLE `userTable` (
    `handle` VARCHAR(255) NOT NULL,
    `organization` VARCHAR(255) NOT NULL,
    `fullName` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`handle`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
