-- CreateTable
CREATE TABLE `CombineRankList` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `handle` VARCHAR(255) NOT NULL,
    `solve_count` INTEGER NOT NULL,
    `penalty` INTEGER NOT NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
