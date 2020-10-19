import { RouterContext } from "koa-router";

export interface ictx extends RouterContext {
    session: iSession;
}
interface iSession {
    user: IUser;
}
interface IUser {
    id: number;
    user_type: number;
    username: string;
    nickname: string;
    uuid: string;
}
