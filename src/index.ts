import * as Koa from 'koa';
import * as Router from 'koa-router';

import { router as api } from './api.router';
import { getLog } from './utils/logger';

const app = new Koa();
const router = new Router();

// 添加路由
router.use('/api', api.routes());
app.use(router.routes()).use(router.allowedMethods());
// logger
app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const end = Date.now();
    logger.info(`[${ctx.method}] ${ctx.url} ${ctx.response.status} cost ${(end - start) / 1000}s`);
});


const logger = getLog();
console.log = (...info) => {
    logger.info(...info);
}

app.listen(5000);