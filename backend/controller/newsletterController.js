import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { Subscriber } from "../models/subscriberSchema.js";
import { News } from "../models/newsSchema.js";  // ✅ Import News model
//import { sendEmail } from "../utils/sendEmail.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import crypto from "crypto";





import ErrorHandler from "../middlewares/errors.js"; // Ensure you have this

// Subscribe to Newsletter

export const subscribeToNewsletter = catchAsyncErrors(async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: "Email is required" });
  }

  // Check if the email is already subscribed and verified
  let subscriber = await Subscriber.findOne({ email });

  if (subscriber && subscriber.verified) {
    return res.status(400).json({ success: false, message: "Already subscribed" });
  }

  // Generate verification token
  const verificationToken = crypto.randomBytes(32).toString("hex");

  // Create or update the subscriber only if the subscription is successful
  if (!subscriber) {
    // Create new subscriber only if not found
    subscriber = new Subscriber({
      email,
      verificationToken,
      verified: false,
    });
  } else {
    // If subscriber exists but is not verified, update the verification token
    subscriber.verificationToken = verificationToken;
    subscriber.verified = false; // Ensure it's not verified until the link is clicked
  }

  // Email verification link
  const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;

  // Create a transport for nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_MALI,  // Your Gmail address
      pass: process.env.SMTP_PASSWORD,  // Your Gmail password or app-specific password
    },
  });

  // Mail options
  const mailOptions = {
    from: process.env.SMTP_MALI,
    to: email,
    subject: 'Email Verification for Subscription',
    html: `
      <h1>Thank you for subscribing!</h1>
      <p>Please verify your email address by clicking the link below:</p>
      <a href="${verificationLink}">Verify Email</a>
    `,
  };

  // Send the email
  try {
    // Send the email first, only then save the subscriber
    await transporter.sendMail(mailOptions);

    // After successfully sending the email, save the subscriber to the database
    await subscriber.save();

    return res.status(200).json({
      success: true,
      message: "Subscription successful! Please check your inbox to verify your email.",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({
      success: false,
      message: "Error sending verification email. Please try again.",
    });
  }
});
// Unsubscribe from Newsletter
export const unsubscribeFromNewsletter = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params; // Get ID from request parameters

  if (!id) {
    return res.status(400).json({ success: false, message: "Subscriber ID is required" });
  }

  const subscriber = await Subscriber.findById(id);

  if (!subscriber) {
    return res.status(404).json({ success: false, message: "Subscriber not found" });
  }

  await Subscriber.findByIdAndDelete(id);

  res.status(200).json({ success: true, message: "Unsubscribed successfully!" });
});


// Get all newsletters


//et all subscribers (Admin Only)
export const getAllSubscribers = catchAsyncErrors(async (req, res, next) => {
  const subscribers = await Subscriber.find().select("email createdAt");

  if (subscribers.length === 0) {
    return res.status(404).json({ success: false, message: "No subscribers found" });
  }

  res.status(200).json({ success: true, subscribers });
});



export const sendNewsletterToSubscribers = catchAsyncErrors(async (req, res, next) => {
  const { subject, text } = req.body;

  if (!subject || !text) {
    return next(new ErrorHandler("Title and text are required", 400));
  }

  // Save the newsletter to the database
  const newsEntry = await News.create({ subject, text });
  console.log("Newsletter saved to the database:", newsEntry); // Logging to ensure it's saved

  // Get all subscriber emails
  const subscribers = await Subscriber.find().select("email");

  if (subscribers.length === 0) {
    return next(new ErrorHandler("No subscribers found", 400));
  }

  // Email message with clickable "View More" link
  const message = `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2 style="color: #333;">${subject}</h2>
      <p style="font-size: 16px; color: #555;">${text}</p>
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
      user: process.env.SMTP_MALI, // Correct the variable name here if necessary
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
        from: process.env.SMTP_MALI, // Sender email (should be correct)
        to: subscriber.email,
        subject: subject, // Use the subject directly
        text: `${text}\n\nView more at: ${process.env.PORTFOLIO_URL}`,  // Use the text directly
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
export const getAllNewsletters = catchAsyncErrors(async (req, res, next) => {
  // Fetch all newsletters from the database
  const newsletters = await News.find().sort({ createdAt: -1 }); // Sort by creation date (latest first)

  if (newsletters.length === 0) {
    return res.status(404).json({ success: false, message: "No newsletters found" });
  }

  res.status(200).json({ success: true, newsletters });
});