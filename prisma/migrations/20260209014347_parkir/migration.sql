/*
  Warnings:

  - You are about to drop the `kategori` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `kategori`;

-- DropTable
DROP TABLE `user`;

-- CreateTable
CREATE TABLE `tb_user` (
    `id_user` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_lengkap` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('admin', 'petugas', 'owner') NOT NULL DEFAULT 'petugas',
    `status_aktif` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_log_aktivitas` (
    `id_log` INTEGER NOT NULL AUTO_INCREMENT,
    `id_user` INTEGER NOT NULL,
    `aktivitas` VARCHAR(191) NOT NULL,
    `waktu_aktivitas` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id_log`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_transaksi` (
    `id_parkir` INTEGER NOT NULL AUTO_INCREMENT,
    `id_kendaraan` INTEGER NOT NULL,
    `waktu_masuk` DATETIME(3) NOT NULL,
    `waktu_keluar` DATETIME(3) NOT NULL,
    `id_tarif` INTEGER NOT NULL,
    `durasi_jam` INTEGER NOT NULL,
    `biaya_total` INTEGER NOT NULL,
    `status` ENUM('masuk', 'keluar') NOT NULL DEFAULT 'masuk',
    `id_user` INTEGER NOT NULL,
    `id_area` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id_parkir`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_kendaraan` (
    `id_kendaraan` INTEGER NOT NULL AUTO_INCREMENT,
    `plat_nomor` VARCHAR(191) NOT NULL,
    `jenis_kendaraan` VARCHAR(191) NOT NULL,
    `warna` VARCHAR(191) NOT NULL,
    `pemilik` VARCHAR(191) NOT NULL,
    `id_user` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id_kendaraan`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_area_parkir` (
    `id_area` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_area` VARCHAR(191) NOT NULL,
    `kapasitas` INTEGER NOT NULL,
    `terisi` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id_area`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_tarif` (
    `id_tarif` INTEGER NOT NULL AUTO_INCREMENT,
    `jenis_kendaraan` ENUM('motor', 'mobil', 'lainnya') NOT NULL,
    `tarif_per_jam` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id_tarif`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tb_log_aktivitas` ADD CONSTRAINT `tb_log_aktivitas_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `tb_user`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_transaksi` ADD CONSTRAINT `tb_transaksi_id_kendaraan_fkey` FOREIGN KEY (`id_kendaraan`) REFERENCES `tb_kendaraan`(`id_kendaraan`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_transaksi` ADD CONSTRAINT `tb_transaksi_id_tarif_fkey` FOREIGN KEY (`id_tarif`) REFERENCES `tb_tarif`(`id_tarif`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_transaksi` ADD CONSTRAINT `tb_transaksi_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `tb_user`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_transaksi` ADD CONSTRAINT `tb_transaksi_id_area_fkey` FOREIGN KEY (`id_area`) REFERENCES `tb_area_parkir`(`id_area`) ON DELETE RESTRICT ON UPDATE CASCADE;
