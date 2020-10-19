import Router from "koa-router";

import test from "./api";
import category from "./api/category";

const router = new Router();

router.use("/api_cms/test", test);

//公共接口
router.use("/api_cms/pub/category", category);

//内部接口

export default router;
