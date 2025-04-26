{/*import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { Subscriber } from "../models/subscriberSchema.js";
import { News } from "../models/newsSchema.js";
import nodemailer from "nodemailer";
import ErrorHandler from "../middlewares/errors.js"; // Ensure you have this

export const sendNewsletterToSubscribers = catchAsyncErrors(async (req, res, next) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return next(new ErrorHandler("Title and content are required", 400));
  }

  // Save the newsletter to the database
  const newsEntry = await News.create({ title, content });
  console.log("Newsletter saved to the database:", newsEntry); // Logging to ensure it's saved

  // Get all subscriber emails
  const subscribers = await Subscriber.find().select("email");

  if (subscribers.length === 0) {
    return next(new ErrorHandler("No subscribers found", 400));
  }

  // Email message with clickable "View More" link
  const message = `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2 style="color: #333;">${title}</h2>
      <p style="font-size: 16px; color: #555;">${content}</p>
      <p>🔗 <a href="${process.env.PORTFOLIO_URL}" target="_blank" style="color: blue;">View More</a></p>
      <p style="font-size: 14px; color: #888;">If you wish to unsubscribe, please contact support.</p>
    </div>
  `;

  // Configure email transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    service: process.env.SMTP_SERVICE,
    auth: {
      user: process.env.SMTP_MAIL,  // Correct the variable name here if necessary
      pass: process.env.SMTP_PASSWORD,
    },
  });

  let sentCount = 0;
  let failedEmails = [];

  // Log transporter details to ensure connection
  console.log("SMTP Transporter Configuration:", {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    service: process.env.SMTP_SERVICE,
  });

  // Send email to all subscribers
  for (const subscriber of subscribers) {
    try {
      console.log(`Sending email to: ${subscriber.email}`); // Log each email sending attempt

      await transporter.sendMail({
        from: process.env.SMTP_MAIL,  // Sender email (should be correct)
        to: subscriber.email,
        subject:subject , // Email subject is included
        text: `${content}\n\nView more at: ${process.env.PORTFOLIO_URL}`,  // Plain text version
        html: message,  // HTML version with clickable link
      });

      sentCount++;
      console.log(`✅ Email sent to: ${subscriber.email}`);
    } catch (error) {
      failedEmails.push(subscriber.email);
      console.error(`❌ Failed to send email to ${subscriber.email}:`, error);
    }
  }

  if (sentCount === 0) {
    return next(new ErrorHandler("Failed to send any emails.", 500));
  }

  res.status(200).json({
    success: true,
    message: `✅ Newsletter sent successfully to ${sentCount} subscribers.`,
    failed: failedEmails.length > 0 ? failedEmails : undefined,
  });
});
*/}







