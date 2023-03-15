import Match from '@/resources/match/match.interface';
import matchModel from '@/resources/match/match.model';
import IUser from '../user/user.interface';

class MatchService {
    private match = matchModel;

    public async findLike(
        userSenderID: IUser | string,
        userReceiverID: IUser | string
    ): Promise<Match | null> {
        try {
            const like = await this.match.findOne({
                userSenderID,
                userReceiverID,
            });

            return like;
        } catch (error: any) {
            throw new Error('Unable to find like');
        }
    }

    public async create(
        userSenderID: IUser | string,
        userReceiverID: any
    ): Promise<Match> {
        try {
            const findLike = await this.findLike(userSenderID, userReceiverID);
            if (findLike) {
                throw new Error('Like already exists');
            }
            const like = await this.match.create({
                userSenderID,
                userReceiverID,
                userSenderIsLiked: true,
            });

            return like;
        } catch (error: any) {
            console.log(error.message);
            throw new Error('Unable to create match');
        }
    }

    // public async getAllLikes(user: any): Promise<Match[]> {
    //     try {
    //         const likes = await this.match.find({
    //             user1: user,
    //         });

    //         return likes;
    //     } catch (error: any) {
    //         throw new Error('Unable to get likes');
    //     }
    // }
    public async matching(
        userSenderID: IUser | string,
        userReceiverID: any
    ): Promise<Match | null> {
        try {
            console.log(userSenderID, userReceiverID);
            //update match
            const match = await this.match.findOneAndUpdate(
                {
                    userSenderID: userReceiverID,
                    userReceiverID: userSenderID,
                },
                {
                    userReceiverIsLiked: true,
                    status: 'matched',
                },
                {
                    new: true,
                }
            );
            console.log(match);
            return match;
        } catch (error: any) {
            console.log(error.message);
            throw new Error('Unable to match');
        }
    }

    public async getLike(
        userSenderID: IUser | string,
        userReceiverID: any
    ): Promise<Boolean> {
        try {
            let bool = false;
            const like = await this.findLike(userSenderID, userReceiverID);

            if (like) {
                bool = true;
            } else {
                bool = false;
            }
            return bool;
        } catch (error: any) {
            console.log(error.message);
            throw new Error('Unable to create match');
        }
    }
}

export default MatchService;
