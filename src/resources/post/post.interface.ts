import { Document } from 'mongoose';

export default interface Post extends Document {
    title: string;
    content: string;
    image: File | string | null;
    user: string;
    likedBy: string[];
    comments: string[];
}
