import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import IUser from './user.interface';

const UserSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: false,
        },
        gender: {
            type: String,
            required: false,
        },
        phone: {
            type: String,
            required: false,
        },
        address: {
            type: String,
            required: false,
        },
        birthday: {
            type: Date,
            required: false,
        },
    },
    { timestamps: true }
);

UserSchema.pre<IUser>('save', async function (next) {
    try {
        if (!this.isModified('password')) {
            return next();
        }
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(this.password, salt);
        this.password = passwordHash;
        next();
    } catch (error: any) {
        next(error);
    }
});

UserSchema.methods.isValidPassword = async function (
    password: string
): Promise<Error | boolean> {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error: any) {
        throw new Error(error);
    }
};

export default model<IUser>('User', UserSchema);
