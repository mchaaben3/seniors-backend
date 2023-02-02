import { Document } from 'mongoose';

export default interface IUser extends Document {
    email: string;
    password: string;
    name: string;
    role: string;
    photo: string;
    isValidPassword(password: string): Promise<Error | boolean>;
}
