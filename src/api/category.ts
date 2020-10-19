import Router from "koa-router";
import { SuccessData, ErrorData } from "../service/utils";
import CategoryModel from "../model/category";

const router = new Router();

//获取分类
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

export default router.routes();
