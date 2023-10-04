// Import necessary components and modules
import Modal from "@/components/Modal"; // Import the Modal component
import PriceInfoCard from "@/components/PriceInfoCard"; // Import the PriceInfoCard component
import ProductCard from "@/components/ProductCard"; // Import the ProductCard component
import { getProductById, getSimilarProducts } from "@/lib/actions"; // Import functions for fetching product details
import { formatNumber } from "@/lib/utils"; // Import a utility function for formatting numbers
import { Product } from "@/types"; // Import the Product type
import Image from "next/image"; // Import the Image component from Next.js
import Link from "next/link"; // Import the Link component from Next.js
import { redirect } from "next/navigation"; // Import the redirect function from Next.js

// Define the Props type
type Props = {
  params: { id: string };
};

// Define the ProductDetails component as an async function
const ProductDetails = async ({ params: { id } }: Props) => {

  // Fetch product details by ID
  const product: Product = await getProductById(id);

  // If the product does not exist, redirect to the home page
  if (!product) redirect('/');

  // Fetch similar products
  const similarProducts = await getSimilarProducts(id);

  return (
    <div className="product-container">
      <div className="flex gap-28 xl:flex-row flex-col">
        <div className="product-image">
          <Image
            src={product.image}
            alt={product.title}
            width={380}
            height={300}
            className="mx-auto"
          />
        </div>

        <div className="flex-1 flex flex-col">
          <div className="flex justify-between items-start gap-5 flex-wrap pb-6">
            <div className="flex flex-col gap-3">

              {/* Product title */}
              <p className="text-[28px] text-secondary font-semibold">
                {product.title}
              </p>

              {/* Link to the product on Amazon */}
              <Link
                href={product.url}
                target="_blank"
                className="text-base text-black opacity-70"
              >
                Visit this product on{" "}
                <span className="text-orange-600 opacity-100">Amazon</span>
              </Link>
            </div>

            <div className="flex items-center gap-3">

              {/* Product heart icon and review count */}
              <div className="product-hearts">
                <Image
                  src="/assets/icons/red-heart.svg"
                  alt="Red Heart"
                  width={20}
                  height={20}
                />

                <p className="text-base font-semibold text-[#D46F77]">
                  {product.reviewsCount}
                </p>
              </div>

              {/* Bookmark and share icons */}
              <div className="p-2 bg-white-200 rounded-10">
                <Image
                  src="/assets/icons/bookmark.svg"
                  alt="Bookmark"
                  width={20}
                  height={20}
                />
              </div>

              <div className="p-2 bg-white-200 rounded-10">
                <Image
                  src="/assets/icons/share.svg"
                  alt="Share"
                  width={20}
                  height={20}
                />
              </div>
            </div>
          </div>

          <div className="product-info">
            <div className="flex flex-col gap-2">

              {/* Current price */}
              <p className="text-[34px] text-secondary font-bold">
                {product.currency} {formatNumber(product.currentPrice)}
              </p>

              {/* Original price (strikethrough) */}
              <p className="text-[21px] text-black opacity-50 line-through">
                {product.currency} {formatNumber(product.originalPrice)}
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex gap-3">

                {/* Star rating */}
                <div className="product-stars">
                  <Image
                    src="/assets/icons/star.svg"
                    alt="Star"
                    width={16}
                    height={16}
                  />

                  <p className="text-sm text-primary-orange font-semibold">
                    {product.stars || "20"}
                  </p>
                </div>

                {/* Reviews count */}
                <div className="product-reviews">
                  <Image
                    src="/assets/icons/comment.svg"
                    alt="Comment"
                    width={16}
                    height={16}
                  />

                  <p className="text-sm text-secondary font-semibold">
                    {product.reviewsCount} Reviews
                  </p>
                </div>
              </div>

              {/* Recommendation percentage */}
              <p className="text-sm text-black opacity-70">
                <span className="text-primary-green font-semibold">90%</span> of buyers have recommended this product.
              </p>
            </div>
          </div>

          <div className="my-7 flex flex-col gap-5">
            <div className="flex gap-5 flex-wrap">

              {/* Price information cards */}
              <PriceInfoCard
                title="Current Price"
                iconSrc="/assets/icons/price-tag.svg"
                value={`${product.currency} ${formatNumber(product.currentPrice)}`}
              />

              <PriceInfoCard
                title="Average Price"
                iconSrc="/assets/icons/chart.svg"
                value={`${product.currency} ${formatNumber(product.averagePrice)}`}
              />

              <PriceInfoCard
                title="Highest Price"
                iconSrc="/assets/icons/arrow-up.svg"
                value={`${product.currency} ${formatNumber(product.highestPrice)}`}
              />

              <PriceInfoCard
                title="Lowest Price"
                iconSrc="/assets/icons/arrow-down.svg"
                value={`${product.currency} ${formatNumber(product.lowestPrice)}`}
              />
            </div>
          </div>

          {/* Modal for additional product details */}
          <Modal productId={id} />
        </div>
      </div>

      <div className="flex flex-col gap-16">
        <div className="flex flex-col gap-5">
          {/* Product description heading */}
          <h3 className="text-2xl text-seconday font-semibold">
            Product Description
          </h3>

          <div className="flex flex-col gap-4">

            {/* Product description content */}
            {product?.description?.split('\n')}
          </div>
        </div>

        <button className="btn w-fit mx-auto flex items-center justify-center gap-3 min-w-[200px]">

          {/* Buy Now button */}
          <Image
            src="/assets/icons/bag.svg"
            alt="Check"
            width={22}
            height={22}
          />

          <Link href="/" className="text-base text-white">
            Buy Now
          </Link>
        </button>
      </div>

      {/* Display similar products if available */}
      {similarProducts && similarProducts?.length > 0 && (
        <div className="py-14 flex flex-col gap-2 w-full">
          <p className="section-text">You may also like...</p>

          <div className="flex flex-wrap gap-10 mt-7 w-full">

            {/* Render similar products using ProductCard component */}
            {similarProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Export the ProductDetails component as the default export
export default ProductDetails;
