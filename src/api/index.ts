import Router from "koa-router";

const router = new Router();

router.all("/", function (ctx, next) {
    ctx.body = "测试接口";
});

export default router.routes();
