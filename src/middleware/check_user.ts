import { ictx } from "../extends";
import { ErrorData } from "../service/utils";

export function CheckUser(...UserType: number[]) {
    return async function (ctx: ictx, next) {
        const { token, username } = ctx.headers;

        //空参数是没登录
        if (!token || !username) {
            return (ctx.body = ErrorData("还没有登录"));
        }
        try {
            const model = null;
            if (!model) {
                return (ctx.body = ErrorData("还没有登录"));
            }
            ctx.session.user = model;
            await next();
        } catch (error) {
            console.log(error);
            return (ctx.body = ErrorData("还没有登录"));
        }
    };
}
