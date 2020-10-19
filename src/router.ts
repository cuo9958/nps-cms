import Router from "koa-router";

import test from "./api";
import category from "./api/category";
import content from "./api/content";

const router = new Router();

router.use("/api_cms/test", test);

//公共接口
router.use("/api_cms/pub/category", category);
router.use("/api_cms/pub/content", content);

//内部接口

export default router;
