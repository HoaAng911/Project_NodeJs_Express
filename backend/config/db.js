import mongoose from "mongoose";
import { ENV_VARS } from "./envVars.js";

export const ConnectDB = async () => {
    try {
        const conn = await mongoose.connect(ENV_VARS.MONGO_URL)
        console.log("MongoDB connect" + conn.connection.host)
    } catch (err) {
        console.error("Error connecting to MONGODB " + err.message)
        process.exit(1)
    }
}