import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middlewares/validation.middleware';
import validate from '@/resources/post/post.validation';
import PostService from '@/resources/post/post.service';
import authenticated from '@/middlewares/authenticated.middleware';

import multer from 'multer';
import cloudinary from 'cloudinary';

class PostController implements Controller {
    public path = '/posts';
    public router = Router();
    private PostService = new PostService();
    constructor() {
        this.initializeRoutes();
    }
    private initializeRoutes(): void {
        const upload = multer({ dest: 'uploads/' });

        this.router.post(
            `${this.path}`,
            upload.single('image'),
            authenticated,
            validationMiddleware(validate.create),
            this.create
        );
        this.router.get(`${this.path}`, this.getAll);
        this.router.put(`${this.path}/:id`, authenticated, this.updatePost);
    }
    private create = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const localFilePath = req.file?.path || '';

            const result = await cloudinary.v2.uploader.upload(
                localFilePath,
                {
                    folder: 'seniors-app/posts',
                    use_filename: true,
                    unique_filename: false,
                    overwrite: true,
                },
                (error, result) => {}
            );

            const { title, content } = req.body;
            const post = await this.PostService.create(
                title,
                content,
                result.secure_url,
                req.user
            );
            res.status(201).send(post);
        } catch (e: any) {
            console.log(e);
            next(new HttpException(400, 'cannot create post'));
        }
    };
    private getAll = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const posts = await this.PostService.getAll();
            res.status(200).send(posts);
        } catch (e: any) {
            next(new HttpException(400, 'cannot get posts'));
        }
    };

    private updatePost = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const post = await this.PostService.update(
                req.params.id,
                req.body,
                req.user
            );
            res.status(200).send(post);
        } catch (error: any) {
            console.log(error.message);
            next(new HttpException(400, 'cannot update post'));
        }
    };
}

export default PostController;
