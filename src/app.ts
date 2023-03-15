import express, { Application } from 'express';
import mongoose from 'mongoose';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import Controller from '@/utils/interfaces/controller.interface';
import ErrorMiddleware from '@/middlewares/error.middleware';
import cloudinary from 'cloudinary';

class App {
    public express: Application;
    public port: string | number;

    constructor(controllers: Controller[], port: string | number) {
        this.express = express();
        this.port = port;

        this.connectToTheDatabase();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
        this.initializeErrorHandling();
    }

    private initializeMiddlewares() {
        this.express.use(express.json());
        this.express.use(compression());
        this.express.use(helmet());
        this.express.use(cors());
        this.express.use(morgan('dev'));
        this.express.use(express.urlencoded({ extended: true }));
        cloudinary.v2.config({
            cloud_name: 'dp81gikbd',
            api_key: '191187829285758',
            api_secret: 'O3Q5_lN-9qLGcobHHtIE-p7XAFM',
        });
    }
    private initializeErrorHandling(): void {
        this.express.use(ErrorMiddleware);
    }
    private initializeControllers(controllers: Controller[]): void {
        controllers.forEach((controller: Controller) => {
            this.express.use('/api', controller.router);
        });
    }
    private connectToTheDatabase(): void {
        const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH } = process.env;
        mongoose.set('strictQuery', false);

        mongoose.connect(
            `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`
        );
    }
    public listen(): void {
        this.express.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
}
export default App;
