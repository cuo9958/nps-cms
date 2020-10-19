import { ictx } from "../extends";
import { ErrorData } from "../service/utils";
import NSPUtils from "nsp-utils";
import config from "config";

const ModuleConfig: any = config.get("module");
const usermudole = new NSPUtils.UserModule({ baseUrl: ModuleConfig.user });

export function CheckUser(...UserType: number[]) {
    return async function (ctx: ictx, next) {
        const { token, username } = ctx.headers;

        //空参数是没登录
        if (!token || !username) {
            return (ctx.body = ErrorData("还没有登录"));
        }
        try {
            const model = await usermudole.Auth(username, token);
            if (!model || model.user_type === undefined) {
                return (ctx.body = ErrorData("还没有登录"));
            }
            if (!UserType.includes(model.user_type)) {
                return (ctx.body = ErrorData("没有权限"));
            }
            ctx.session.user = model;
            await next();
        } catch (error) {
            console.log(error);
            return (ctx.body = ErrorData("还没有登录"));
        }
    };
}
