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
}
export default PostService;
