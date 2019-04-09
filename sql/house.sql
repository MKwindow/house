/*
Navicat MySQL Data Transfer

Source Server         : yuan
Source Server Version : 50725
Source Host           : sunxiaoyuan.com:3307
Source Database       : house

Target Server Type    : MYSQL
Target Server Version : 50725
File Encoding         : 65001

Date: 2019-04-09 12:01:28
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `house`
-- ----------------------------
DROP TABLE IF EXISTS `house`;
CREATE TABLE `house` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) unsigned NOT NULL COMMENT '房东id',
  `title` varchar(50) COLLATE utf8mb4_unicode_520_ci NOT NULL COMMENT '标题',
  `area` int(11) NOT NULL COMMENT '面积',
  `rent` int(11) NOT NULL COMMENT '租金',
  `type_a` int(11) NOT NULL COMMENT '几室',
  `type_b` int(11) NOT NULL COMMENT '几厅',
  `type_c` int(11) NOT NULL COMMENT '几厨',
  `type_d` int(11) NOT NULL COMMENT '几位',
  `style` int(11) NOT NULL COMMENT '风格1经济(TODO)',
  `pay_a` int(11) NOT NULL COMMENT '压几',
  `pay_b` int(11) NOT NULL COMMENT '付几',
  `info` text COLLATE utf8mb4_unicode_520_ci NOT NULL COMMENT '详细补充',
  `addr_id` int(11) NOT NULL COMMENT '检索主地址',
  `addr_detail` text COLLATE utf8mb4_unicode_520_ci NOT NULL COMMENT '详细地址',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `status` int(11) NOT NULL COMMENT '房屋状态',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=98 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci COMMENT='房屋表';

-- ----------------------------
-- Records of house
-- ----------------------------
INSERT INTO `house` VALUES ('1', '1', 'test', '80', '2000', '1', '1', '1', '1', '1', '11', '1', 'info', '2', 'chongqingshi ************', '2019-03-25 06:05:32', '1');
INSERT INTO `house` VALUES ('2', '1', 'test', '80', '3000', '1', '1', '1', '1', '1', '11', '1', '该小区位置好，旁边就是悦地商场和永辉超市，邱家湾轻轨站和茶园轻轨站，该房户型为两室两厅，跃层户型，格局通透，空间浪费很少。家具家电并且很齐全，拎包就可以入住。材料环保，对老人小孩都没有损害。该房视野很不错，采光也很敞亮，无阴暗空间。看房方便，我们有钥匙。\n【爱窝租房】经营服务承诺：房源图片真实，不虚假宣传；免费看房，合理收费，签约才收费；态度真诚，无套路；\n【备注】因房源更新快，建议来电咨询，本公司房源较多，相信总有一套适合您！赶快来电吧！', '2', 'chongqingshi ************', '2019-03-25 06:05:32', '2');
INSERT INTO `house` VALUES ('3', '1', 'test', '80', '1000', '1', '1', '1', '1', '1', '11', '0', 'info', '2', 'chongqingshi ************', '2019-03-25 06:05:32', '5');
INSERT INTO `house` VALUES ('4', '1', 'test', '80', '1000', '1', '1', '1', '1', '1', '11', '0', 'info', '2', 'chongqingshi ************', '2019-03-25 06:05:32', '2');
INSERT INTO `house` VALUES ('5', '1', 'test', '80', '1000', '1', '1', '1', '1', '1', '11', '0', 'info', '2', 'chongqingshi ************', '2019-03-25 06:05:32', '1');
INSERT INTO `house` VALUES ('6', '1', 'test', '80', '1000', '1', '1', '1', '1', '1', '11', '0', 'info', '2', 'chongqingshi ************', '2019-03-25 06:05:32', '1');
INSERT INTO `house` VALUES ('7', '1', 'test', '80', '1000', '1', '1', '1', '1', '1', '11', '0', 'info', '2', 'chongqingshi ************', '2019-03-25 06:05:32', '1');
INSERT INTO `house` VALUES ('8', '1', 'test', '80', '1000', '1', '1', '1', '1', '1', '11', '0', 'info', '2', 'chongqingshi ************', '2019-03-25 06:05:32', '1');
INSERT INTO `house` VALUES ('9', '1', 'test', '80', '1000', '1', '1', '1', '1', '1', '11', '0', 'info', '2', 'chongqingshi ************', '2019-03-25 06:05:32', '1');
INSERT INTO `house` VALUES ('10', '1', 'test', '80', '1000', '1', '1', '1', '1', '1', '11', '0', 'info', '2', 'chongqingshi ************', '2019-03-25 06:05:32', '1');
INSERT INTO `house` VALUES ('11', '1', 'test', '80', '1000', '1', '1', '1', '1', '1', '11', '0', 'info', '2', 'chongqingshi ************', '2019-03-25 06:05:32', '1');
INSERT INTO `house` VALUES ('12', '1', 'test', '80', '1000', '1', '1', '1', '1', '1', '11', '0', 'info', '2', 'chongqingshi ************', '2019-03-25 06:05:32', '1');
INSERT INTO `house` VALUES ('13', '1', 'test', '80', '1000', '1', '1', '1', '1', '1', '11', '0', 'info', '2', 'chongqingshi ************', '2019-03-25 06:05:32', '1');
INSERT INTO `house` VALUES ('14', '1', 'test', '80', '1000', '1', '1', '1', '1', '1', '11', '0', 'info', '2', 'chongqingshi ************', '2019-03-25 06:05:32', '1');
INSERT INTO `house` VALUES ('15', '1', 'test', '80', '1000', '1', '1', '1', '1', '1', '11', '0', 'info', '2', 'chongqingshi ************', '2019-03-25 06:05:32', '1');
INSERT INTO `house` VALUES ('16', '1', 'test', '80', '1000', '1', '1', '1', '1', '1', '11', '0', 'info', '2', 'chongqingshi ************', '2019-03-25 06:05:32', '1');
INSERT INTO `house` VALUES ('17', '1', 'test', '80', '1000', '1', '1', '1', '1', '1', '11', '0', 'info', '2', 'chongqingshi ************', '2019-03-25 06:05:32', '1');
INSERT INTO `house` VALUES ('18', '1', 'test', '80', '1000', '1', '1', '1', '1', '1', '11', '0', 'info', '2', 'chongqingshi ************', '2019-03-25 06:05:32', '1');
INSERT INTO `house` VALUES ('19', '1', 'test', '80', '1000', '1', '1', '1', '1', '1', '11', '0', 'info', '2', 'chongqingshi ************', '2019-03-25 06:05:32', '1');
INSERT INTO `house` VALUES ('20', '1', 'test', '80', '1000', '1', '1', '1', '1', '1', '11', '0', 'info', '2', 'chongqingshi ************', '2019-03-25 06:05:32', '1');
INSERT INTO `house` VALUES ('21', '1', 'test', '80', '1000', '1', '1', '1', '1', '1', '11', '0', 'info', '2', 'chongqingshi ************', '2019-03-25 06:05:32', '1');
INSERT INTO `house` VALUES ('22', '1', 'test', '80', '1000', '1', '1', '1', '1', '1', '11', '0', 'info', '2', 'chongqingshi ************', '2019-03-25 06:05:32', '1');
INSERT INTO `house` VALUES ('23', '1', 'test', '80', '1000', '1', '1', '1', '1', '1', '11', '0', 'info', '2', 'chongqingshi ************', '2019-03-25 06:05:32', '1');
INSERT INTO `house` VALUES ('24', '1', 'test', '80', '1000', '1', '1', '1', '1', '1', '11', '0', 'info', '2', 'chongqingshi ************', '2019-03-25 06:05:32', '1');
INSERT INTO `house` VALUES ('25', '1', 'test', '80', '1000', '1', '1', '1', '1', '1', '11', '0', 'info', '2', 'chongqingshi ************', '2019-03-25 06:05:32', '1');
INSERT INTO `house` VALUES ('26', '1', 'test', '80', '1000', '1', '1', '1', '1', '1', '11', '0', 'info', '2', 'chongqingshi ************', '2019-03-25 06:05:32', '1');
INSERT INTO `house` VALUES ('27', '1', 'test', '80', '1000', '1', '1', '1', '1', '1', '11', '0', 'info', '2', 'chongqingshi ************', '2019-03-25 06:05:32', '1');
INSERT INTO `house` VALUES ('28', '1', 'test', '80', '1000', '1', '1', '1', '1', '1', '11', '0', 'info', '2', 'chongqingshi ************', '2019-03-25 06:05:32', '1');
INSERT INTO `house` VALUES ('29', '1', 'test', '80', '1000', '1', '1', '1', '1', '1', '11', '0', 'info', '2', 'chongqingshi ************', '2019-03-25 06:05:32', '1');
INSERT INTO `house` VALUES ('30', '1', 'test', '80', '2000', '1', '1', '1', '1', '1', '11', '0', 'info', '2', 'chongqingshi ************', '2019-03-25 06:05:32', '1');
INSERT INTO `house` VALUES ('31', '1', 'test', '80', '1000', '1', '1', '1', '1', '1', '11', '0', 'info', '2', 'chongqingshi ************', '2019-03-25 06:06:43', '1');
INSERT INTO `house` VALUES ('32', '1', 'test', '80', '1000', '1', '1', '1', '1', '1', '11', '0', 'info', '2', 'chongqingshi ************', '2019-03-25 06:06:43', '1');
INSERT INTO `house` VALUES ('33', '1', 'test', '80', '1000', '1', '1', '1', '1', '1', '11', '0', 'info', '2', 'chongqingshi ************', '2019-03-25 06:06:43', '1');
INSERT INTO `house` VALUES ('34', '1', 'test', '80', '1000', '1', '1', '1', '1', '1', '11', '0', 'info', '2', 'chongqingshi ************', '2019-03-25 06:06:43', '1');
INSERT INTO `house` VALUES ('35', '1', 'test', '80', '1000', '1', '1', '1', '1', '1', '11', '0', 'info', '2', 'chongqingshi ************', '2019-03-25 06:06:43', '1');
INSERT INTO `house` VALUES ('36', '1', 'test', '80', '1000', '1', '1', '1', '1', '1', '11', '0', 'info', '2', 'chongqingshi ************', '2019-03-25 06:06:43', '1');
INSERT INTO `house` VALUES ('37', '1', 'test', '80', '1000', '1', '1', '1', '1', '1', '11', '0', 'info', '2', 'chongqingshi ************', '2019-03-25 06:06:43', '1');
INSERT INTO `house` VALUES ('38', '1', 'test', '80', '1000', '1', '1', '1', '1', '1', '11', '0', 'info', '2', 'chongqingshi ************', '2019-03-25 06:06:43', '1');
INSERT INTO `house` VALUES ('39', '1', 'test', '80', '1000', '1', '1', '1', '1', '1', '11', '0', 'info', '2', 'chongqingshi ************', '2019-03-25 06:06:43', '1');
INSERT INTO `house` VALUES ('40', '1', 'test', '80', '1000', '1', '1', '1', '1', '1', '11', '0', 'info', '2', 'chongqingshi ************', '2019-03-25 06:06:43', '1');
INSERT INTO `house` VALUES ('41', '1', 'test', '80', '1000', '1', '1', '1', '1', '1', '11', '0', 'info', '2', 'chongqingshi ************', '2019-03-25 06:06:43', '1');
INSERT INTO `house` VALUES ('42', '1', 'test', '80', '1000', '1', '1', '1', '1', '1', '11', '0', 'info', '2', 'chongqingshi ************', '2019-03-25 06:06:43', '1');
INSERT INTO `house` VALUES ('43', '1', 'test', '80', '1000', '1', '1', '1', '1', '1', '11', '0', 'info', '2', 'chongqingshi ************', '2019-03-25 06:06:43', '1');
INSERT INTO `house` VALUES ('44', '1', 'test', '80', '1000', '1', '1', '1', '1', '1', '11', '0', 'info', '2', 'chongqingshi ************', '2019-03-25 06:06:43', '1');
INSERT INTO `house` VALUES ('45', '1', 'test', '80', '1000', '1', '1', '1', '1', '1', '11', '0', 'info', '2', 'chongqingshi ************', '2019-03-25 06:06:43', '1');
INSERT INTO `house` VALUES ('46', '1', 'test', '80', '1000', '1', '1', '1', '1', '1', '11', '0', 'info', '2', 'chongqingshi ************', '2019-03-25 06:06:43', '1');
INSERT INTO `house` VALUES ('47', '1', 'test', '80', '1000', '1', '1', '1', '1', '1', '11', '0', 'info', '2', 'chongqingshi ************', '2019-03-25 06:06:43', '1');
INSERT INTO `house` VALUES ('48', '1', 'test', '80', '1000', '1', '1', '1', '1', '1', '11', '0', 'info', '2', 'chongqingshi ************', '2019-03-25 06:06:43', '1');
INSERT INTO `house` VALUES ('49', '1', 'test', '80', '1000', '1', '1', '1', '1', '1', '11', '0', 'info', '2', 'chongqingshi ************', '2019-03-25 06:06:43', '1');
INSERT INTO `house` VALUES ('50', '1', 'test', '80', '1000', '1', '1', '1', '1', '1', '11', '0', 'info', '2', 'chongqingshi ************', '2019-03-25 06:06:43', '1');
INSERT INTO `house` VALUES ('51', '1', 'test', '80', '1000', '1', '1', '1', '1', '1', '11', '0', 'info', '2', 'chongqingshi ************', '2019-03-25 06:06:43', '1');
INSERT INTO `house` VALUES ('52', '1', 'test', '80', '1000', '1', '1', '1', '1', '1', '11', '0', 'info', '2', 'chongqingshi ************', '2019-03-25 06:06:43', '1');
INSERT INTO `house` VALUES ('53', '1', 'test', '80', '1000', '1', '1', '1', '1', '1', '11', '0', 'info', '2', 'chongqingshi ************', '2019-03-25 06:06:43', '1');
INSERT INTO `house` VALUES ('54', '1', 'test', '80', '1000', '1', '1', '1', '1', '1', '11', '0', 'info', '2', 'chongqingshi ************', '2019-03-25 06:06:43', '1');
INSERT INTO `house` VALUES ('55', '1', 'test', '80', '1000', '1', '1', '1', '1', '1', '11', '0', 'info', '2', 'chongqingshi ************', '2019-03-25 06:06:43', '1');
INSERT INTO `house` VALUES ('56', '1', 'test', '80', '1000', '1', '1', '1', '1', '1', '11', '0', 'info', '2', 'chongqingshi ************', '2019-03-25 06:06:43', '1');
INSERT INTO `house` VALUES ('57', '1', 'test', '80', '1000', '1', '1', '1', '1', '1', '11', '0', 'info', '2', 'chongqingshi ************', '2019-03-25 06:06:43', '1');
INSERT INTO `house` VALUES ('58', '1', 'test', '80', '1000', '1', '1', '1', '1', '1', '11', '0', 'info', '2', 'chongqingshi ************', '2019-03-25 06:06:43', '1');
INSERT INTO `house` VALUES ('59', '1', 'test', '80', '1000', '1', '1', '1', '1', '1', '11', '0', 'info', '2', 'chongqingshi ************', '2019-03-25 06:06:43', '1');
INSERT INTO `house` VALUES ('60', '1', 'test', '80', '2000', '1', '1', '1', '1', '1', '11', '0', 'info', '2', 'chongqingshi ************', '2019-03-25 06:06:43', '1');
INSERT INTO `house` VALUES ('61', '1', 'test', '80', '1000', '1', '1', '1', '1', '1', '11', '0', 'info', '2', 'chongqingshi ************', '2019-03-25 06:07:19', '1');
INSERT INTO `house` VALUES ('62', '1', 'test', '80', '1000', '1', '1', '1', '1', '1', '11', '0', 'info', '2', 'chongqingshi ************', '2019-03-25 06:07:19', '1');
INSERT INTO `house` VALUES ('63', '1', 'test', '80', '1000', '1', '1', '1', '1', '1', '11', '0', 'info', '2', 'chongqingshi ************', '2019-03-25 06:07:19', '1');
INSERT INTO `house` VALUES ('64', '1', 'test', '80', '1000', '1', '1', '1', '1', '1', '11', '0', 'info', '2', 'chongqingshi ************', '2019-03-25 06:07:19', '1');
INSERT INTO `house` VALUES ('65', '1', 'test', '80', '1000', '1', '1', '1', '1', '1', '11', '0', 'info', '2', 'chongqingshi ************', '2019-03-25 06:07:19', '1');
INSERT INTO `house` VALUES ('66', '1', 'test', '80', '1000', '1', '1', '1', '1', '1', '11', '0', 'info', '2', 'chongqingshi ************', '2019-03-25 06:07:19', '1');
INSERT INTO `house` VALUES ('67', '1', 'test', '80', '1000', '1', '1', '1', '1', '1', '11', '0', 'info', '2', 'chongqingshi ************', '2019-03-25 06:07:19', '1');
INSERT INTO `house` VALUES ('68', '1', 'test', '80', '1000', '1', '1', '1', '1', '1', '11', '0', 'info', '2', 'chongqingshi ************', '2019-03-25 06:07:19', '1');
INSERT INTO `house` VALUES ('69', '1', 'test', '80', '1000', '1', '1', '1', '1', '1', '11', '0', 'info', '2', 'chongqingshi ************', '2019-03-25 06:07:19', '1');
INSERT INTO `house` VALUES ('70', '1', 'test', '80', '1000', '1', '1', '1', '1', '1', '11', '0', 'info', '2', 'chongqingshi ************', '2019-03-25 06:07:19', '1');
INSERT INTO `house` VALUES ('71', '1', 'test', '80', '1000', '1', '1', '1', '1', '1', '11', '0', 'info', '2', 'chongqingshi ************', '2019-03-25 06:07:19', '1');
INSERT INTO `house` VALUES ('72', '1', 'test', '80', '1000', '1', '1', '1', '1', '1', '11', '0', 'info', '2', 'chongqingshi ************', '2019-03-25 06:07:19', '1');
INSERT INTO `house` VALUES ('73', '1', 'test', '80', '1000', '1', '1', '1', '1', '1', '11', '0', 'info', '2', 'chongqingshi ************', '2019-03-25 06:07:19', '1');
INSERT INTO `house` VALUES ('74', '1', 'test', '80', '1000', '1', '1', '1', '1', '1', '11', '0', 'info', '2', 'chongqingshi ************', '2019-03-25 06:07:19', '1');
INSERT INTO `house` VALUES ('75', '1', 'test', '80', '1000', '1', '1', '1', '1', '1', '11', '0', 'info', '2', 'chongqingshi ************', '2019-03-25 06:07:19', '1');
INSERT INTO `house` VALUES ('76', '1', 'test', '80', '1000', '1', '1', '1', '1', '1', '11', '0', 'info', '2', 'chongqingshi ************', '2019-03-25 06:07:19', '1');
INSERT INTO `house` VALUES ('77', '1', 'test', '80', '1000', '1', '1', '1', '1', '1', '11', '0', 'info', '2', 'chongqingshi ************', '2019-03-25 06:07:19', '1');
INSERT INTO `house` VALUES ('78', '1', 'test', '80', '1000', '1', '1', '1', '1', '1', '11', '0', 'info', '2', 'chongqingshi ************', '2019-03-25 06:07:19', '1');
INSERT INTO `house` VALUES ('79', '1', 'test', '80', '1000', '1', '1', '1', '1', '1', '11', '0', 'info', '2', 'chongqingshi ************', '2019-03-25 06:07:19', '1');
INSERT INTO `house` VALUES ('80', '1', 'test', '80', '1000', '1', '1', '1', '1', '1', '11', '0', 'info', '2', 'chongqingshi ************', '2019-03-25 06:07:19', '1');
INSERT INTO `house` VALUES ('81', '1', 'test', '80', '1000', '1', '1', '1', '1', '1', '11', '0', 'info', '2', 'chongqingshi ************', '2019-03-25 06:07:19', '1');
INSERT INTO `house` VALUES ('82', '1', 'test', '80', '1000', '1', '1', '1', '1', '1', '11', '0', 'info', '2', 'chongqingshi ************', '2019-03-25 06:07:19', '1');
INSERT INTO `house` VALUES ('83', '1', 'test', '80', '1000', '1', '1', '1', '1', '1', '11', '0', 'info', '2', 'chongqingshi ************', '2019-03-25 06:07:19', '1');
INSERT INTO `house` VALUES ('84', '1', 'test', '80', '1000', '1', '1', '1', '1', '1', '11', '0', 'info', '2', 'chongqingshi ************', '2019-03-25 06:07:19', '1');
INSERT INTO `house` VALUES ('85', '1', 'test', '80', '1000', '1', '1', '1', '1', '1', '11', '0', 'info', '2', 'chongqingshi ************', '2019-03-25 06:07:19', '1');
INSERT INTO `house` VALUES ('86', '1', 'test', '80', '1000', '1', '1', '1', '1', '1', '11', '0', 'info', '2', 'chongqingshi ************', '2019-03-25 06:07:19', '1');
INSERT INTO `house` VALUES ('87', '1', 'test', '80', '1000', '1', '1', '1', '1', '1', '11', '0', 'info', '2', 'chongqingshi ************', '2019-03-25 06:07:19', '1');
INSERT INTO `house` VALUES ('88', '1', 'test', '80', '1000', '1', '1', '1', '1', '1', '11', '0', 'info', '2', 'chongqingshi ************', '2019-03-25 06:07:19', '1');
INSERT INTO `house` VALUES ('89', '1', 'test', '80', '1000', '1', '1', '1', '1', '1', '11', '0', 'info', '2', 'chongqingshi ************', '2019-03-25 06:07:19', '1');
INSERT INTO `house` VALUES ('90', '1', 'test', '80', '2000', '1', '1', '1', '1', '1', '11', '0', 'info', '2', 'chongqingshi ************', '2019-03-25 06:07:19', '1');
INSERT INTO `house` VALUES ('91', '1', '天上人间', '70', '3200', '2', '2', '1', '1', '1', '13', '0', '这样的话才可以在其他标签里面使用th:*这样的语法.这是下面语法的前提.', '1', '另外$表达式只能写在th标签内部,不然不会生效,上面例子就是使用th:text标签的值替换p标签里面的值,至于p里面的原有的值只是为了给前端开发时做展示用的.这样的话很好的做到了前后端分离.', '2019-04-01 16:00:00', '0');
INSERT INTO `house` VALUES ('92', '1', '图图生灵', '70', '1200', '2', '1', '1', '1', '1', '13', '0', 'JS中与变量常量声明相关的关键字有var，let和const。其中let和const是ES6的新特性。var', '6', 'beforeSend(XHR)\n类型：Function\n\n发送请求前可修改 XMLHttpRequest 对象的函数，如添加自定义 HTTP 头。\nXMLHttpRequest 对象是唯一的参数。\n这是一个 Ajax 事件。如果返回 false 可以取消本次 ajax 请求。', '2019-04-01 16:00:00', '0');
INSERT INTO `house` VALUES ('93', '3', '整租 · 煌华晶萃城 2室2厅', '120', '2998', '2', '1', '1', '1', '1', '13', '0', 'ihomes白领公寓，地处虹桥商务区，毗邻国家会展中心的大型别墅小区。公寓物美价廉，是一处深爱白领打工族青睐的栖息之地。\n交通：地铁2号线距小区步行15分钟，17号线距小区步行5分钟，10号线直达市中心。公交车总站离我公寓车距只一站，在虹桥火车站与地铁2号线，10号线零距离对接，可直达长三角各省及全国部分省市，直达上海各市区。地铁17号线直通朱家角古镇.大观园.东方绿洲.淀山湖等著名旅游景点，半小时之内直达。\n公寓特色；白领公寓统一为3-4层别墅，别墅中每套房间都是独门独户.独厨独卫.户户防盗门。空调.淋浴.排油烟机等家电齐配，木质家具配套齐全。小区内24小时保安服务，租客居住安全可靠。近期政府投巨资安装智能安保系统.绿化美化小区环境，小区将提升为文明.安全.花园式别墅小区。\n周边环境；小区地处上海市一城两翼之西翼--虹桥商务区的核心区域，内辖国家会展中心、绿地世界中心总部办公区和商务区以及正在建设中的蟠龙新天地商务综合体，小区对面的景观河，也在建设中。我公寓将被一个新型现代化的新城环抱其中。', '2', '二联二区（龙联路208弄）', '2019-04-03 16:00:00', '0');
INSERT INTO `house` VALUES ('94', '3', '整租 · 煌华晶萃城 2室2厅', '120', '2998', '2', '1', '1', '1', '1', '13', '0', 'ihomes白领公寓，地处虹桥商务区，毗邻国家会展中心的大型别墅小区。公寓物美价廉，是一处深爱白领打工族青睐的栖息之地。\n交通：地铁2号线距小区步行15分钟，17号线距小区步行5分钟，10号线直达市中心。公交车总站离我公寓车距只一站，在虹桥火车站与地铁2号线，10号线零距离对接，可直达长三角各省及全国部分省市，直达上海各市区。地铁17号线直通朱家角古镇.大观园.东方绿洲.淀山湖等著名旅游景点，半小时之内直达。\n公寓特色；白领公寓统一为3-4层别墅，别墅中每套房间都是独门独户.独厨独卫.户户防盗门。空调.淋浴.排油烟机等家电齐配，木质家具配套齐全。小区内24小时保安服务，租客居住安全可靠。近期政府投巨资安装智能安保系统.绿化美化小区环境，小区将提升为文明.安全.花园式别墅小区。\n周边环境；小区地处上海市一城两翼之西翼--虹桥商务区的核心区域，内辖国家会展中心、绿地世界中心总部办公区和商务区以及正在建设中的蟠龙新天地商务综合体，小区对面的景观河，也在建设中。我公寓将被一个新型现代化的新城环抱其中。', '2', '二联二区（龙联路208弄）', '2019-04-03 16:00:00', '0');
INSERT INTO `house` VALUES ('95', '4', '整租-新区-云二小区-3室1厅1卫-86.0㎡', '86', '5000', '3', '1', '1', '1', '1', '11', '0', '【公寓户型】800元-1000，精装单身公寓；1000元-2000元，精装独立一室户；元，精装loft公寓，上下两层；3000元以上，精装整租户型，公寓全部建在离地轶5公里范围内，均有班车，停车位，充电桩均有！\n【整租托管】业主直托，协助办居住证！\n1、房东直接委托公寓代理出租\n2、公寓方负责推广，出租，保洁，维护。\n3、租客通过平台使用花呗及信用卡支付房租\n4、租客直接与房东签订租赁合同\n5、公寓方负责租期内各类房源维护', '5', '云二小区（昌里东路190弄）', '2019-04-03 16:00:00', '0');
INSERT INTO `house` VALUES ('96', '4', '南桥寺公交站旁 维丰南桥小区单间出租 超低价格 随时看房', '25', '650', '2', '2', '1', '1', '1', '11', '0', '大学：重庆大学\n中：南桥寺、玉带山、字水华渝实验\n幼儿园：娃哈哈幼儿园七彩幼儿园开心贝贝幼儿园文艺幼儿园金凤凰幼儿园\n商场：新世纪商场宜客乐超市东日商厦\n邮局：中国邮政\n银行：建设银行、工商银行、农村商业银行、中信银行\n医院：市中医院市一院江北五院通用医院冉家坝医院\n其他：石子山体育公园永辉超市总部（修建中）', '5', '南桥寺茶叶市场对面', '2019-04-07 16:00:00', '0');
INSERT INTO `house` VALUES ('97', '4', '永辉超市旁，同景国际城n组团', '70', '1500', '2', '1', '1', '1', '1', '13', '0', '该小区位置好，旁边就是悦地商场和永辉超市，邱家湾轻轨站和茶园轻轨站，该房户型为两室两厅，跃层户型，格局通透，空间浪费很少。家具家电并且很齐全，拎包就可以入住。材料环保，对老人小孩都没有损害。该房视野很不错，采光也很敞亮，无阴暗空间。看房方便，我们有钥匙。', '3', '茶园新区通江大道东侧', '2019-04-07 16:00:00', '0');

-- ----------------------------
-- Table structure for `house_addr`
-- ----------------------------
DROP TABLE IF EXISTS `house_addr`;
CREATE TABLE `house_addr` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci COMMENT='地址配置表';

-- ----------------------------
-- Records of house_addr
-- ----------------------------
INSERT INTO `house_addr` VALUES ('1', '重庆');
INSERT INTO `house_addr` VALUES ('2', '渝中区');
INSERT INTO `house_addr` VALUES ('3', '渝北区');
INSERT INTO `house_addr` VALUES ('4', '大渡口区');
INSERT INTO `house_addr` VALUES ('5', '九龙坡区');
INSERT INTO `house_addr` VALUES ('6', '南岸区');
INSERT INTO `house_addr` VALUES ('7', '北碚区');

-- ----------------------------
-- Table structure for `house_pic`
-- ----------------------------
DROP TABLE IF EXISTS `house_pic`;
CREATE TABLE `house_pic` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `house_id` int(11) NOT NULL COMMENT '关联房屋',
  `url` varchar(255) COLLATE utf8mb4_unicode_520_ci NOT NULL COMMENT '资源地址',
  `status` int(11) NOT NULL COMMENT '资源状态',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci COMMENT='房屋资源表';

-- ----------------------------
-- Records of house_pic
-- ----------------------------
INSERT INTO `house_pic` VALUES ('1', '1', 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2060761043,284284863&fm=27&gp=0.jpg', '1');

-- ----------------------------
-- Table structure for `menu`
-- ----------------------------
DROP TABLE IF EXISTS `menu`;
CREATE TABLE `menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pid` int(11) NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `url` varchar(50) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci COMMENT='菜单';

-- ----------------------------
-- Records of menu
-- ----------------------------

-- ----------------------------
-- Table structure for `order`
-- ----------------------------
DROP TABLE IF EXISTS `order`;
CREATE TABLE `order` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL COMMENT '关联租户',
  `house_id` int(11) NOT NULL COMMENT '关联房屋',
  `start_time` datetime NOT NULL COMMENT '租期开始时间',
  `end_time` datetime NOT NULL COMMENT '租期结束时间',
  `status` int(11) NOT NULL COMMENT '状态',
  `remark` text COLLATE utf8mb4_unicode_520_ci NOT NULL COMMENT '备注',
  `snapshot` text COLLATE utf8mb4_unicode_520_ci NOT NULL COMMENT '快照信息:house的json副本',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci COMMENT='租房表';

-- ----------------------------
-- Records of order
-- ----------------------------
INSERT INTO `order` VALUES ('1', '1', '1', '2019-04-04 08:33:10', '2019-04-04 08:33:10', '1', '无', 'House(id=1, user_id=1, title=test, area=80, rent=1000, type_a=1, type_b=1, type_c=1, type_d=1, style=1, pay_a=1, pay_b=1, info=info, addr_id=2, addr_detail=chongqingshi ************, create_time=Mon Mar 25 14:05:32 CST 2019, status=1, pics=[HousePic(id=1, house_id=1, url=https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2060761043,284284863&fm=27&gp=0.jpg, status=1)])', '2019-04-04 08:33:10');
INSERT INTO `order` VALUES ('2', '1', '3', '2019-04-04 11:37:54', '2019-04-04 11:37:54', '0', '无', 'House(id=3, user_id=1, title=test, area=80, rent=1000, type_a=1, type_b=1, type_c=1, type_d=1, style=1, pay_a=1, pay_b=1, info=info, addr_id=2, addr_detail=chongqingshi ************, create_time=Mon Mar 25 14:05:32 CST 2019, status=1, pics=[])', '2019-04-04 11:37:54');
INSERT INTO `order` VALUES ('3', '5', '2', '2019-04-04 12:10:42', '2024-10-11 12:10:42', '0', '后天入住', 'House(id=2, user_id=1, title=test, area=80, rent=1000, type_a=1, type_b=1, type_c=1, type_d=1, style=1, pay_a=1, pay_b=1, info=info, addr_id=2, addr_detail=chongqingshi ************, create_time=Mon Mar 25 14:05:32 CST 2019, status=1, pics=[])', '2019-04-04 12:10:42');
INSERT INTO `order` VALUES ('4', '5', '18', '2019-04-04 12:12:20', '2024-10-12 12:12:20', '0', '下午入住', 'House(id=18, user_id=1, title=test, area=80, rent=1000, type_a=1, type_b=1, type_c=1, type_d=1, style=1, pay_a=1, pay_b=1, info=info, addr_id=2, addr_detail=chongqingshi ************, create_time=Mon Mar 25 14:05:32 CST 2019, status=1, pics=[])', '2019-04-04 12:12:20');
INSERT INTO `order` VALUES ('5', '3', '5', '2019-04-04 15:10:04', '2024-10-11 15:10:04', '0', '无', 'House(id=5, user_id=1, title=test, area=80, rent=1000, type_a=1, type_b=1, type_c=1, type_d=1, style=1, pay_a=1, pay_b=1, info=info, addr_id=2, addr_detail=chongqingshi ************, create_time=Mon Mar 25 14:05:32 CST 2019, status=1, pics=[])', '2019-04-04 15:10:04');
INSERT INTO `order` VALUES ('6', '4', '6', '2019-04-04 15:49:42', '2024-10-11 15:49:42', '0', '明天去', 'House(id=6, user_id=1, title=test, area=80, rent=1000, type_a=1, type_b=1, type_c=1, type_d=1, style=1, pay_a=1, pay_b=1, info=info, addr_id=2, addr_detail=chongqingshi ************, create_time=Mon Mar 25 14:05:32 CST 2019, status=1, pics=[])', '2019-04-04 15:49:42');
INSERT INTO `order` VALUES ('7', '4', '2', '2019-04-08 03:11:22', '2024-10-11 03:11:22', '0', '一星期以后到', '{area=80, create_time=2019-03-25 14:05:32.0, title=test, rent=1000, addr_detail=chongqingshi ************, type_d=1, type_c=1, type_b=1, pay_a=1, type_a=1, pay_b=1, user_id=1, nick_name=管理, style=1, id=2, pics=[], addr_id=2, info=info, status=1}', '2019-04-08 03:11:22');

-- ----------------------------
-- Table structure for `reserve`
-- ----------------------------
DROP TABLE IF EXISTS `reserve`;
CREATE TABLE `reserve` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL COMMENT '关联用户',
  `house_id` int(11) NOT NULL COMMENT '关联房屋',
  `time` datetime NOT NULL COMMENT '预约时间',
  `status` int(11) NOT NULL COMMENT '预约状态',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci COMMENT='预约表';

-- ----------------------------
-- Records of reserve
-- ----------------------------
INSERT INTO `reserve` VALUES ('1', '1', '1', '2022-01-21 16:00:00', '1', '2019-04-03 12:45:34');
INSERT INTO `reserve` VALUES ('2', '1', '1', '2019-02-21 16:00:00', '1', '2019-04-03 12:54:08');
INSERT INTO `reserve` VALUES ('3', '3', '6', '2019-01-22 16:00:00', '1', '2019-04-04 14:21:32');
INSERT INTO `reserve` VALUES ('4', '4', '26', '2019-04-11 02:02:02', '0', '2019-04-04 15:45:40');
INSERT INTO `reserve` VALUES ('5', '4', '2', '2019-04-16 18:02:02', '0', '2019-04-08 03:08:38');

-- ----------------------------
-- Table structure for `role`
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(50) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci COMMENT='角色表';

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES ('1', 'SU');
INSERT INTO `role` VALUES ('2', 'USER');

-- ----------------------------
-- Table structure for `role_menu`
-- ----------------------------
DROP TABLE IF EXISTS `role_menu`;
CREATE TABLE `role_menu` (
  `role_id` int(11) NOT NULL,
  `menu_id` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  UNIQUE KEY `role_menu` (`role_id`,`menu_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- ----------------------------
-- Records of role_menu
-- ----------------------------

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nick_name` varchar(50) COLLATE utf8mb4_unicode_520_ci NOT NULL COMMENT '昵称',
  `username` varchar(50) COLLATE utf8mb4_unicode_520_ci NOT NULL COMMENT '账号',
  `password` varchar(255) COLLATE utf8mb4_unicode_520_ci NOT NULL COMMENT '密码',
  `phone` varchar(50) COLLATE utf8mb4_unicode_520_ci NOT NULL COMMENT '手机',
  `email` varchar(50) COLLATE utf8mb4_unicode_520_ci NOT NULL COMMENT '邮箱',
  `credit` int(11) NOT NULL COMMENT '信用积分',
  `status` int(11) NOT NULL COMMENT '状态',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `id_card` varchar(18) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL COMMENT '身份证',
  `sex` tinyint(2) DEFAULT NULL COMMENT '性别',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci COMMENT='用户表';

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', '管理员', 'admin', '$2a$10$4V/wYXlwguBiX8YZOTuNLeHvZp1yXYPIODAnbJN4l8BpQXCApw8ie', '16320400924', '7980352032@qq.com', '100', '1', '2019-03-22 05:21:40', '500226199307231181', '1');
INSERT INTO `user` VALUES ('2', '0', 'admin0', '$2a$10$WAyOX37Df96oTzeZ79xhfOUVW7yCyqC55YwCB0M/76AbF0dd/Dt9W', '', '123456@qq.com', '100', '1', '2019-03-22 08:08:30', null, null);
INSERT INTO `user` VALUES ('3', '1', 'admin1', '$2a$10$yvjw9IruUd1tuTVP6eIlneLF2dh0EGSfI4D0xOUEp5iErBf9k9Z5y', '', '123456@qq.com', '100', '1', '2019-03-22 08:08:32', null, null);
INSERT INTO `user` VALUES ('4', '测试2', 'admin2', '$2a$10$Uon9Ez6h39Ez5bgZC3AaneyKhVKzlWBBeNB.7N4D50nrKZpleYY3G', '13364009512', '123456@qq.com', '100', '1', '2019-03-22 08:08:32', '500223199606052213', '0');
INSERT INTO `user` VALUES ('5', '测试3', 'admin3', '$2a$10$NToD/R8BDq.OuTfxeq7d1OzJbKhBG5RC0yqfdkoZiwb4THjlzcMia', '13365715241', '123456@qq.com', '100', '1', '2019-03-22 08:08:32', '500223199505031121', '0');
INSERT INTO `user` VALUES ('6', '4', 'admin4', '$2a$10$KQn79nS6QBJZjgIMsNJSCuxYBBpl6dghdwNxJnMw5MHW/XP/gkJfW', '', '123456@qq.com', '100', '1', '2019-03-22 08:08:33', null, null);
INSERT INTO `user` VALUES ('7', '5', 'admin5', '$2a$10$KGZB.BFKB1tDGqVEosWUqecF8YmEdoYUYor2lbsCJybffMAdBmvvC', '', '123456@qq.com', '100', '1', '2019-03-22 08:08:33', null, null);
INSERT INTO `user` VALUES ('8', '6', 'admin6', '$2a$10$H1O1f.yiPKSAp4XuZq9KIOrLvt.0HOLLQ.bo5nYaZw06HdQ8gXmaa', '', '123456@qq.com', '100', '1', '2019-03-22 08:08:33', null, null);
INSERT INTO `user` VALUES ('9', '7', 'admin7', '$2a$10$T0cM/Vw9QsL6ma6Pyg3R3./gVpxpf9QpySmOktML0fHlN5pIMBFMG', '', '123456@qq.com', '100', '1', '2019-03-22 08:08:33', null, null);
INSERT INTO `user` VALUES ('10', '8', 'admin8', '$2a$10$oK5zHyyTavKS8BzcdPZH8enxdWh3hhfexfBWe.j0DEP4mzNNzG0yi', '', '123456@qq.com', '100', '1', '2019-03-22 08:08:33', null, null);
INSERT INTO `user` VALUES ('11', '9', 'admin9', '$2a$10$tGd0/B2DvuRpl3UhjRQ8j.6w2pytDQLxmdQmzG59sDp6FpU8Zv.wK', '', '123456@qq.com', '100', '1', '2019-03-22 08:08:34', null, null);
INSERT INTO `user` VALUES ('12', '10', 'admin10', '$2a$10$lRXNTYEF4SfLTznBBx9BIeDFe8n0VB0XCu1j8m/mV4d2Aqqe.3Rn6', '', '123456@qq.com', '100', '1', '2019-03-22 08:08:34', null, null);
INSERT INTO `user` VALUES ('13', '11', 'admin11', '$2a$10$VDYI.C/6ptH7ZihXGflEZOFmayi4xwiH09mciio1qZ4e6VaQWY1hm', '', '123456@qq.com', '100', '1', '2019-03-22 08:08:34', null, null);
INSERT INTO `user` VALUES ('14', '12', 'admin12', '$2a$10$OnQuJYz6n7DH4lnrAGdPBu48n4TLPs54iSXvXBOwqey/2He.IIYl.', '', '123456@qq.com', '100', '1', '2019-03-22 08:08:34', null, null);
INSERT INTO `user` VALUES ('15', '13', 'admin13', '$2a$10$FVV/XcNnmm9lqlYG1wCUv./O1VslBm21Kx7OJTpOI/d65WjiWdfWa', '', '123456@qq.com', '100', '1', '2019-03-22 08:08:35', null, null);
INSERT INTO `user` VALUES ('16', '14', 'admin14', '$2a$10$D3ONr42aYoPfn4XCx7liVupdrErN3O9G1gbTDTdhZFkyPEHa41R3.', '', '123456@qq.com', '100', '1', '2019-03-22 08:08:35', null, null);
INSERT INTO `user` VALUES ('17', '15', 'admin15', '$2a$10$PR3zCOv3dphBdhTPtdAGZueSzbM4O3oQ4jyZ/F8O9c175/Us6Y2LC', '', '123456@qq.com', '100', '1', '2019-03-22 08:08:35', null, null);
INSERT INTO `user` VALUES ('18', '16', 'admin16', '$2a$10$CQXyx7Q.jGqIBztm7o2RKeIM8TZ8R0.fISVkWwC0lsVUhyXE4gmca', '', '123456@qq.com', '100', '1', '2019-03-22 08:08:35', null, null);
INSERT INTO `user` VALUES ('19', '17', 'admin17', '$2a$10$4VGuFDMOB9K3JSzMrecNT.oFBX5P8l5/.25I1zG/OTVasdq2tzpOe', '', '123456@qq.com', '100', '1', '2019-03-22 08:08:36', null, null);
INSERT INTO `user` VALUES ('20', '18', 'admin18', '$2a$10$hSvwHSVzURqbZcPj91wiVe0R.zLcofsr.103xJXJPRHrstCnXEVha', '', '123456@qq.com', '100', '1', '2019-03-22 08:08:36', null, null);
INSERT INTO `user` VALUES ('21', '19', 'admin19', '$2a$10$SODd9LROGaqbcLJzgPJm1.L63ITxkx70KJv4OAFprKmTkxOUZQLi6', '', '123456@qq.com', '100', '1', '2019-03-22 08:08:36', null, null);
INSERT INTO `user` VALUES ('22', '20', 'admin20', '$2a$10$.J2wer6QfqpjGoxyGBNpVu2COCeh5BiiZzFTo6B6Ms/tWNPcGz5Gq', '', '123456@qq.com', '100', '1', '2019-03-22 08:08:36', null, null);
INSERT INTO `user` VALUES ('23', '21', 'admin21', '$2a$10$C/YLkY5YUbhJ1kikk.fUS.C0uPoTTc1Myxd9JjeUsEDlai0/JGdmq', '', '123456@qq.com', '100', '1', '2019-03-22 08:08:36', null, null);
INSERT INTO `user` VALUES ('24', '22', 'admin22', '$2a$10$U8Ilh9y4/8xZ/DgXcGaTSODv26eTNbUHcqJf957SLS2.bS1qltXPa', '', '123456@qq.com', '100', '1', '2019-03-22 08:08:37', null, null);
INSERT INTO `user` VALUES ('25', '23', 'admin23', '$2a$10$.Cz1my2m94lofLgTduius.DEv2QkmegUq1ZrY/nP7xWQp4Wtr2m8W', '', '123456@qq.com', '100', '1', '2019-03-22 08:08:37', null, null);
INSERT INTO `user` VALUES ('26', '24', 'admin24', '$2a$10$Dz/jR5N91CofPuPZKabtleO9qUtzQR/AnVZl7ERZSLB/bxIA6iVeG', '', '123456@qq.com', '100', '1', '2019-03-22 08:08:37', null, null);
INSERT INTO `user` VALUES ('27', '25', 'admin25', '$2a$10$3rcaYy/ncIKoStVQ8y2tPOk3nywmYJal4rbE1nslKPEeB2WCQzb4S', '', '123456@qq.com', '100', '1', '2019-03-22 08:08:37', null, null);
INSERT INTO `user` VALUES ('28', '26', 'admin26', '$2a$10$jkcYCGzounlzxj44OJ68YOVIOoQleuTrF/uCGIhMbgiSRz38S7602', '', '123456@qq.com', '100', '1', '2019-03-22 08:08:38', null, null);
INSERT INTO `user` VALUES ('29', '27', 'admin27', '$2a$10$GM84jEhD1DhBiWxlUcbP.uHH5KCUrIAT.tzTJIs/i796vj6RVWUm6', '', '123456@qq.com', '100', '1', '2019-03-22 08:08:38', null, null);
INSERT INTO `user` VALUES ('30', '28', 'admin28', '$2a$10$oss24PVOWq6MXlOsZ.0ZleKtfKDJzlU4l8Q9nf4FnmQXQypFM70tG', '', '123456@qq.com', '100', '1', '2019-03-22 08:08:38', null, null);
INSERT INTO `user` VALUES ('31', '29', 'admin29', '$2a$10$2SOm6Y8c8YRvJXMTLK86FOpw3NzoOTi8tthJoPDcN0rIgtQjoeA8K', '', '123456@qq.com', '100', '1', '2019-03-22 08:08:38', null, null);
INSERT INTO `user` VALUES ('32', '30', 'admin30', '$2a$10$BrkcqJ8YMlgpF1JD9HQzNuEixKctMwkuPluG3x.a90FvWyKsVBhci', '', '123456@qq.com', '100', '1', '2019-03-22 08:08:38', null, null);
INSERT INTO `user` VALUES ('33', '31', 'admin31', '$2a$10$LfQ69QYEw6EjCHVs9BGcO.vxQPqqaV2MFL9FjOswrTDIIqXPX3j3e', '', '123456@qq.com', '100', '1', '2019-03-22 08:08:39', null, null);
INSERT INTO `user` VALUES ('34', '32', 'admin32', '$2a$10$J1M/SLz5fRW.2J.aSniMHeByaWDtK3IDoL0DDUBc9OaD0IFbBSSRy', '', '123456@qq.com', '100', '1', '2019-03-22 08:08:39', null, null);
INSERT INTO `user` VALUES ('35', '33', 'admin33', '$2a$10$umGf3aBLrmKX4SRqJWk.kenc5VF7qVz8Wn21m8re14oZMUzrFYnzi', '', '123456@qq.com', '100', '1', '2019-03-22 08:08:39', null, null);
INSERT INTO `user` VALUES ('36', '34', 'admin34', '$2a$10$6kv5lit1lmdZY/AO2ipMg.2qSIVNsrYnhtuKvRVXLqJVf3eAbctX6', '', '123456@qq.com', '100', '1', '2019-03-22 08:08:39', null, null);
INSERT INTO `user` VALUES ('37', '张三', 'zhangsan', '$2a$10$no1JQHg8CzRmv0ekR/urmOYD8N1pqciPR1UBwdjGFPvt6x9Vknci6', '', '45061@qq.com', '100', '1', '2019-04-08 02:58:22', '500223199603021123', '0');

-- ----------------------------
-- Table structure for `user_pic`
-- ----------------------------
DROP TABLE IF EXISTS `user_pic`;
CREATE TABLE `user_pic` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL COMMENT '关联用户',
  `url` varchar(255) COLLATE utf8mb4_unicode_520_ci NOT NULL COMMENT '资源地址',
  `status` int(11) NOT NULL COMMENT '资源类型',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci COMMENT='用户认证资源表';

-- ----------------------------
-- Records of user_pic
-- ----------------------------

-- ----------------------------
-- Table structure for `user_role`
-- ----------------------------
DROP TABLE IF EXISTS `user_role`;
CREATE TABLE `user_role` (
  `user_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  `status` int(11) DEFAULT NULL,
  UNIQUE KEY `user_role` (`user_id`,`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- ----------------------------
-- Records of user_role
-- ----------------------------
