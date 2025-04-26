import express from "express";
import { 
        getAllMessage, 
        sendMessage, 
        deleteAllMessages,
        deleteMessage 
} from "../controller/messageController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/send", sendMessage);
router.get("/getall", getAllMessage);

router.delete("/deleteall", isAuthenticated, deleteAllMessages);
router.delete("/delete/:id", isAuthenticated, deleteMessage);
export default router;
