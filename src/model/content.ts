import { Model, DataTypes } from "sequelize";
import db from "../db//mysql";

interface ContentAttr {
    id: number;
    title: string;
    cid: number;
    status: number;
    remark: string;
    img: string;
    txts: string;
}
/**
 * 文档分类
 * 可以创建多级
 */
class Content extends Model<ContentAttr> implements ContentAttr {
    public id!: number;
    public title!: string;
    public status: number;
    public remark: string;
    public img: string;
    public cid: number;
    public txts: string;

    public dataValues: ContentAttr;
}

Content.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        cid: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            comment: "分类的id",
        },
        title: {
            type: DataTypes.STRING(20),
            defaultValue: "",
            comment: "分类标题",
        },
        remark: {
            type: DataTypes.STRING(200),
            defaultValue: "",
            comment: "分类备注",
        },
        txts: {
            type: DataTypes.TEXT,
            defaultValue: "",
            comment: "文档内容",
        },
        img: {
            type: DataTypes.STRING(100),
            defaultValue: "",
            comment: "分类的小图片",
        },
        status: {
            type: DataTypes.TINYINT,
            defaultValue: 1,
            comment: "用户状态，0：禁止；1：启用",
        },
    },
    {
        sequelize: db,
        freezeTableName: true,
        tableName: "t_content",
        indexes: [],
    }
);

export default {
    sync: (force = true) => Content.sync({ force }),
    insert: function (model: any) {
        return Content.create(model);
    },
    update(model: any, id: number) {
        return Content.update(model, {
            where: { id },
        });
    },
    get: function (id: number) {
        return Content.findOne({
            where: {
                id,
            },
        });
    },
    search(pageIndex = 0, opts: any, limit = 20) {
        if (limit > 100) limit = 100;
        return Content.findAndCountAll({
            offset: pageIndex * limit,
            limit,
            where: opts,
            order: [["id", "desc"]],
        });
    },
    del(id: number) {
        id = id * 1;
        if (isNaN(id) || id === 0) return null;
        return Content.destroy({
            where: { id },
        });
    },
};
