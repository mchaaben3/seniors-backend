import userModel from '@/resources/user/user.model';
import token from '@/utils/token';

class UserService {
    private user = userModel;

    /**
     * Register a new user
     */

    public async register(
        name: string,
        email: string,
        password: string,
        image: string,
        role: string
    ): Promise<string | Error> {
        try {
            const user = await this.user.create({
                name,
                email,
                password,
                image,
                role,
            });
            const accessToken = token.createToken(user);
            return accessToken;
        } catch (error) {
            console.log(error);

            throw new Error('Error while registering user');
        }
    }

    /**
     * Login a user
     */

    public async login(
        email: string,
        password: string
    ): Promise<string | Error> {
        try {
            const user = await this.user.findOne({ email });
            if (!user) {
                throw new Error('User not found');
            }
            if (await user.isValidPassword(password)) {
                const accessToken = token.createToken(user);
                return accessToken;
            } else {
                throw new Error('Invalid password');
            }
        } catch (error: any) {
            console.log(error);
            throw new Error(error.Error);
        }
    }

    /**
     * update a user
     * @param id
     * @param data
     * @returns
     * **/
    public async updateUser(id: string, data: any): Promise<string | Error> {
        const user = await this.user.findByIdAndUpdate(id, {
            $set: data,
        });
        if (!user) {
            throw new Error('User not found');
        }
        return 'User updated successfully';
    }
}
export default UserService;
