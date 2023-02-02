import { cleanEnv, str, port } from 'envalid';

function validateEnv(): void {
    cleanEnv(process.env, {
        NODE_ENV: str({
            choices: ['development', 'production', 'test', 'provision'],
        }),
        MONGO_PATH: str(),
        MONGO_USER: str(),
        MONGO_PASSWORD: str(),
        PORT: port({ default: 3000 }),
        JWT_SECRET: str(),
    });
}
export default validateEnv;
