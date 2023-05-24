import User from '@/models/user';
import { connectToDb } from '@/utils/database';

export const GET = async (
    req: Request,
    { params }: { params: { id: string } },
) => {
    try {
        await connectToDb();

        const user = await User.findOne({ username: params.id }).exec();
        console.log(user);
        return new Response(JSON.stringify(user), { status: 200 });
    } catch (error) {
        return new Response('Failed to fetch the user', { status: 500 });
    }
};
