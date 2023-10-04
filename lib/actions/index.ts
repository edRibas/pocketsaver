'use server'; // Indicates that this code runs on the server-side

import { revalidatePath } from "next/cache"; // Import revalidatePath function from Next.js cache module
import Product from "../models/product.model"; // Import the Product model
import { connectToDB } from "../mongoose"; // Import the connectToDB function
import { scrapeAmazonProduct } from "../scraper"; // Import the scrapeAmazonProduct function
import { getAveragePrice, getHighestPrice, getLowestPrice } from "../utils"; // Import utility functions
import { User } from "@/types"; // Import the User type
import { generateEmailBody, sendEmail } from "../nodemailer"; // Import email-related functions

// Define a function to scrape and store product data based on a given product URL
export async function scrapeAndStoreProduct(productUrl: string) {
  if (!productUrl) return; // If the product URL is not provided, exit the function

  try {
    connectToDB(); // Connect to the database

    const scrapedProduct = await scrapeAmazonProduct(productUrl); // Scrape product data from the provided URL

    if (!scrapedProduct) return; // If no product data is scraped, exit the function

    let product = scrapedProduct; // Initialize the product data with the scraped data

    const existingProduct = await Product.findOne({ url: scrapedProduct.url }); // Check if a product with the same URL already exists

    if (existingProduct) {

      // If the product already exists, update its price history
      const updatedPriceHistory: any = [
        ...existingProduct.priceHistory,
        { price: scrapedProduct.currentPrice }
      ];

      product = {
        ...scrapedProduct,
        priceHistory: updatedPriceHistory,
        lowestPrice: getLowestPrice(updatedPriceHistory),
        highestPrice: getHighestPrice(updatedPriceHistory),
        averagePrice: getAveragePrice(updatedPriceHistory)
      };
    }

    // Find and update the product by its URL or create a new one if it doesn't exist
    const newProduct = await Product.findOneAndUpdate(
      { url: scrapedProduct.url },
      product,
      { upsert: true, new: true }
    );

    revalidatePath(`/products/${newProduct.id}`); // Revalidate the path for the updated product

  } catch (error: any) {
    throw new Error(`Failed to update/create product ${error.message}`); // Throw an error if there's a failure
  }
}

// Define a function to get a product by its ID
export async function getProductById(productId: string) {
  try {
    connectToDB(); // Connect to the database

    const product = await Product.findOne({ _id: productId }); // Find the product by its ID
    if (!product) return null; // Return null if the product is not found
    return product;

  } catch (error) {
    console.log(error);
  }
}

// Define a function to get all products
export async function getAllProducts() {
  try {
    connectToDB(); // Connect to the database

    const products = await Product.find(); // Find all products
    return products;

  } catch (error) {
    console.log(error);
  }
}

// Define a function to get similar products based on a given product ID
export async function getSimilarProducts(productId: string) {
  try {
    connectToDB(); // Connect to the database

    const currentProduct = await Product.findById(productId); // Find the current product by its ID
    if (!currentProduct) return null; // Return null if the current product is not found

    // Find similar products (excluding the current product) and limit the result to 3 items
    const similarProducts = await Product.find({
      _id: { $ne: productId },
    }).limit(3);

    return similarProducts;

  } catch (error) {
    console.log(error);
  }
}

// Define a function to add a user's email to a product's subscribers
export async function addUserEmailToProduct(
  productId: string,
  userEmail: string
) {
  try {
    const product = await Product.findById(productId); // Find the product by its ID
    if (!product) return;

    // Check if the user's email already exists in the product's subscribers
    const userExists = product.users.some((user: User) => user.email === userEmail);

    if (!userExists) {
      // If the user's email doesn't exist, add it to the product's subscribers and send a welcome email
      product.users.push({ email: userEmail });
      await product.save();

      const emailContent = await generateEmailBody(product, "WELCOME");

      await sendEmail(emailContent, [userEmail]);
    }
  } catch (error) {
    console.log(error);
  }
}
