// Import necessary libraries and functions
import axios from "axios";
import * as cheerio from "cheerio";
import { extractCurrency, extractDescription, extractPrice } from "../utils";

// Define an asynchronous function to scrape Amazon product information
export async function scrapeAmazonProduct(url: string) {

  // Check if the URL is provided, if not, return early
  if (!url) return;

  // Retrieve Bright Data username and password from environment variables
  const username = String(process.env.BRIGHT_DATA_USERNAME);
  const password = String(process.env.BRIGHT_DATA_PASSWORD);

  // Set up Bright Data proxy details
  const port = 22225;
  const session_id = (1000000 * Math.random()) | 0;
  const options = {
    auth: {
      username: `${username}-session-${session_id}`,
      password,
    },
    host: 'brd.superproxy.io',
    port,
    rejectUnauthorized: false,
  }

  try {
    // Send an HTTP GET request to the provided URL using Axios with Bright Data proxy options
    const response = await axios.get(url, options);

    // Load the HTML content of the page using Cheerio
    const $ = cheerio.load(response.data);

    // Extract the product title
    const title = $('#productTitle').text().trim();

    // Extract the current price from different possible elements
    const currentPrice = extractPrice(
      $('.priceToPay span.a-price-whole'),
      $('a.size.base.a-color-price'),
      $('.a-button-selected .a-color-base'),
    );

    // Extract the original price from different possible elements
    const originalPrice = extractPrice(
      $('#priceblock_ourprice'),
      $('.a-price.a-text-price span.a-offscreen'),
      $('#listPrice'),
      $('#priceblock_dealprice'),
      $('.a-size-base.a-color-price')
    );

    // Check if the product is out of stock
    const outOfStock = $('#availability span')
      .text().trim().toLowerCase() === 'Currenty Unavailable';

    // Extract image URLs
    const images =
      $('#imgBlkFront').attr('data-a-dynamic-image') ||
      $('#landingImage').attr('data-a-dynamic-image') ||
      '{}'
    const imageUrls = Object.keys(JSON.parse(images));

    // Extract the currency symbol
    const currency = extractCurrency($('.a-price-symbol'));

    // Extract the discount rate
    const discountRate = $('.savingsPercentage').text().replace(/[-%]/g, "");

    // Extract the product description
    const description = extractDescription($);

    // Create an object with scraped product data
    const data = {
      url,
      currency: currency || '$',
      image: imageUrls[0],
      title,
      currentPrice: Number(currentPrice) || Number(originalPrice),
      originalPrice: Number(originalPrice) || Number(currentPrice),
      priceHistory: [],
      discountRate: Number(discountRate),
      category: 'Category',
      reviewsCount: 80,
      stars: 4.8,
      isOutOfStock: outOfStock,
      description,
      lowestPrice: Number(currentPrice) || Number(originalPrice),
      highestPrice: Number(originalPrice) || Number(currentPrice),
      averagePrice: Number(currentPrice) || Number(originalPrice)
    };

    // Return the scraped product data
    return data;

  } catch (error: any) {
    // Throw an error if scraping fails
    throw new Error(`Failed to scrape the product ${error.message}`);
  }
}
