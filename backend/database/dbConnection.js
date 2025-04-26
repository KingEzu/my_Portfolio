import mongoose from "mongoose";

const dbConnection = () => {
    mongoose
        .connect(process.env.MONGO_URI, {
            dbName: "PORTFOLIO",
           
    })
    .then(() => {
        console.log("connected to database.");


    })
    .catch((error) => {
        console.log(`Some Error Occured While Connecting To Database: ${error}`);
    });
};
export default dbConnection;