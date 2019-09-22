import InMemoryConfigRepo  from './repo/in-memory-config-repo';

export default  () => {


    const router = require('express').Router();

    const repo = new InMemoryConfigRepo();

    // @ts-ignore
    router.get('/:key', async(req, res) => {
        const data = await repo.get(req.params.key)
        return res.json(data)
    })

    // @ts-ignore
    router.post('/:key', async(req, res) => {
        const data = await repo.set(req.params.key, req.body);
        return res.json(data)
    })

    return router
}