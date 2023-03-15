import postModel from '@/resources/post/post.model';
import Post from '@/resources/post/post.interface';
class PostService {
    private post = postModel;
    /**cloudinary config */
    constructor() {
        //cloudinary config
    }

    public async create(
        title: String,
        content: String,
        image: String,
        user: any
    ): Promise<Post> {
        try {
            const post = await this.post.create({
                title,
                content,
                image,
                user,
            });

            return post;
        } catch (error: any) {
            throw new Error('Unable to create post');
        }
    }

    public async getAll(): Promise<Post[]> {
        try {
            const posts = await this.post.find().populate('user');
            return posts;
        } catch (error: any) {
            throw new Error('Unable to get posts');
        }
    }

    public async update(
        params: any,
        body: any,
        user: any
    ): Promise<Post | null> {
        try {
            const post = await this.post.findById(params);

            if (!post) {
                throw new Error('Post not found');
            }
            if (post.user.toString() !== user._id.toString()) {
                console.log({
                    postUser: post.user,
                    user: user._id,
                });
                throw new Error('User not authorized');
            }

            const updatedPost = await this.post.findByIdAndUpdate(params, {
                $set: body,
            });

            return updatedPost;
        } catch (error: any) {
            console.log(error.message);
            throw new Error('Unable to update post');
        }
    }
}
export default PostService;
