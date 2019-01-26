import { UserRouter } from './user/user.api';
import * as express from 'express';
import { Config } from '../configs/config';

export class MainApiRouter {
    private router: express.Router;
    
    constructor() {
        this.router = express.Router();
        this.setChildRoutes();
        this.router.get('/test', (req, res) => {
            console.log('reached test route!');
            res.send({route: 'test'});
        })
    }

    private setChildRoutes(): void {
        this.router.use(Config.ApiRoutes.USERS_API, new UserRouter().getRouter())
    }

    public getRouter(): express.Router {
        return this.router;
    }
}






