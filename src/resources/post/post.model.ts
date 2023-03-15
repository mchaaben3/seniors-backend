import { Schema, model } from 'mongoose';

import Post from '@/resources/post/post.interface';

const PostSchema = new Schema(
    {
        title: {
            type: String,
            required: false,
        },
        content: {
            type: String,
            required: false,
        },
        image: {
            type: String,
            required: false,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },

        likedBy: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Comment',
            },
        ],
    },
    {
        timestamps: true,
    }
);

export default model<Post>('Post', PostSchema);
