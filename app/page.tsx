// Import necessary components and modules
import Herocarousel from "@/components/Herocarousel"; // Importing the Herocarousel component
import Searchbar from "@/components/Searchbar"; // Importing the Searchbar component
import Image from "next/image"; // Importing the Image component from Next.js
import { getAllProducts } from "@/lib/actions"; // Importing a function to fetch all products
import ProductCard from "@/components/ProductCard"; // Importing the ProductCard component

// Define the HomePage component as an async function
const HomePage = async () => {

  // Fetch all products using the getAllProducts function
  const allProducts = await getAllProducts();

  return (
    <>

      {/* Hero section */}
      <section className="px-6 md:px-20 py-24">
        <div className="flex max-xl:flex-col gap-16">
          <div className="flex flex-col justify-center">

            {/* Small text */}
            <p className="small-text">
              Smart Shopping Starts Here!
              <Image
                src='/assets/icons/arrow-down.svg'
                alt='Arrow Down'
                width={15}
                height={15}
              />
            </p>

            {/* Main heading */}
            <h1 className="head-text">
              Unleash the power of
              <br />
              <span className="text-primary">Price Scraping</span>
            </h1>

            {/* Description */}
            <p className="mt-6">
              Powerful, self-serve product and growth analytics to help you convert, engage, and retain more.
            </p>

            {/* Search bar */}
            <Searchbar />
          </div>

          {/* Hero carousel */}
          <Herocarousel />
        </div>
      </section>

      {/* Trending Products section */}
      <section className="trending-section">

        {/* Section heading */}
        <h2 className="section-text">Trending Products</h2>

        {/* List of product cards */}
        <div className="flex flex-wrap gap-x-8 gap-y-16">
          {allProducts?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
};

// Export the HomePage component as the default export
export default HomePage;
