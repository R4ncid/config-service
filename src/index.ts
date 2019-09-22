import {IConfig} from "config";
import express, {Request, Response} from 'express'
import bodyParser from "body-parser";

import configRouter from './modules/config'

const stop = () => {};

const server : express.Express = express();
const app = (config : IConfig):App => {

    server.use(bodyParser.json());




    server.use('/config', configRouter());


    return{
        start: async () => {

            const port: number = config.get("server.port");
            server.listen(port, () => {
                console.log(`Server started on port ${port}`)
            })
        }
    }
};




export default app;


type  App = {
    start: Function,
    stop?: Function
}