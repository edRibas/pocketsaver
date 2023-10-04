import { EmailContent, EmailProductInfo, NotificationType } from '@/types';
import nodemailer from 'nodemailer';

// Define notification types as constants
const Notification = {
  WELCOME: 'WELCOME',
  CHANGE_OF_STOCK: 'CHANGE_OF_STOCK',
  LOWEST_PRICE: 'LOWEST_PRICE',
  THRESHOLD_MET: 'THRESHOLD_MET',
}

// Function to generate email body based on notification type
export async function generateEmailBody(
  product: EmailProductInfo,
  type: NotificationType
) {

  // Define a threshold percentage
  const THRESHOLD_PERCENTAGE = 35;

  // Shorten the product title if it's too long
  const shortenedTitle =
    product.title.length > 20
      ? `${product.title.substring(0, 20)}...`
      : product.title;

  let subject = "";
  let body = "";

  // Generate email content based on notification type
  switch (type) {
    case Notification.WELCOME:

      // Welcome email
      subject = `You are now tracking the price of ${shortenedTitle}`;
      body = `
        <div style="text-align:center;">
          <!-- Email content for welcoming the user -->
        </div>
      `;
      break;

    case Notification.CHANGE_OF_STOCK:

      // Product back in stock notification
      subject = `${shortenedTitle} is now back in stock!`;
      body = `
        <div>
          <!-- Email content for product back in stock notification -->
        </div>
      `;
      break;

    case Notification.LOWEST_PRICE:

      // Lowest price alert
      subject = `Lowest Price Alert for ${shortenedTitle}`;
      body = `
        <div>
          <!-- Email content for lowest price alert -->
        </div>
      `;
      break;

    case Notification.THRESHOLD_MET:

      // Discount alert
      subject = `Discount Alert for ${shortenedTitle}`;
      body = `
        <div>
          <!-- Email content for discount alert -->
        </div>
      `;
      break;

    default:
      throw new Error("Invalid notification type.");
  }

  return { subject, body };
}

// Create a nodemailer transporter with email service details
const transporter = nodemailer.createTransport({
  pool: true,
  service: 'hotmail',
  port: 2525,
  auth: {
    user: 'pocket.saver@hotmail.com',
    pass: process.env.EMAIL_PASSWORD, // Use environment variable for email password
  },
  maxConnections: 1,
})

// Function to send an email
export const sendEmail = async (
  emailContent: EmailContent,
  sendTo: string[]
) => {

  // Define email options
  const mailOptions = {
    from: 'pocket.saver@hotmail.com',
    to: sendTo,
    html: emailContent.body,
    subject: emailContent.subject,
  }

  // Send the email
  transporter.sendMail(mailOptions, (error: any, info: any) => {
    if (error) return console.log(error);

    console.log('Email sent: ', info);
  })
}
