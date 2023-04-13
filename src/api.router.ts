import * as Router from 'koa-router';

const router = new Router();

router.post('/search/list', async (ctx) => {
    // const params = ctx.request.query;
    console.log(ctx.request.query);
    ctx.body = '获取数据';
});

export { router };