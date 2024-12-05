/*
  Warnings:

  - You are about to drop the `store_mission` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `store_id` to the `mission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `store_name` to the `mission` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `store_mission` DROP FOREIGN KEY `store_mission_mission_id_fkey`;

-- DropForeignKey
ALTER TABLE `store_mission` DROP FOREIGN KEY `store_mission_store_id_fkey`;

-- AlterTable
ALTER TABLE `member` ADD COLUMN `test` INTEGER NULL,
    MODIFY `u_id` VARCHAR(200) NOT NULL,
    MODIFY `gender` VARCHAR(10) NULL;

-- AlterTable
ALTER TABLE `mission` ADD COLUMN `store_id` INTEGER NOT NULL,
    ADD COLUMN `store_name` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `store_mission`;

-- CreateTable
CREATE TABLE `session` (
    `id` VARCHAR(191) NOT NULL,
    `sid` VARCHAR(191) NOT NULL,
    `data` VARCHAR(512) NOT NULL,
    `expires_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `session_sid_key`(`sid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `store_id` ON `mission`(`store_id`);

-- AddForeignKey
ALTER TABLE `mission` ADD CONSTRAINT `mission_store_id_fkey` FOREIGN KEY (`store_id`) REFERENCES `store`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
