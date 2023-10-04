import React from "react"; // Import the React library
import { Product } from "@/types"; // Import the Product type
import Link from "next/link"; // Import the Link component from Next.js
import Image from "next/image"; // Import the Image component from Next.js

// Define the Props interface for the ProductCard component
interface Props {
  product: Product; // The product data to be displayed in the card
}

// Define the ProductCard component
const ProductCard = ({ product }: Props) => {
  return (
    <Link
      href={`/products/${product._id}`} // Create a link to the product details page with the product's ID
      className="product-card" // Apply CSS styles to the link
    >
      <div className="product-card_img_container">

        {/* Display the product image */}
        <Image
          src={product.image} // Image source URL
          alt={product.title} // Alt text for the image
          width={200} // Width of the image
          height={200} // Height of the image
          className="product-card_img" // Apply CSS styles to the image
        />
      </div>

      <div className="flex flex-col gap-3">

        {/* Display the product title */}
        <h3 className="product-title">{product.title}</h3>

        <div className="flex justify-between">

          {/* Display the product category */}
          <p className="text-black opacity-60 text-lg capitalize">
            {product.category}
          </p>

          {/* Display the product currency and current price */}
          <p className="text-black text-lg font-semibold">
            <span>{product?.currency}</span>
            <span>{product?.currentPrice}</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

// Export the ProductCard component as the default export
export default ProductCard;
