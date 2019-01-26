import * as express from 'express'
import * as jwt from 'jsonwebtoken';

import { User, UserModel } from '../../model/user.model';
import { Config } from '../../configs/config';

export class UserRouter {
    
    private router: express.Router;

    constructor() {
        this.router = express.Router();
        this.setLoginRoute();
        this.setSignupRoute();

        this.router.get('/', ()=> {
            console.log('reached the user api...')
        })
    };

    public getRouter(): express.Router {
        return this.router;
    }

    private setLoginRoute(): void {
        this.router.post('/signin', (req: express.Request, res:express.Response) => {
            console.log('you have reached the completed login route..');

            User.findOne({username: req.body.username}).then( (user: UserModel) => {
                user.comparePassword(req.body.password).then(isMatch => {
                    if (isMatch) {
                        user.password = null;
                        const token = jwt.sign(user.toJSON(), Config.SECRETJWTSIGN, {expiresIn: 3600 * 24 * 7});                      
                        return res.status(200).send({success:true, user, token});
                    } else {
                        return res.status(403).send({success: false, error: 'Unable to login' });
                    }
                }).catch(err => {
                    console.log(err);
                    res.status(500).send({success: false, error: err});
                });
    
            }).catch(err => res.status(500).send({success: false, error: err}));
        });
    }


    private setSignupRoute(): void {
        this.router.post('/signup', (req: express.Request, res:express.Response) => {
            console.log('you have reached the signup route.!.');
            const user = new User(req.body);
            console.log(user);
            
            user.save(undefined, (err, user: UserModel) => {
                if (err) {
                    console.log('ERROR:', err);
                    return res.send({success: false, error: err})
                } else {
                    console.log('User has been saved successfully:', user);
                    user.password = null;
                    return res.status(200).send({success: true, user})
                }
            });
        });
    }
}