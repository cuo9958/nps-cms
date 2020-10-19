/**
 * 安装脚本
 */
import CategoryModel from "./model/category";
import ContentModel from "./model/content";

//强制初始化mysql数据库
CategoryModel.sync(true);
ContentModel.sync(true);
