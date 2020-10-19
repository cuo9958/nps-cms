/**
 * 安装脚本
 */
import CategoryModel from "./model/category";

//强制初始化mysql数据库
CategoryModel.sync(true);
