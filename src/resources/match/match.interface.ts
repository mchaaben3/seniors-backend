import { Document } from 'mongoose';
import IUser from '../user/user.interface';

export default interface IMatch extends Document {
    userSenderID: IUser | string;
    userReceiverID: string;
    userSenderIsLiked: boolean;
    userReceiverIsLiked: boolean;
    status: string;
}
