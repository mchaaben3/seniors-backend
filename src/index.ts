import 'dotenv/config';
import 'module-alias/register';
import validateEnv from '@/utils/validateEnv';
import App from './app';
import PostController from '@/resources/post/post.controller';
import UserController from '@/resources/user/user.controller';
import MatchController from './resources/match/match.controller';

const app = new App(
    [new PostController(), new UserController(), new MatchController()],
    Number(process.env.PORT) || 3000
);

app.listen();

validateEnv();
