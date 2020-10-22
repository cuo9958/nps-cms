import { Model, DataTypes } from "sequelize";
import db from "../db//mysql";

interface CategoryAttr {
    id: number;
    title: string;
    pid: number;
    pkey: string;
    status: number;
    remark: string;
    img: string;
}
/**
 * 文档分类
 * 可以创建多级
 */
class Category extends Model<CategoryAttr> implements CategoryAttr {
    public id!: number;
    public title!: string;
    public status: number;
    public pid: number;
    public pkey: string;
    public remark: string;
    public img: string;

    public dataValues: CategoryAttr;
}

Category.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING(20),
            defaultValue: "",
            comment: "分类标题",
        },
        pid: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            comment: "分类的上级id",
        },
        pkey: {
            type: DataTypes.STRING(20),
            defaultValue: "",
            comment: "分类的key值",
        },
        remark: {
            type: DataTypes.STRING(200),
            defaultValue: "",
            comment: "分类备注",
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
        tableName: "t_category",
        indexes: [],
    }
);

//强制初始化数据库
// Category.sync({ force: true });

export default {
    sync: (force = true) => Category.sync({ force }),
    insert: function (model: any) {
        return Category.create(model);
    },
    update(model: any, id: number) {
        return Category.update(model, {
            where: { id },
        });
    },
    get: function (id: number) {
        return Category.findOne({
            where: {
                id,
            },
        });
    },
    getByKey(pkey:string){
        return Category.findOne({
            where: {
                pkey,
            },
        });
    },
    search(pid, pkey, pageIndex = 0, limit = 20) {
        if (limit > 100) limit = 100;
        let opts: any = {};
        if (pid !== undefined) opts.pid = pid;
        if (pkey !== undefined) opts.pkey = pkey;
        return Category.findAndCountAll({
            offset: pageIndex * limit,
            limit,
            where: opts,
            order: [["id", "desc"]],
        });
    },
    del(id: number) {
        id = id * 1;
        if (isNaN(id) || id === 0) return null;
        return Category.destroy({
            where: { id },
        });
    },
};
