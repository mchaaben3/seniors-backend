import User from '@/resources/user/user.interface';
import Token from '@/utils/interfaces/token.interface';
import jwt from 'jsonwebtoken';

export const createToken = (user: User): string => {
    const expiresIn = 360 * 360; // an hour
    const secret = process.env.JWT_SECRET;

    return jwt.sign({ id: user._id }, secret as jwt.Secret, { expiresIn });
};

export const verifyToken = async (
    token: string
): Promise<jwt.VerifyErrors | Token> => {
    return new Promise((resolve, reject) => {
        jwt.verify(
            token,
            process.env.JWT_SECRET as jwt.Secret,
            (err, payload) => {
                if (err) return reject(err);
                resolve(payload as Token);
            }
        );
    });
};

export default { createToken, verifyToken };
