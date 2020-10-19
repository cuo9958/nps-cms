/**
 * 默认配置
 */
module.exports = {
    name: "nsp-cms",
    //加密使用到的附加值
    dot: "dot",
    //开发环境数据库
    db: {
        host: "127.0.0.1",
        port: "3306",
        database: "database",
        user: "data-user",
        password: "1234567",
        connectionLimit: 2,
    },
    //开发环境，普通redis配置
    redis: {
        port: 6379,
        host: "127.0.0.1",
        password: "123456",
    },
    //服务调用的通行证
    pass_check: "123",
    //依赖模块的地址
    module: {
        user: "http://127.0.0.1:18900",
    },
};
