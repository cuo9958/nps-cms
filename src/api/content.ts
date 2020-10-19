import Router from "koa-router";
import { SuccessData, ErrorData } from "../service/utils";
import ContentModel from "../model/content";
import { CheckUser } from "../middleware/check_user";
import { UserType } from "../enums";

const router = new Router();

//根据分类获取内容列表
router.get("/", async function (ctx) {
    const { pageIndex, cid } = ctx.query;
    try {
        let opts: any = {};
        if (cid !== undefined) opts.cid = cid;
        const data = await ContentModel.search(pageIndex, opts);
        ctx.body = SuccessData(data);
    } catch (error) {
        console.log(error);
        ctx.body = ErrorData(error.message);
    }
});

//获取单个文档内容
router.get("/:id", async function (ctx) {
    const { id } = ctx.params;
    try {
        const data = await ContentModel.get(id);
        ctx.body = SuccessData(data);
    } catch (error) {
        console.log(error);
        ctx.body = ErrorData(error.message);
    }
});
//添加编辑
router.post("/:id", CheckUser(UserType.YUNYING, UserType.ADMIN), async function (ctx) {
    const id = ctx.params.id;
    const { title, status, cid, remark, img, txts } = ctx.query;
    try {
        let model: any = { title, txts };
        if (!isNaN(status) && status >= 0) model.status = status * 1;
        if (!isNaN(cid) && cid >= 0) model.pid = cid * 1;
        if (remark) model.remark = remark;
        if (img) model.img = img;

        if (id) {
            await ContentModel.update(model, id);
        } else {
            await ContentModel.insert(model);
        }

        ctx.body = SuccessData(null);
    } catch (error) {
        console.log(error);
        ctx.body = ErrorData(error.message);
    }
});
//删除
router.delete("/:id", CheckUser(UserType.YUNYING, UserType.ADMIN), async function (ctx) {
    const id = ctx.params.id;
    try {
        await ContentModel.del(id);
        ctx.body = SuccessData(null);
    } catch (error) {
        console.log(error);
        ctx.body = ErrorData(error.message);
    }
});
export default router.routes();
