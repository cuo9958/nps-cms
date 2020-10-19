import Router from "koa-router";
import { SuccessData, ErrorData } from "../service/utils";
import CategoryModel from "../model/category";
import { CheckUser } from "../middleware/check_user";
import { UserType } from "../enums";

const router = new Router();

//获取分类列表
router.get("/", async function (ctx) {
    const { pageIndex, pid } = ctx.query;
    try {
        const data = await CategoryModel.search(pageIndex, pid);
        ctx.body = SuccessData(data);
    } catch (error) {
        console.log(error);
        ctx.body = ErrorData(error.message);
    }
});
//获取单个分类信息
router.get("/:id", async function (ctx) {
    const { id } = ctx.params;
    try {
        const data = await CategoryModel.get(id);
        ctx.body = SuccessData(data);
    } catch (error) {
        console.log(error);
        ctx.body = ErrorData(error.message);
    }
});
//分类添加编辑
router.post("/:id", CheckUser(UserType.YUNYING, UserType.ADMIN), async function (ctx) {
    const id = ctx.params.id;
    const { title, status, pid, remark, img } = ctx.query;
    try {
        let model: any = { title };
        if (!isNaN(status) && status >= 0) model.status = status * 1;
        if (!isNaN(pid) && pid >= 0) model.pid = pid * 1;
        if (remark) model.remark = remark;
        if (img) model.img = img;

        if (id) {
            await CategoryModel.update(model, id);
        } else {
            await CategoryModel.insert(model);
        }

        ctx.body = SuccessData(null);
    } catch (error) {
        console.log(error);
        ctx.body = ErrorData(error.message);
    }
});
//分类删除
router.delete("/:id", CheckUser(UserType.YUNYING, UserType.ADMIN), async function (ctx) {
    const id = ctx.params.id;
    try {
        await CategoryModel.del(id);
        ctx.body = SuccessData(null);
    } catch (error) {
        console.log(error);
        ctx.body = ErrorData(error.message);
    }
});
export default router.routes();
