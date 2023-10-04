'use client'; // Indicates that this code runs on the client-side

import { scrapeAndStoreProduct } from "@/lib/actions"; // Import the scrapeAndStoreProduct function from a module
import { FormEvent, useState } from "react"; // Import FormEvent and useState from React

// Define a function to check if a given URL is a valid Amazon product URL
const isValidAmazonProductURL = (url: string) => {
  try {
    const parsedURL = new URL(url); // Parse the URL string
    const hostname = parsedURL.hostname; // Get the hostname from the parsed URL

    // Check if the hostname contains 'amazon.com', 'amazon.', or ends with 'amazon'
    if (
      hostname.includes('amazon.com') ||
      hostname.includes('amazon.') ||
      hostname.endsWith('amazon')
    ) {
      return true; // Return true if it's a valid Amazon URL
    }
  } catch (error) {
    return false; // Return false if there's an error parsing the URL
  }
  return false; // Return false by default if it doesn't meet the criteria
}

// Define the Searchbar component
const Searchbar = () => {
  const [searchPrompt, setSearchPrompt] = useState(''); // State for the search input value
  const [isLoading, setIsLoading] = useState(false); // State to track loading state

  // Define a function to handle form submission
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission behavior

    const isValidLink = isValidAmazonProductURL(searchPrompt); // Check if the input URL is valid

    if (!isValidLink) {
      return alert('Provide a valid Amazon link'); // Display an alert for an invalid URL
    }

    try {
      setIsLoading(true); // Set loading state to true

      // Scrape and store product data using the provided URL
      const product = await scrapeAndStoreProduct(searchPrompt);
    } catch (error) {
      console.log(error); // Log any errors that occur during the process
    } finally {
      setIsLoading(false); // Set loading state back to false, whether successful or not
    }
  }

  return (
    <form
      className="flex flex-wrap gap-4 mt-12"
      onSubmit={handleSubmit} // Attach the form submission handler
    >

      <input
        type="text"
        value={searchPrompt}
        onChange={(e) => setSearchPrompt(e.target.value)} // Update searchPrompt state on input change
        placeholder="Enter product link"
        className="searchbar-input" // Apply CSS styles to the input
      />

      <button
        type="submit"
        className="searchbar-btn"
        disabled={searchPrompt === ''} // Disable the button if searchPrompt is empty
      >
        {isLoading ? 'Searching...' : 'Search'} {/* Display appropriate text based on loading state */}
      </button>
    </form>
  )
}

export default Searchbar; // Export the Searchbar component as the default export
