import authenticated from '@/middlewares/authenticated.middleware';
import MatchService from '@/resources/match/match.service';
import HttpException from '@/utils/exceptions/http.exception';
import Controller from '@/utils/interfaces/controller.interface';
import { NextFunction, Request, Response, Router } from 'express';

class MatchController implements Controller {
    public path = '/like';
    public router = Router();
    private MatchService = new MatchService();
    constructor() {
        this.initializeRoutes();
    }
    private initializeRoutes(): void {
        this.router.post(`${this.path}`, authenticated, this.like);
        // this.router.get(`${this.path}`, authenticated, this.getAllLikes);
        this.router.put(`${this.path}`, authenticated, this.match);
        this.router.get(`${this.path}/verify`, authenticated, this.getLike);
    }
    private like = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const userSenderID = req.user;
            const { userReceiverID } = req.body;

            await this.MatchService.create(userSenderID, userReceiverID);
            res.status(201).send('you liked this user');
        } catch (e: any) {
            next(new HttpException(500, e.message));
        }
    };
    // private getAllLikes = async (
    //     req: Request,
    //     res: Response,
    //     next: NextFunction
    // ): Promise<Response | void> => {
    //     try {
    //         const user = req.user;
    //         const likes = await this.MatchService.getAllLikes(user);
    //         res.status(200).send({
    //             likes,
    //             numOfLikes: likes.length,
    //         });
    //     } catch (error: any) {
    //         next(new HttpException(500, error.message));
    //     }
    // };

    private match = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<string | void> => {
        try {
            const userSenderID = req.user;
            const { userReceiverID } = req.body;
            await this.MatchService.matching(userSenderID, userReceiverID);

            res.status(200).send('you matched with this user');
        } catch (e: any) {
            next(new HttpException(500, e.message));
        }
    };

    private getLike = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Boolean | void> => {
        try {
            const userSenderID = req.user;
            const { userReceiverID } = req.body;
            const result = await this.MatchService.getLike(
                userSenderID,
                userReceiverID
            );

            res.status(200).send(result);
        } catch (e: any) {
            next(new HttpException(500, e.message));
        }
    };
}

export default MatchController;
