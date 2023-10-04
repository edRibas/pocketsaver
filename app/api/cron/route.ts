// Import necessary modules and functions
import { NextResponse } from "next/server"; // Import NextResponse for handling responses
import {
  getLowestPrice,
  getHighestPrice,
  getAveragePrice,
  getEmailNotifType,
} from "@/lib/utils"; // Import utility functions
import { connectToDB } from "@/lib/mongoose"; // Import a function to connect to the database
import Product from "@/lib/models/product.model"; // Import the Product model
import { scrapeAmazonProduct } from "@/lib/scraper"; // Import a function to scrape Amazon product information
import { generateEmailBody, sendEmail } from "@/lib/nodemailer"; // Import functions for email generation and sending

// Define constants
export const maxDuration = 300; // Maximum allowed duration for this function (in seconds)
export const dynamic = "force-dynamic"; // A dynamic flag (specific to Next.js)
export const revalidate = 0; // Revalidation setting (specific to Next.js)

// Define the GET request handler function
export async function GET(request: Request) {
  try {

    // Connect to the database
    connectToDB();

    // Retrieve all products from the database
    const products = await Product.find({});
    if (!products) throw new Error("No product found");

    // Update each product asynchronously
    const updatedProducts = await Promise.all(
      products.map(async (currentProduct) => {

        // Scrape product information from Amazon
        const scrapedProduct = await scrapeAmazonProduct(currentProduct.url);
        if (!scrapedProduct) return;

        // Update the price history of the current product
        const updatedPriceHistory = [
          ...currentProduct.priceHistory,
          { price: scrapedProduct.currentPrice },
        ];

        // Construct the updated product object
        const product = {
          ...scrapedProduct,
          priceHistory: updatedPriceHistory,
          lowestPrice: getLowestPrice(updatedPriceHistory),
          highestPrice: getHighestPrice(updatedPriceHistory),
          averagePrice: getAveragePrice(updatedPriceHistory),
        };

        // Find and update the product in the database
        const updatedProduct = await Product.findOneAndUpdate(
          { url: product.url },
          product
        );

        // Determine the email notification type based on product changes
        const emailNotifType = getEmailNotifType(
          scrapedProduct,
          currentProduct
        );

        // If there's an email notification type and users are subscribed
        if (emailNotifType && updatedProduct.users.length > 0) {

          // Prepare product information for email content
          const productInfo = {
            title: updatedProduct.title,
            url: updatedProduct.url,
            image: updatedProduct.image,
          };

          // Generate email content
          const emailContent = await generateEmailBody(
            productInfo,
            emailNotifType
          );

          // Extract user email addresses
          const userEmails = updatedProduct.users.map((user: any) => user.email);

          // Send email notifications to subscribed users
          await sendEmail(emailContent, userEmails);
        }

        // Return the updated product
        return updatedProduct;
      })
    );

    // Respond with a JSON message and the updated product data
    return NextResponse.json({
      message: "Ok",
      data: updatedProducts,
    });
  } catch (error: any) {

    // Handle errors and throw an error message
    throw new Error(`Failed to get all products: ${error.message}`);
  }
}
