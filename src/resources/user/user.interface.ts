import { Document } from 'mongoose';

export default interface IUser extends Document {
    email: string;
    password: string;
    name: string;
    image: string;
    gender: string;
    phone: string;
    address: string;
    birthday: Date;

    isValidPassword(password: string): Promise<Error | boolean>;
}
