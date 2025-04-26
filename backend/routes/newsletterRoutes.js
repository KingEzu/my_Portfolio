import express from "express";
import { subscribeToNewsletter, unsubscribeFromNewsletter, getAllNewsletters,sendNewsletterToSubscribers, getAllSubscribers } from "../controller/newsletterController.js";
//import { sendNewsletterToSubscribers } from "../controller/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";


const router = express.Router();

// Routes for subscribing/unsubscribing
router.post("/subscribe", subscribeToNewsletter);
router.delete("/unsubscribe/:id", unsubscribeFromNewsletter);

// Admin route to send newsletter
router.get("/subscribers", getAllSubscribers);
router.get("/newsletters", getAllNewsletters);
router.post("/send", isAuthenticated, sendNewsletterToSubscribers);

export default router;
