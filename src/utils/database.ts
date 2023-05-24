import mongoose, { ConnectOptions } from 'mongoose';

let isConnected = false;

export const connectToDb = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log('MongoDB is already connected');
    }

    try {
        await mongoose.connect(
            process.env.MONGODB_URI as string,
            {
                dbName: 'share_prompt',
                useNewUrlParser: true,
                useUnifiedTopology: true,
            } as ConnectOptions,
        );
        isConnected = true;
        console.log('MongoDB connected');
    } catch (error) {
        console.log(error);
    }
};
