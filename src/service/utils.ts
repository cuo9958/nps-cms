/**
 * 返回成功的信息
 * @param data 返回数据
 * @param code 状态码
 */
export function SuccessData(data: any, code = 1) {
    return {
        data,
        code,
    };
}
/**
 * 返回失败的消息
 * @param msg 失败信息
 * @param code 状态码
 */
export function ErrorData(msg: string, code = 0) {
    return {
        msg,
        code,
    };
}
