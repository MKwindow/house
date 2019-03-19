/*
Navicat MySQL Data Transfer

Source Server         : mysql
Source Server Version : 50617
Source Host           : localhost:3306
Source Database       : sys_house

Target Server Type    : MYSQL
Target Server Version : 50617
File Encoding         : 65001

Date: 2019-03-19 23:49:09
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `contract`
-- ----------------------------
DROP TABLE IF EXISTS `contract`;
CREATE TABLE `contract` (
  `contractid` varchar(20) NOT NULL COMMENT '合同编号',
  `houseid` varchar(20) NOT NULL COMMENT '房屋编号',
  `tenantid` varchar(20) NOT NULL COMMENT '租客编号',
  `ownerid` varchar(20) NOT NULL COMMENT '房东编号',
  `rentid` varchar(20) NOT NULL COMMENT '租金编号',
  `startdate` date NOT NULL COMMENT '开始日期',
  `enddate` date NOT NULL COMMENT '开始日期',
  `texts` text COMMENT '合同内容',
  `attestation` bit(1) NOT NULL DEFAULT b'0' COMMENT '认证状态',
  `upload` text COMMENT '认证文件',
  PRIMARY KEY (`contractid`),
  UNIQUE KEY `contractid` (`contractid`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='合同表';

-- ----------------------------
-- Records of contract
-- ----------------------------

-- ----------------------------
-- Table structure for `house`
-- ----------------------------
DROP TABLE IF EXISTS `house`;
CREATE TABLE `house` (
  `userid` varchar(20) NOT NULL COMMENT '房主编号',
  `houseid` varchar(20) NOT NULL COMMENT '房屋编号',
  `housestyle` varchar(15) NOT NULL COMMENT '房屋类型\r\n',
  `houseaddress` varchar(100) NOT NULL COMMENT '房屋地址',
  `housename` varchar(20) NOT NULL COMMENT '房屋名称',
  `housefaci` varchar(100) DEFAULT NULL COMMENT '房屋设施',
  `housearea` float(3,2) unsigned NOT NULL COMMENT '房屋面积',
  `housestatus` bit(1) NOT NULL DEFAULT b'0' COMMENT '出租状态',
  `houserequire` varchar(100) DEFAULT NULL COMMENT '出租要求',
  `style` int(3) DEFAULT '1' COMMENT '房源风格',
  `attestation` bit(1) NOT NULL DEFAULT b'0' COMMENT '认证状态',
  `houseimage` text COMMENT '房屋照片',
  `payway` varchar(20) DEFAULT NULL COMMENT '缴费方式',
  `housedate` date DEFAULT NULL COMMENT '发布时间',
  `upload` text COMMENT '认证文件',
  PRIMARY KEY (`houseid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='房屋信息表';

-- ----------------------------
-- Records of house
-- ----------------------------

-- ----------------------------
-- Table structure for `refund`
-- ----------------------------
DROP TABLE IF EXISTS `refund`;
CREATE TABLE `refund` (
  `refundid` varchar(20) NOT NULL COMMENT '退款编号',
  `refunddate` date NOT NULL COMMENT '退款日期',
  `refundpay` double(6,2) NOT NULL COMMENT '退款金额',
  `userid` varchar(20) NOT NULL COMMENT '退款用户编号',
  `username` varchar(20) DEFAULT NULL COMMENT '退款用户姓名',
  PRIMARY KEY (`refundid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='退还记录表';

-- ----------------------------
-- Records of refund
-- ----------------------------

-- ----------------------------
-- Table structure for `rent`
-- ----------------------------
DROP TABLE IF EXISTS `rent`;
CREATE TABLE `rent` (
  `rentid` varchar(20) NOT NULL COMMENT '租金编号',
  `paydate` date NOT NULL COMMENT '缴费日期',
  `rentpayable` double(6,2) NOT NULL COMMENT '应交租金',
  `rentpaying` double(6,2) DEFAULT '0.00' COMMENT '已交租金',
  `outdate` date DEFAULT NULL COMMENT '逾期日期',
  `userid` varchar(20) NOT NULL COMMENT '租客编号',
  `username` varchar(20) NOT NULL COMMENT '租客姓名',
  `rentstate` bit(1) NOT NULL DEFAULT b'0' COMMENT '退款状态',
  PRIMARY KEY (`rentid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='租金表';

-- ----------------------------
-- Records of rent
-- ----------------------------

-- ----------------------------
-- Table structure for `reserve`
-- ----------------------------
DROP TABLE IF EXISTS `reserve`;
CREATE TABLE `reserve` (
  `reserveid` varchar(20) NOT NULL COMMENT '预定编号',
  `tenantid` varchar(20) NOT NULL COMMENT '租客编号',
  `houseid` varchar(20) NOT NULL COMMENT '房屋编号',
  `reserveldata` date NOT NULL COMMENT '看房日期',
  `reservelstate` bit(1) NOT NULL DEFAULT b'0' COMMENT '预约状态',
  `remake` text COMMENT '备注',
  PRIMARY KEY (`reserveid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='预定房屋信息表';

-- ----------------------------
-- Records of reserve
-- ----------------------------

-- ----------------------------
-- Table structure for `resource`
-- ----------------------------
DROP TABLE IF EXISTS `resource`;
CREATE TABLE `resource` (
  `resourceid` int(20) NOT NULL AUTO_INCREMENT COMMENT '资源编号',
  `resname` varchar(150) NOT NULL COMMENT '资源地址',
  PRIMARY KEY (`resourceid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='资源表';

-- ----------------------------
-- Records of resource
-- ----------------------------

-- ----------------------------
-- Table structure for `role`
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `roleid` int(20) NOT NULL AUTO_INCREMENT COMMENT '角色编号',
  `rolename` varchar(10) NOT NULL COMMENT '角色名字',
  PRIMARY KEY (`roleid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='角色表';

-- ----------------------------
-- Records of role
-- ----------------------------

-- ----------------------------
-- Table structure for `roleres`
-- ----------------------------
DROP TABLE IF EXISTS `roleres`;
CREATE TABLE `roleres` (
  `id` int(20) NOT NULL AUTO_INCREMENT COMMENT '权限ID',
  `roleid` int(20) NOT NULL COMMENT '角色编号',
  `resourceid` int(20) NOT NULL COMMENT '资源编号',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='角色-资源表';

-- ----------------------------
-- Records of roleres
-- ----------------------------

-- ----------------------------
-- Table structure for `uesrrole`
-- ----------------------------
DROP TABLE IF EXISTS `uesrrole`;
CREATE TABLE `uesrrole` (
  `id` int(20) NOT NULL AUTO_INCREMENT COMMENT '权限ID',
  `userid` varchar(20) NOT NULL COMMENT '用户编号',
  `roleid` int(20) NOT NULL COMMENT '角色编号',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户-角色表';

-- ----------------------------
-- Records of uesrrole
-- ----------------------------

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `userid` varchar(20) NOT NULL COMMENT '用户编号',
  `username` varchar(20) NOT NULL COMMENT '用户姓名',
  `userpassword` varchar(24) NOT NULL COMMENT '用户密码',
  `userphone` varchar(15) NOT NULL COMMENT '联系电话',
  `useraddress` varchar(100) DEFAULT NULL COMMENT '联系地址',
  `usermail` varchar(20) DEFAULT NULL COMMENT '邮箱地址',
  `usersex` bit(1) NOT NULL DEFAULT b'0' COMMENT '性别',
  `useridentity` varchar(20) DEFAULT NULL COMMENT '身份证号码',
  `attestation` bit(1) NOT NULL DEFAULT b'0' COMMENT '认证状态',
  PRIMARY KEY (`userid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户表';

-- ----------------------------
-- Records of user
-- ----------------------------
