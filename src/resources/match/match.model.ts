import { model, Schema } from 'mongoose';
import IMatch from './match.interface';

const MatchSchema = new Schema(
    {
        userSenderID: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        userReceiverID: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        userSenderIsLiked: {
            type: Boolean,
            default: true,
        },
        userReceiverIsLiked: {
            type: Boolean,
            default: false,
        },
        status: {
            type: String,
            enum: ['pending', 'accepted', 'rejected'],
            default: 'pending',
        },
    },
    { timestamps: true }
);

export default model<IMatch>('Match', MatchSchema);
