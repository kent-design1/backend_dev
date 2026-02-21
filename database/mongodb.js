import mongoose from "mongoose";

import {DB_URI, NODE_ENV} from "../env.js";


if(!DB_URI){
    throw new Error("MongoDB URI doesn't exist");
}

const connectdb = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log(`MongoDB Connected on ${NODE_ENV}`);
    }
    catch(error){
        console.error('Error connecting to MongoDB', error);

        process.exit(1);
    }

}

export default connectdb;