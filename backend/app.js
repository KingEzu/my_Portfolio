import express, { application } from "express";
import dotenv from "dotenv";
import cors from "cors"
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import dbConnection from "./database/dbConnection.js";
import {errorMiddleware} from "./middlewares/errors.js" 
import messageRouter from "./routes/messageRoutes.js"
import userRouter from "./routes/userRoutes.js";
import timelineRouters from "./routes/timelineRouters.js";
import softwareApplication from "./routes/softwareApplicatinRoutes.js";
import skillRouter from "./routes/skillRoutes.js";
import projectRouter from "./routes/projectsRouters.js";
import newsletterRoutes from "./routes/newsletterRoutes.js";


const app = express();
dotenv.config({path: "./config/config.env"});

app.use(cors({
    origin:[process.env.PORTFOLIO_URL, process.env.DASHBOARD_URL],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,

})
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
})
);

app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/timeline", timelineRouters);
app.use("/api/v1/softwareApplication", softwareApplication);
app.use("/api/v1/skill", skillRouter);
app.use("/api/v1/project", projectRouter);
app.use("/api/v1/newsletter", newsletterRoutes);




dbConnection();
app.use(errorMiddleware);


export default app;
 