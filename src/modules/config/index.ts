import InMemoryConfigRepo  from './repo/in-memory-config-repo';
import express, {Request, Response} from 'express'
export default  () => {


    const router = require('express').Router();

    const repo = new InMemoryConfigRepo();


    router.get('/:key', async(req: Request, res: Response) => {
        const data = await repo.get(req.params.key)
        return res.json(data)
    });


    router.post('/:key', async(req: Request, res: Response) => {
        const data = await repo.set(req.params.key, req.body);
        return res.json(data)
    });

    return router
}