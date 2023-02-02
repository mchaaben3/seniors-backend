import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middlewares/validation.middleware';
import validate from '@/resources/user/user.validation';
import UserService from '@/resources/user/user.service';
import authenticated from '@/middlewares/authenticated.middleware';
import cloudinary from 'cloudinary';
import multer from 'multer';

class UserController implements Controller {
    public path = '/users';
    public router = Router();
    private user = new UserService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        const upload = multer({ dest: 'uploads/' });

        this.router.post(
            `${this.path}/register`,
            upload.single('avatar'),
            this.register
        );

        this.router.post(
            `${this.path}/login`,
            validationMiddleware(validate.login),
            this.login
        );
        this.router.get(`${this.path}/me`, authenticated, this.me);
        this.router.get(`${this.path}/logout`, authenticated, this.logout);
        this.router.put(`${this.path}/me`, authenticated, this.updateUser);
    }

    private register = async (
        request: Request,
        response: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const localFilePath = request.file?.path || '';

            const result = await cloudinary.v2.uploader.upload(
                localFilePath,
                {
                    folder: 'seniors-app',
                    use_filename: true,
                    unique_filename: false,
                    overwrite: true,
                },
                (error, result) => {
                    console.log(result, error);
                }
            );

            const { name, email, password } = request.body;
            const token = await this.user.register(
                name,
                email,
                password,
                result.secure_url,
                'user'
            );
            return response.status(201).json({ token });
        } catch (error: any) {
            next(new Error('Register failed'));
        }
    };
    private login = async (
        request: Request,
        response: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { email, password } = request.body;
            const token = await this.user.login(email, password);
            return response.status(200).json({ token });
        } catch (error: any) {
            next(new Error('Login failed'));
        }
    };

    private me = (
        req: Request,
        res: Response,
        next: NextFunction
    ): Response | void => {
        if (!req.user) {
            next(new HttpException(400, 'User not found'));
        }
        return res.status(200).json({ user: req.user });
    };
    private logout = (
        req: Request,
        res: Response,
        next: NextFunction
    ): Response | void => {
        return res.status(200).json({ message: 'Logout' });
    };

    private updateUser = async (
        request: Request,
        response: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const updatedUser = await this.user.updateUser(
                request.user._id,
                request.body
            );
            return response.status(200).json({ updatedUser });
        } catch (error: any) {}
    };
}

export default UserController;
