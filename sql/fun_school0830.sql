/*
Navicat MySQL Data Transfer

Source Server         : funschool
Source Server Version : 50045
Source Host           : localhost:3306
Source Database       : fun_school

Target Server Type    : MYSQL
Target Server Version : 50045
File Encoding         : 65001

Date: 2017-08-30 15:17:16
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `admin`
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `id` int(11) NOT NULL auto_increment,
  `account` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `create_time` datetime NOT NULL,
  `last_time` datetime NOT NULL,
  `last_login_ip` varchar(20) default NULL,
  `status` int(11) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES ('1', 'admin', 'a66abb5684c45962d887564f08346e8d', '2017-05-23 11:34:45', '2017-05-23 14:25:12', null, '1');

-- ----------------------------
-- Table structure for `attendance`
-- ----------------------------
DROP TABLE IF EXISTS `attendance`;
CREATE TABLE `attendance` (
  `id` int(11) NOT NULL auto_increment,
  `create_time` datetime NOT NULL,
  `studentID` int(11) NOT NULL,
  `subjectID` int(11) NOT NULL,
  `classID` int(11) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of attendance
-- ----------------------------

-- ----------------------------
-- Table structure for `class`
-- ----------------------------
DROP TABLE IF EXISTS `class`;
CREATE TABLE `class` (
  `id` int(11) NOT NULL auto_increment,
  `name` varchar(50) NOT NULL,
  `code` varchar(10) NOT NULL,
  `create_time` datetime NOT NULL,
  `schoolID` int(11) NOT NULL,
  `gradeID` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of class
-- ----------------------------
INSERT INTO `class` VALUES ('1', '09软件设计', '1001', '2017-05-26 10:47:19', '1', '1', '1');
INSERT INTO `class` VALUES ('2', '10网络主播', '1002', '2017-05-26 10:47:40', '1', '2', '1');

-- ----------------------------
-- Table structure for `class_students_ref`
-- ----------------------------
DROP TABLE IF EXISTS `class_students_ref`;
CREATE TABLE `class_students_ref` (
  `id` int(11) NOT NULL auto_increment,
  `classID` int(11) default NULL,
  `studentID` int(11) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of class_students_ref
-- ----------------------------
INSERT INTO `class_students_ref` VALUES ('1', '1', '1');

-- ----------------------------
-- Table structure for `class_teachers_ref`
-- ----------------------------
DROP TABLE IF EXISTS `class_teachers_ref`;
CREATE TABLE `class_teachers_ref` (
  `id` int(11) NOT NULL auto_increment,
  `classID` int(11) default NULL,
  `teacherID` int(11) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of class_teachers_ref
-- ----------------------------
INSERT INTO `class_teachers_ref` VALUES ('1', '1', '1');
INSERT INTO `class_teachers_ref` VALUES ('2', '2', '2');
INSERT INTO `class_teachers_ref` VALUES ('3', '2', '3');

-- ----------------------------
-- Table structure for `content`
-- ----------------------------
DROP TABLE IF EXISTS `content`;
CREATE TABLE `content` (
  `id` int(11) NOT NULL auto_increment,
  `create_time` datetime NOT NULL,
  `last_time` datetime default NULL,
  `content` varchar(1000) NOT NULL,
  `title` varchar(50) default NULL,
  `type` int(11) default NULL,
  `status` int(11) NOT NULL,
  `userID` int(11) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of content
-- ----------------------------
INSERT INTO `content` VALUES ('1', '2017-06-16 16:22:22', '2017-06-16 16:40:48', '<p>这是一款老师跟学生和家长之间的互动应用，非常有趣的哟<img src=\"http://127.0.0.1:3000/images/201752041/1497601127931.jpg\"></p>', '应用简介', null, '1', null);

-- ----------------------------
-- Table structure for `information`
-- ----------------------------
DROP TABLE IF EXISTS `information`;
CREATE TABLE `information` (
  `id` int(11) NOT NULL auto_increment,
  `content` varchar(200) NOT NULL,
  `last_time` datetime default NULL,
  `create_time` datetime NOT NULL,
  `fromType` int(11) NOT NULL,
  `userID` int(11) default NULL,
  `status` int(11) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of information
-- ----------------------------
INSERT INTO `information` VALUES ('5', '哟呵，你说这有意思吧', '2017-06-20 15:54:16', '2017-06-20 15:52:49', '1', '1', '1');
INSERT INTO `information` VALUES ('6', '呵呵，确实挺有意思的', null, '2017-06-20 15:53:02', '1', '1', '1');
INSERT INTO `information` VALUES ('7', '这是教师发布的', '2017-06-20 17:25:28', '2017-06-20 17:25:36', '2', '1', '1');

-- ----------------------------
-- Table structure for `login`
-- ----------------------------
DROP TABLE IF EXISTS `login`;
CREATE TABLE `login` (
  `id` int(11) NOT NULL auto_increment,
  `create_time` datetime NOT NULL,
  `from` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `last_login_ip` varchar(25) default NULL,
  `last_login_num` int(11) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of login
-- ----------------------------

-- ----------------------------
-- Table structure for `login_token`
-- ----------------------------
DROP TABLE IF EXISTS `login_token`;
CREATE TABLE `login_token` (
  `id` int(11) NOT NULL auto_increment,
  `account` varchar(50) NOT NULL,
  `token` varchar(500) NOT NULL,
  `token_key` varchar(100) NOT NULL,
  `type` int(11) NOT NULL,
  `last_time` datetime default NULL,
  `status` int(11) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of login_token
-- ----------------------------
INSERT INTO `login_token` VALUES ('1', 'admin', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiYWNjb3VudCI6ImFkbWluIiwiY3JlYXRlX3RpbWUiOiIyMDE3LTA', 'YWRtaW4=', '4', '2017-05-24 14:07:50', '0');
INSERT INTO `login_token` VALUES ('2', 'admin', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiYWNjb3VudCI6ImFkbWluIiwiY3JlYXRlX3RpbWUiOiIyMDE3LTA1LTIzVDAzOjM0OjQ1LjAwMFoiLCJsYXN0X3RpbWUiOiIyMDE3LTA1LTIzVDA2OjI1OjEyLjAwMFoiLCJsYXN0X2xvZ2luX2lwIjpudWxsLCJzdGF0dXMiOjEsImlhdCI6MTQ5NTYwNjQwNSwiZXhwIjoyOTkxMjk5MjEwfQ.I_t0Q63xl5NSgCoveXYtHGTkWODtTSUrIb0t5uKHeu0', 'YWRtaW4=', '4', '2017-05-24 14:13:25', '0');
INSERT INTO `login_token` VALUES ('3', 'admin', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiYWNjb3VudCI6ImFkbWluIiwiY3JlYXRlX3RpbWUiOiIyMDE3LTA1LTIzVDAzOjM0OjQ1LjAwMFoiLCJsYXN0X3RpbWUiOiIyMDE3LTA1LTIzVDA2OjI1OjEyLjAwMFoiLCJsYXN0X2xvZ2luX2lwIjpudWxsLCJzdGF0dXMiOjEsImlhdCI6MTQ5NTYwNjQyMiwiZXhwIjoyOTkxMjk5MjQ0fQ.Se_NgKpuQ9Wc-QXU188hGH1afEE3SjKDFlP6_DeS81w', 'YWRtaW4=', '4', '2017-05-24 14:13:42', '0');
INSERT INTO `login_token` VALUES ('4', 'admin', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiYWNjb3VudCI6ImFkbWluIiwiY3JlYXRlX3RpbWUiOiIyMDE3LTA1LTIzVDAzOjM0OjQ1LjAwMFoiLCJsYXN0X3RpbWUiOiIyMDE3LTA1LTIzVDA2OjI1OjEyLjAwMFoiLCJsYXN0X2xvZ2luX2lwIjpudWxsLCJzdGF0dXMiOjEsImlhdCI6MTQ5NTcwMzEzNSwiZXhwIjoyOTkxNDkyNjcwfQ.iuc55MZIx9kQfwRyVuoldo6FxU0z3ooa-z3e0B2eeoI', 'YWRtaW4=', '4', '2017-05-25 17:05:35', '0');
INSERT INTO `login_token` VALUES ('5', 'admin', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiYWNjb3VudCI6ImFkbWluIiwiY3JlYXRlX3RpbWUiOiIyMDE3LTA1LTIzVDAzOjM0OjQ1LjAwMFoiLCJsYXN0X3RpbWUiOiIyMDE3LTA1LTIzVDA2OjI1OjEyLjAwMFoiLCJsYXN0X2xvZ2luX2lwIjpudWxsLCJzdGF0dXMiOjEsImlhdCI6MTQ5Njc0MDcxNywiZXhwIjoyOTkzNTY3ODM0fQ.U-H0n3b6Z1yTego6z8gt-GaHJ39Ofm81kVanv26PpTg', 'YWRtaW4=', '4', '2017-06-06 17:18:37', '0');
INSERT INTO `login_token` VALUES ('6', 'admin', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiYWNjb3VudCI6ImFkbWluIiwiY3JlYXRlX3RpbWUiOiIyMDE3LTA1LTIzVDAzOjM0OjQ1LjAwMFoiLCJsYXN0X3RpbWUiOiIyMDE3LTA1LTIzVDA2OjI1OjEyLjAwMFoiLCJsYXN0X2xvZ2luX2lwIjpudWxsLCJzdGF0dXMiOjEsImlhdCI6MTQ5Njc0MjM5OSwiZXhwIjoyOTkzNTcxMTk4fQ.Jfo6Vr5zDyVzDMEWPYAV93szs3iM5GEC5Dg749LwUYE', 'YWRtaW4=', '4', '2017-06-06 17:46:39', '0');
INSERT INTO `login_token` VALUES ('7', 'admin', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiYWNjb3VudCI6ImFkbWluIiwiY3JlYXRlX3RpbWUiOiIyMDE3LTA1LTIzVDAzOjM0OjQ1LjAwMFoiLCJsYXN0X3RpbWUiOiIyMDE3LTA1LTIzVDA2OjI1OjEyLjAwMFoiLCJsYXN0X2xvZ2luX2lwIjpudWxsLCJzdGF0dXMiOjEsImlhdCI6MTQ5Njc0MjQ2OSwiZXhwIjoyOTkzNTcxMzM4fQ.D_Y4DdCynVpYEDRjVfnBkbTd3Jyhjb0ZU-VIUcJoSMk', 'YWRtaW4=', '4', '2017-06-06 17:47:49', '0');
INSERT INTO `login_token` VALUES ('8', 'admin', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiYWNjb3VudCI6ImFkbWluIiwiY3JlYXRlX3RpbWUiOiIyMDE3LTA1LTIzVDAzOjM0OjQ1LjAwMFoiLCJsYXN0X3RpbWUiOiIyMDE3LTA1LTIzVDA2OjI1OjEyLjAwMFoiLCJsYXN0X2xvZ2luX2lwIjpudWxsLCJzdGF0dXMiOjEsImlhdCI6MTQ5NjgwMTA3NywiZXhwIjoyOTkzNjg4NTU0fQ.fFo9SPnZ8R75O0Ht8A8_G3r5nQDMu7qn3c6k72dkm48', 'YWRtaW4=', '4', '2017-06-07 10:04:37', '0');
INSERT INTO `login_token` VALUES ('9', 'admin', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiYWNjb3VudCI6ImFkbWluIiwiY3JlYXRlX3RpbWUiOiIyMDE3LTA1LTIzVDAzOjM0OjQ1LjAwMFoiLCJsYXN0X3RpbWUiOiIyMDE3LTA1LTIzVDA2OjI1OjEyLjAwMFoiLCJsYXN0X2xvZ2luX2lwIjpudWxsLCJzdGF0dXMiOjEsImlhdCI6MTQ5NjgwMTgwNCwiZXhwIjoyOTkzNjkwMDA4fQ.y_L3seOk36fu9f3Jh88rECSUeZPAXRllOZ8kxTbTQ58', 'YWRtaW4=', '4', '2017-06-07 10:16:44', '0');
INSERT INTO `login_token` VALUES ('10', 'admin', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiYWNjb3VudCI6ImFkbWluIiwiY3JlYXRlX3RpbWUiOiIyMDE3LTA1LTIzVDAzOjM0OjQ1LjAwMFoiLCJsYXN0X3RpbWUiOiIyMDE3LTA1LTIzVDA2OjI1OjEyLjAwMFoiLCJsYXN0X2xvZ2luX2lwIjpudWxsLCJzdGF0dXMiOjEsImlhdCI6MTQ5NjgwMzkzMiwiZXhwIjoyOTkzNjk0MjY0fQ.kVJtbXp-ZFCqvvqqlbrYc58WJ9cUXdPn2VwMQpKkj9c', 'YWRtaW4=', '4', '2017-06-07 10:52:12', '0');
INSERT INTO `login_token` VALUES ('11', 'admin', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiYWNjb3VudCI6ImFkbWluIiwiY3JlYXRlX3RpbWUiOiIyMDE3LTA1LTIzVDAzOjM0OjQ1LjAwMFoiLCJsYXN0X3RpbWUiOiIyMDE3LTA1LTIzVDA2OjI1OjEyLjAwMFoiLCJsYXN0X2xvZ2luX2lwIjpudWxsLCJzdGF0dXMiOjEsImlhdCI6MTQ5NjgwMzk3OCwiZXhwIjoyOTkzNjk0MzU2fQ.zIK_eX1WT42lin_vWgybo2EnBGwI8zDb4dBPCFMqbyY', 'YWRtaW4=', '4', '2017-06-07 10:52:58', '0');
INSERT INTO `login_token` VALUES ('12', 'admin', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiYWNjb3VudCI6ImFkbWluIiwiY3JlYXRlX3RpbWUiOiIyMDE3LTA1LTIzVDAzOjM0OjQ1LjAwMFoiLCJsYXN0X3RpbWUiOiIyMDE3LTA1LTIzVDA2OjI1OjEyLjAwMFoiLCJsYXN0X2xvZ2luX2lwIjpudWxsLCJzdGF0dXMiOjEsImlhdCI6MTQ5NjgwNjczMiwiZXhwIjoyOTkzNjk5ODY0fQ.UVuoA7A09ox4U8Xfl9I1ZdwvRrdXre00rzT0URuJajI', 'YWRtaW4=', '4', '2017-06-07 11:38:52', '0');
INSERT INTO `login_token` VALUES ('13', 'admin', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiYWNjb3VudCI6ImFkbWluIiwiY3JlYXRlX3RpbWUiOiIyMDE3LTA1LTIzVDAzOjM0OjQ1LjAwMFoiLCJsYXN0X3RpbWUiOiIyMDE3LTA1LTIzVDA2OjI1OjEyLjAwMFoiLCJsYXN0X2xvZ2luX2lwIjpudWxsLCJzdGF0dXMiOjEsImlhdCI6MTQ5NjgwNjkwNSwiZXhwIjoyOTkzNzAwMjEwfQ._ceRMjgpy5hDFtIe55t4AJMAstAFj-7MHptN5PGoU_U', 'YWRtaW4=', '4', '2017-06-07 11:41:45', '0');
INSERT INTO `login_token` VALUES ('14', 'admin', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiYWNjb3VudCI6ImFkbWluIiwiY3JlYXRlX3RpbWUiOiIyMDE3LTA1LTIzVDAzOjM0OjQ1LjAwMFoiLCJsYXN0X3RpbWUiOiIyMDE3LTA1LTIzVDA2OjI1OjEyLjAwMFoiLCJsYXN0X2xvZ2luX2lwIjpudWxsLCJzdGF0dXMiOjEsImlhdCI6MTQ5NjgwNzAzMCwiZXhwIjoyOTkzNzAwNDYwfQ.WBsb5h5OepxrYVZjky32VA7SkNlCb9G4SetkfS2uuME', 'YWRtaW4=', '4', '2017-06-07 11:43:50', '0');
INSERT INTO `login_token` VALUES ('15', 'admin', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiYWNjb3VudCI6ImFkbWluIiwiY3JlYXRlX3RpbWUiOiIyMDE3LTA1LTIzVDAzOjM0OjQ1LjAwMFoiLCJsYXN0X3RpbWUiOiIyMDE3LTA1LTIzVDA2OjI1OjEyLjAwMFoiLCJsYXN0X2xvZ2luX2lwIjpudWxsLCJzdGF0dXMiOjEsImlhdCI6MTQ5NjgwNzA5NiwiZXhwIjoyOTkzNzAwNTkyfQ.rHbfBku5ovrWrcTjnsgwm3Sqhy9WA1mx8YX1Lr4W5e0', 'YWRtaW4=', '4', '2017-06-07 11:44:56', '0');
INSERT INTO `login_token` VALUES ('16', 'admin', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiYWNjb3VudCI6ImFkbWluIiwiY3JlYXRlX3RpbWUiOiIyMDE3LTA1LTIzVDAzOjM0OjQ1LjAwMFoiLCJsYXN0X3RpbWUiOiIyMDE3LTA1LTIzVDA2OjI1OjEyLjAwMFoiLCJsYXN0X2xvZ2luX2lwIjpudWxsLCJzdGF0dXMiOjEsImlhdCI6MTQ5NjgwNzI0OSwiZXhwIjoyOTkzNzAwODk4fQ.KhksLdbRbEsn0_NfHtMOyvCTAKbjJKAjqNFDVlocfwQ', 'YWRtaW4=', '4', '2017-06-07 11:47:29', '0');
INSERT INTO `login_token` VALUES ('17', 'admin', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiYWNjb3VudCI6ImFkbWluIiwiY3JlYXRlX3RpbWUiOiIyMDE3LTA1LTIzVDAzOjM0OjQ1LjAwMFoiLCJsYXN0X3RpbWUiOiIyMDE3LTA1LTIzVDA2OjI1OjEyLjAwMFoiLCJsYXN0X2xvZ2luX2lwIjpudWxsLCJzdGF0dXMiOjEsImlhdCI6MTQ5NjgwNzU1MSwiZXhwIjoyOTkzNzAxNTAyfQ.d4PAdv6OjXYRRYox6KMs4HbqMvHsNh6et6jJ7dLYMfY', 'YWRtaW4=', '4', '2017-06-07 11:52:31', '0');
INSERT INTO `login_token` VALUES ('18', 'admin', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiYWNjb3VudCI6ImFkbWluIiwiY3JlYXRlX3RpbWUiOiIyMDE3LTA1LTIzVDAzOjM0OjQ1LjAwMFoiLCJsYXN0X3RpbWUiOiIyMDE3LTA1LTIzVDA2OjI1OjEyLjAwMFoiLCJsYXN0X2xvZ2luX2lwIjpudWxsLCJzdGF0dXMiOjEsImlhdCI6MTQ5NjgwNzg4MiwiZXhwIjoyOTkzNzAyMTY0fQ.j5gUqDDu9tc0nRAT_OHQHFu3A690_uzZLn4tiXfBDBc', 'YWRtaW4=', '4', '2017-06-07 11:58:02', '0');
INSERT INTO `login_token` VALUES ('19', 'admin', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiYWNjb3VudCI6ImFkbWluIiwiY3JlYXRlX3RpbWUiOiIyMDE3LTA1LTIzVDAzOjM0OjQ1LjAwMFoiLCJsYXN0X3RpbWUiOiIyMDE3LTA1LTIzVDA2OjI1OjEyLjAwMFoiLCJsYXN0X2xvZ2luX2lwIjpudWxsLCJzdGF0dXMiOjEsImlhdCI6MTQ5NjgxNjcyNiwiZXhwIjoyOTkzNzE5ODUyfQ.lbFqoPt3OlDfkmaJn9x0BtY8QOIeTCR96IgD-LsHT1w', 'YWRtaW4=', '4', '2017-06-07 14:25:26', '0');
INSERT INTO `login_token` VALUES ('20', 'admin', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiYWNjb3VudCI6ImFkbWluIiwiY3JlYXRlX3RpbWUiOiIyMDE3LTA1LTIzVDAzOjM0OjQ1LjAwMFoiLCJsYXN0X3RpbWUiOiIyMDE3LTA1LTIzVDA2OjI1OjEyLjAwMFoiLCJsYXN0X2xvZ2luX2lwIjpudWxsLCJzdGF0dXMiOjEsImlhdCI6MTQ5NjgxNjk5NiwiZXhwIjoyOTkzNzIwMzkyfQ.DxgtCbM-UDTE275jvkSSSb8s1NSsqL-MURv7J9vEuu8', 'YWRtaW4=', '4', '2017-06-07 14:29:56', '0');
INSERT INTO `login_token` VALUES ('21', 'admin', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiYWNjb3VudCI6ImFkbWluIiwiY3JlYXRlX3RpbWUiOiIyMDE3LTA1LTIzVDAzOjM0OjQ1LjAwMFoiLCJsYXN0X3RpbWUiOiIyMDE3LTA1LTIzVDA2OjI1OjEyLjAwMFoiLCJsYXN0X2xvZ2luX2lwIjpudWxsLCJzdGF0dXMiOjEsImlhdCI6MTQ5Njg4NjY5NCwiZXhwIjoyOTkzODU5Nzg4fQ.0fZ8lDbVZg1yAzMwprvwp09lI32JUKWgqOIwEEo9d_g', 'YWRtaW4=', '4', '2017-06-08 09:51:34', '0');
INSERT INTO `login_token` VALUES ('22', 'admin', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiYWNjb3VudCI6ImFkbWluIiwiY3JlYXRlX3RpbWUiOiIyMDE3LTA1LTIzVDAzOjM0OjQ1LjAwMFoiLCJsYXN0X3RpbWUiOiIyMDE3LTA1LTIzVDA2OjI1OjEyLjAwMFoiLCJsYXN0X2xvZ2luX2lwIjpudWxsLCJzdGF0dXMiOjEsImlhdCI6MTQ5Njk3NDU0NCwiZXhwIjoyOTk0MDM1NDg4fQ.ZE7kK_k8A6nkzj0f3C3KJawbQDmXtf0rN7fLgF02Dkw', 'YWRtaW4=', '4', '2017-06-09 10:15:44', '0');
INSERT INTO `login_token` VALUES ('23', 'admin', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiYWNjb3VudCI6ImFkbWluIiwiY3JlYXRlX3RpbWUiOiIyMDE3LTA1LTIzVDAzOjM0OjQ1LjAwMFoiLCJsYXN0X3RpbWUiOiIyMDE3LTA1LTIzVDA2OjI1OjEyLjAwMFoiLCJsYXN0X2xvZ2luX2lwIjpudWxsLCJzdGF0dXMiOjEsImlhdCI6MTQ5NzI0NzMwOCwiZXhwIjoyOTk0NTgxMDE2fQ.W-4wLvfU3Qg2GYVej-79DHAR5UCTyGsWX1VhbUnUYbE', 'YWRtaW4=', '4', '2017-06-12 14:01:48', '0');
INSERT INTO `login_token` VALUES ('24', 'admin', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiYWNjb3VudCI6ImFkbWluIiwiY3JlYXRlX3RpbWUiOiIyMDE3LTA1LTIzVDAzOjM0OjQ1LjAwMFoiLCJsYXN0X3RpbWUiOiIyMDE3LTA1LTIzVDA2OjI1OjEyLjAwMFoiLCJsYXN0X2xvZ2luX2lwIjpudWxsLCJzdGF0dXMiOjEsImlhdCI6MTQ5NzMyNTkyNSwiZXhwIjoyOTk0NzM4MjUwfQ.01QkfeMUI3AYHzNWORZSEeagesXzT3ncXuDpodhyt_A', 'YWRtaW4=', '4', '2017-06-13 11:52:05', '0');
INSERT INTO `login_token` VALUES ('25', 'admin', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiYWNjb3VudCI6ImFkbWluIiwiY3JlYXRlX3RpbWUiOiIyMDE3LTA1LTIzVDAzOjM0OjQ1LjAwMFoiLCJsYXN0X3RpbWUiOiIyMDE3LTA1LTIzVDA2OjI1OjEyLjAwMFoiLCJsYXN0X2xvZ2luX2lwIjpudWxsLCJzdGF0dXMiOjEsImlhdCI6MTQ5NzQyNzg4MywiZXhwIjoyOTk0OTQyMTY2fQ.jEDzTKZ7zzkFmXfKFd5xFqbke8tb-NXETp3hnT7h2Do', 'YWRtaW4=', '4', '2017-06-14 16:11:24', '0');
INSERT INTO `login_token` VALUES ('26', 'admin', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiYWNjb3VudCI6ImFkbWluIiwiY3JlYXRlX3RpbWUiOiIyMDE3LTA1LTIzVDAzOjM0OjQ1LjAwMFoiLCJsYXN0X3RpbWUiOiIyMDE3LTA1LTIzVDA2OjI1OjEyLjAwMFoiLCJsYXN0X2xvZ2luX2lwIjpudWxsLCJzdGF0dXMiOjEsImlhdCI6MTQ5NzQ5MjMzNiwiZXhwIjoyOTk1MDcxMDcyfQ.MdwBb9tmEhEs2RyddZS6b2YTme3BZwmgMmNW23Ufdwc', 'YWRtaW4=', '4', '2017-06-15 10:05:36', '0');
INSERT INTO `login_token` VALUES ('27', 'admin', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiYWNjb3VudCI6ImFkbWluIiwiY3JlYXRlX3RpbWUiOiIyMDE3LTA1LTIzVDAzOjM0OjQ1LjAwMFoiLCJsYXN0X3RpbWUiOiIyMDE3LTA1LTIzVDA2OjI1OjEyLjAwMFoiLCJsYXN0X2xvZ2luX2lwIjpudWxsLCJzdGF0dXMiOjEsInVzZXJUeXBlIjo0LCJpYXQiOjE0OTc1MTY0NTcsImV4cCI6Mjk5NTExOTMxNH0.uBsMeV0E6P8FNiz8h22PQ4UukXgQqoeNjAEvwS82OMk', 'YWRtaW4=', '4', '2017-06-15 16:47:38', '0');
INSERT INTO `login_token` VALUES ('28', 'admin', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiYWNjb3VudCI6ImFkbWluIiwiY3JlYXRlX3RpbWUiOiIyMDE3LTA1LTIzVDAzOjM0OjQ1LjAwMFoiLCJsYXN0X3RpbWUiOiIyMDE3LTA1LTIzVDA2OjI1OjEyLjAwMFoiLCJsYXN0X2xvZ2luX2lwIjpudWxsLCJzdGF0dXMiOjEsInVzZXJUeXBlIjo0LCJpYXQiOjE0OTc1OTUzNzUsImV4cCI6Mjk5NTI3NzE1MH0.8WTTsXB9AAZHZnhrCbmEBt6ziisqgT6UAWUpegZi29g', 'YWRtaW4=', '4', '2017-06-16 14:42:56', '0');
INSERT INTO `login_token` VALUES ('29', 'admin', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiYWNjb3VudCI6ImFkbWluIiwiY3JlYXRlX3RpbWUiOiIyMDE3LTA1LTIzVDAzOjM0OjQ1LjAwMFoiLCJsYXN0X3RpbWUiOiIyMDE3LTA1LTIzVDA2OjI1OjEyLjAwMFoiLCJsYXN0X2xvZ2luX2lwIjpudWxsLCJzdGF0dXMiOjEsInVzZXJUeXBlIjo0LCJpYXQiOjE0OTc5NDA2ODUsImV4cCI6Mjk5NTk2Nzc3MH0.Gr3bCdJIPmzNAVE8Uj56EP_RHzVMjfH1iY6OG85E4cQ', 'YWRtaW4=', '4', '2017-06-20 14:38:05', '0');
INSERT INTO `login_token` VALUES ('30', 'admin', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiYWNjb3VudCI6ImFkbWluIiwiY3JlYXRlX3RpbWUiOiIyMDE3LTA1LTIzVDAzOjM0OjQ1LjAwMFoiLCJsYXN0X3RpbWUiOiIyMDE3LTA1LTIzVDA2OjI1OjEyLjAwMFoiLCJsYXN0X2xvZ2luX2lwIjpudWxsLCJzdGF0dXMiOjEsInVzZXJUeXBlIjo0LCJpYXQiOjE0OTgwMzUwNDYsImV4cCI6Mjk5NjE1NjQ5Mn0.HAEok-T7AaeNUjxVa9YFouLbRug8rpXxYnX7bpKWz2c', 'YWRtaW4=', '4', '2017-06-21 16:50:46', '0');
INSERT INTO `login_token` VALUES ('31', 'admin', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiYWNjb3VudCI6ImFkbWluIiwiY3JlYXRlX3RpbWUiOiIyMDE3LTA1LTIzVDAzOjM0OjQ1LjAwMFoiLCJsYXN0X3RpbWUiOiIyMDE3LTA1LTIzVDA2OjI1OjEyLjAwMFoiLCJsYXN0X2xvZ2luX2lwIjpudWxsLCJzdGF0dXMiOjEsInVzZXJUeXBlIjo0LCJpYXQiOjE0OTgxMTE5NjcsImV4cCI6Mjk5NjMxMDMzNH0.NPXxp05NgyZgfrUad8U6WCaMlxV4qbKhDmC3DAM9pco', 'YWRtaW4=', '4', '2017-06-22 14:12:47', '0');
INSERT INTO `login_token` VALUES ('32', 'admin', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiYWNjb3VudCI6ImFkbWluIiwiY3JlYXRlX3RpbWUiOiIyMDE3LTA1LTIzVDAzOjM0OjQ1LjAwMFoiLCJsYXN0X3RpbWUiOiIyMDE3LTA1LTIzVDA2OjI1OjEyLjAwMFoiLCJsYXN0X2xvZ2luX2lwIjpudWxsLCJzdGF0dXMiOjEsInVzZXJUeXBlIjo0LCJpYXQiOjE0OTgxOTE4NjgsImV4cCI6Mjk5NjQ3MDEzNn0.vVLrlL5z9ED9qzcjrLQqFeD0o2B22n8EFzYbFIc5YDE', 'YWRtaW4=', '4', '2017-06-23 12:24:28', '0');
INSERT INTO `login_token` VALUES ('33', 'admin', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiYWNjb3VudCI6ImFkbWluIiwiY3JlYXRlX3RpbWUiOiIyMDE3LTA1LTIzVDAzOjM0OjQ1LjAwMFoiLCJsYXN0X3RpbWUiOiIyMDE3LTA1LTIzVDA2OjI1OjEyLjAwMFoiLCJsYXN0X2xvZ2luX2lwIjpudWxsLCJzdGF0dXMiOjEsInVzZXJUeXBlIjo0LCJpYXQiOjE0OTgyMTA1NDIsImV4cCI6Mjk5NjUwNzQ4NH0.VWD7WuwyqrATPzd5T4CaeMN7ylIHqKezGA6A7GslvgA', 'YWRtaW4=', '4', '2017-06-23 17:35:43', '0');
INSERT INTO `login_token` VALUES ('34', 'admin', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiYWNjb3VudCI6ImFkbWluIiwiY3JlYXRlX3RpbWUiOiIyMDE3LTA1LTIzVDAzOjM0OjQ1LjAwMFoiLCJsYXN0X3RpbWUiOiIyMDE3LTA1LTIzVDA2OjI1OjEyLjAwMFoiLCJsYXN0X2xvZ2luX2lwIjpudWxsLCJzdGF0dXMiOjEsInVzZXJUeXBlIjo0LCJpYXQiOjE0OTgyMTA2MzMsImV4cCI6Mjk5NjUwNzY2Nn0.uJsEADAvdbSNaroilQkdmYCjcYg1yTzU5gb7ThRF0_4', 'YWRtaW4=', '4', '2017-06-23 17:37:13', '0');
INSERT INTO `login_token` VALUES ('35', 'admin', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiYWNjb3VudCI6ImFkbWluIiwiY3JlYXRlX3RpbWUiOiIyMDE3LTA1LTIzVDAzOjM0OjQ1LjAwMFoiLCJsYXN0X3RpbWUiOiIyMDE3LTA1LTIzVDA2OjI1OjEyLjAwMFoiLCJsYXN0X2xvZ2luX2lwIjpudWxsLCJzdGF0dXMiOjEsInVzZXJUeXBlIjo0LCJpYXQiOjE0OTg0NDQ0MzksImV4cCI6Mjk5Njk3NTI3OH0.MgGVIuVpMQoQN8E1AJCuS_yh0VaM0I1iMGN_sgrSrCI', 'YWRtaW4=', '4', '2017-06-26 10:33:59', '0');
INSERT INTO `login_token` VALUES ('36', 'admin', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiYWNjb3VudCI6ImFkbWluIiwiY3JlYXRlX3RpbWUiOiIyMDE3LTA1LTIzVDAzOjM0OjQ1LjAwMFoiLCJsYXN0X3RpbWUiOiIyMDE3LTA1LTIzVDA2OjI1OjEyLjAwMFoiLCJsYXN0X2xvZ2luX2lwIjpudWxsLCJzdGF0dXMiOjEsInVzZXJUeXBlIjo0LCJpYXQiOjE0OTg1MzM1NzEsImV4cCI6Mjk5NzE1MzU0Mn0.zWnX7HovdryuH5KXPWk4CnORU6LuXRk4miVmS1g5KPY', 'YWRtaW4=', '4', '2017-06-27 11:19:31', '0');
INSERT INTO `login_token` VALUES ('37', 'admin', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiYWNjb3VudCI6ImFkbWluIiwiY3JlYXRlX3RpbWUiOiIyMDE3LTA1LTIzVDAzOjM0OjQ1LjAwMFoiLCJsYXN0X3RpbWUiOiIyMDE3LTA1LTIzVDA2OjI1OjEyLjAwMFoiLCJsYXN0X2xvZ2luX2lwIjpudWxsLCJzdGF0dXMiOjEsInVzZXJUeXBlIjo0LCJpYXQiOjE0OTg2MTQ1NDksImV4cCI6Mjk5NzMxNTQ5OH0.iLE516SBNtZK5yu3CK2mpBjUT2ea8sAdcjj7Bw4QTdE', 'YWRtaW4=', '4', '2017-06-28 09:49:09', '0');
INSERT INTO `login_token` VALUES ('38', 'admin', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiYWNjb3VudCI6ImFkbWluIiwiY3JlYXRlX3RpbWUiOiIyMDE3LTA1LTIzVDAzOjM0OjQ1LjAwMFoiLCJsYXN0X3RpbWUiOiIyMDE3LTA1LTIzVDA2OjI1OjEyLjAwMFoiLCJsYXN0X2xvZ2luX2lwIjpudWxsLCJzdGF0dXMiOjEsInVzZXJUeXBlIjo0LCJpYXQiOjE0OTg3MjcxNjUsImV4cCI6Mjk5NzU0MDczMH0.xCdGudg7QtarhLnx2VQwSFKVhivXKaUcCOq24qFzfjQ', 'YWRtaW4=', '4', '2017-06-29 17:06:05', '1');

-- ----------------------------
-- Table structure for `parents`
-- ----------------------------
DROP TABLE IF EXISTS `parents`;
CREATE TABLE `parents` (
  `id` int(11) NOT NULL auto_increment,
  `name` varchar(50) NOT NULL,
  `nickName` varchar(50) default NULL,
  `sexy` int(11) default '0',
  `photo` varchar(100) default NULL,
  `studentID` int(11) NOT NULL,
  `email` varchar(20) default NULL,
  `phone` varchar(50) NOT NULL,
  `account` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `create_time` datetime NOT NULL,
  `last_time` datetime default NULL,
  `status` int(11) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of parents
-- ----------------------------
INSERT INTO `parents` VALUES ('1', '雅老森', ' 阿森', '1', 'http://127.0.0.1:8000/static/img/touxiang.1763eaa.jpg', '1', '888888@qq.com', '13888888888', 'abcde', 'akghgehgngkjngoaog', '2017-06-08 12:19:08', null, '1');

-- ----------------------------
-- Table structure for `private_interaction`
-- ----------------------------
DROP TABLE IF EXISTS `private_interaction`;
CREATE TABLE `private_interaction` (
  `id` int(11) NOT NULL auto_increment,
  `create_time` datetime NOT NULL,
  `content` varchar(1000) NOT NULL,
  `fromType` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `toType` int(11) NOT NULL,
  `friendID` int(11) NOT NULL,
  `status` int(11) default NULL,
  `classID` int(11) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of private_interaction
-- ----------------------------

-- ----------------------------
-- Table structure for `pubilc_interaction`
-- ----------------------------
DROP TABLE IF EXISTS `pubilc_interaction`;
CREATE TABLE `pubilc_interaction` (
  `id` int(11) NOT NULL auto_increment,
  `create_time` datetime NOT NULL,
  `content` varchar(1000) NOT NULL,
  `fromType` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `classID` int(11) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of pubilc_interaction
-- ----------------------------

-- ----------------------------
-- Table structure for `school`
-- ----------------------------
DROP TABLE IF EXISTS `school`;
CREATE TABLE `school` (
  `id` int(11) NOT NULL auto_increment,
  `name` varchar(50) NOT NULL,
  `logo` varchar(100) default NULL,
  `address` varchar(100) default NULL,
  `email` varchar(30) default NULL,
  `phone` varchar(30) default NULL,
  `desc` varchar(200) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of school
-- ----------------------------
INSERT INTO `school` VALUES ('1', '造梦者大学', null, '广东省广州市天河区888号', '814908133@qq.com', '13710000000', null);

-- ----------------------------
-- Table structure for `school_grade`
-- ----------------------------
DROP TABLE IF EXISTS `school_grade`;
CREATE TABLE `school_grade` (
  `id` int(11) NOT NULL auto_increment,
  `name` varchar(50) NOT NULL,
  `create_time` datetime default NULL,
  `schoolID` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of school_grade
-- ----------------------------
INSERT INTO `school_grade` VALUES ('1', '09级', '2017-05-27 14:45:48', '1', '1');
INSERT INTO `school_grade` VALUES ('2', '10年级', '2017-05-27 14:57:13', '1', '1');

-- ----------------------------
-- Table structure for `share`
-- ----------------------------
DROP TABLE IF EXISTS `share`;
CREATE TABLE `share` (
  `id` int(11) NOT NULL auto_increment,
  `create_time` datetime NOT NULL,
  `last_time` datetime NOT NULL,
  `content` varchar(300) NOT NULL,
  `fromType` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `images` varchar(200) default NULL,
  `gradeID` int(11) default NULL,
  `classID` int(11) default NULL,
  `reject` varchar(200) default NULL,
  `status` int(11) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of share
-- ----------------------------
INSERT INTO `share` VALUES ('1', '2017-06-02 14:26:18', '0000-00-00 00:00:00', '爱老公儿科跟你说吧', '1', '1', 'http://www.bbb.cc/xxx.png', '1', '1', null, '1');
INSERT INTO `share` VALUES ('2', '2017-06-02 14:27:24', '0000-00-00 00:00:00', '是慷慨了就单联开关', '2', '1', 'http://www.bbb.cc/xxx.png', '1', '1', null, '1');
INSERT INTO `share` VALUES ('3', '2017-06-26 11:42:54', '0000-00-00 00:00:00', '呵呵，今天天气不错，出来晒晒吧', '1', '2', null, '2', '2', null, '1');

-- ----------------------------
-- Table structure for `share_comment`
-- ----------------------------
DROP TABLE IF EXISTS `share_comment`;
CREATE TABLE `share_comment` (
  `id` int(11) NOT NULL auto_increment,
  `create_time` datetime NOT NULL,
  `content` varchar(300) NOT NULL,
  `fromType` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `shareID` int(11) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of share_comment
-- ----------------------------

-- ----------------------------
-- Table structure for `share_likes`
-- ----------------------------
DROP TABLE IF EXISTS `share_likes`;
CREATE TABLE `share_likes` (
  `id` int(11) NOT NULL auto_increment,
  `create_time` datetime NOT NULL,
  `count` int(11) NOT NULL,
  `from` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `shareID` int(11) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of share_likes
-- ----------------------------

-- ----------------------------
-- Table structure for `students`
-- ----------------------------
DROP TABLE IF EXISTS `students`;
CREATE TABLE `students` (
  `id` int(11) NOT NULL auto_increment,
  `name` varchar(50) NOT NULL,
  `nickName` varchar(50) default NULL,
  `sexy` int(11) default '0',
  `photo` varchar(100) default NULL,
  `email` varchar(20) default NULL,
  `desc` varchar(100) default NULL,
  `phone` varchar(50) NOT NULL,
  `account` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `create_time` datetime NOT NULL,
  `userID` int(11) default NULL,
  `last_time` datetime default NULL,
  `schoolID` int(11) NOT NULL,
  `gradeID` int(11) NOT NULL,
  `classID` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `age` int(11) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of students
-- ----------------------------
INSERT INTO `students` VALUES ('1', '雅森', '森雅', '0', 'http://127.0.0.1:8000/static/img/touxiang.1763eaa.jpg', '88888@qq.com', 'safsa', '13788888888', '123123', 'gaadfgdfgsgergeggds', '2017-06-09 11:38:46', '1709010101', null, '1', '1', '1', '1', null);

-- ----------------------------
-- Table structure for `subjects`
-- ----------------------------
DROP TABLE IF EXISTS `subjects`;
CREATE TABLE `subjects` (
  `id` int(11) NOT NULL auto_increment,
  `name` varchar(50) NOT NULL,
  `code` varchar(10) NOT NULL,
  `create_time` datetime NOT NULL,
  `schoolID` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of subjects
-- ----------------------------
INSERT INTO `subjects` VALUES ('1', '王者荣耀', '10011', '2017-05-26 10:48:16', '1', '1');
INSERT INTO `subjects` VALUES ('2', '主播打赏', '10021', '2017-05-26 10:48:51', '1', '1');

-- ----------------------------
-- Table structure for `subject_class_ref`
-- ----------------------------
DROP TABLE IF EXISTS `subject_class_ref`;
CREATE TABLE `subject_class_ref` (
  `id` int(11) NOT NULL auto_increment,
  `subjectID` int(11) NOT NULL,
  `classID` int(11) NOT NULL,
  `schoolID` int(11) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of subject_class_ref
-- ----------------------------

-- ----------------------------
-- Table structure for `subject_students_ref`
-- ----------------------------
DROP TABLE IF EXISTS `subject_students_ref`;
CREATE TABLE `subject_students_ref` (
  `id` int(11) NOT NULL auto_increment,
  `subjectID` int(11) NOT NULL,
  `classID` int(11) default NULL,
  `studentID` int(11) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of subject_students_ref
-- ----------------------------

-- ----------------------------
-- Table structure for `subject_teachers_ref`
-- ----------------------------
DROP TABLE IF EXISTS `subject_teachers_ref`;
CREATE TABLE `subject_teachers_ref` (
  `id` int(11) NOT NULL auto_increment,
  `subjectID` int(11) NOT NULL,
  `classID` int(11) default NULL,
  `teacherID` int(11) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of subject_teachers_ref
-- ----------------------------

-- ----------------------------
-- Table structure for `task`
-- ----------------------------
DROP TABLE IF EXISTS `task`;
CREATE TABLE `task` (
  `id` int(11) NOT NULL auto_increment,
  `create_time` datetime NOT NULL,
  `last_time` datetime default NULL,
  `content` varchar(200) NOT NULL,
  `teacherID` int(11) NOT NULL,
  `subjectID` int(11) default NULL,
  `gradeID` int(11) NOT NULL,
  `classID` int(11) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of task
-- ----------------------------
INSERT INTO `task` VALUES ('1', '2017-06-22 16:52:10', null, '设计一个滴滴打车类似的软件', '1', null, '1', '1');
INSERT INTO `task` VALUES ('2', '2017-06-22 16:52:43', null, '尝试一下直播吃翔', '2', null, '2', '2');

-- ----------------------------
-- Table structure for `task_submit`
-- ----------------------------
DROP TABLE IF EXISTS `task_submit`;
CREATE TABLE `task_submit` (
  `id` int(11) NOT NULL auto_increment,
  `create_time` datetime NOT NULL,
  `last_time` datetime default NULL,
  `filename` varchar(200) NOT NULL,
  `taskID` int(11) NOT NULL,
  `studentID` int(11) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of task_submit
-- ----------------------------

-- ----------------------------
-- Table structure for `teachers`
-- ----------------------------
DROP TABLE IF EXISTS `teachers`;
CREATE TABLE `teachers` (
  `id` int(11) NOT NULL auto_increment,
  `name` varchar(50) NOT NULL,
  `nickName` varchar(50) default NULL,
  `sexy` int(11) default '0',
  `photo` varchar(100) default NULL,
  `userID` int(11) NOT NULL,
  `email` varchar(20) default NULL,
  `desc` varchar(100) default NULL,
  `phone` varchar(50) NOT NULL,
  `account` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `create_time` datetime NOT NULL,
  `last_time` datetime default NULL,
  `schoolID` int(11) NOT NULL,
  `gradeID` int(11) NOT NULL,
  `classID` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `age` int(11) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of teachers
-- ----------------------------
INSERT INTO `teachers` VALUES ('1', '张三', '阿三', '1', 'http://127.0.0.1:8000/static/img/touxiang.1763eaa.jpg', '445632', '845454@qq.com', '', '13752658478', 't1', 'gsdgregergerge', '2017-05-26 10:43:56', '0000-00-00 00:00:00', '1', '1', '1', '1', '45');
INSERT INTO `teachers` VALUES ('2', '李四', '阿四', '0', 'http://127.0.0.1:8000/static/img/touxiang.1763eaa.jpg', '445632', '845454@qq.com', null, '13752658478', 't2', 'sggdfgdfgaga', '2017-05-26 10:46:46', null, '1', '2', '2', '1', '33');
INSERT INTO `teachers` VALUES ('3', '王五', '阿五', '1', 'http://127.0.0.1:8000/static/img/touxiang.1763eaa.jpg', '445632', null, null, '1358923156', 't3', 'sdfsgsd32g1d3f2g1', '2017-05-26 15:22:48', null, '1', '2', '2', '1', '66');
