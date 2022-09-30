/*
 Navicat Premium Data Transfer

 Source Server         : 120.48.133.248
 Source Server Type    : MySQL
 Source Server Version : 80029
 Source Host           : 120.48.133.248:3306
 Source Schema         : lg_work

 Target Server Type    : MySQL
 Target Server Version : 80029
 File Encoding         : 65001

 Date: 15/08/2022 23:10:37
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for lg_teacher
-- ----------------------------
DROP TABLE IF EXISTS `lg_teacher`;
CREATE TABLE `lg_teacher` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `level` varchar(255) DEFAULT NULL,
  `roomId` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

SET FOREIGN_KEY_CHECKS = 1;
