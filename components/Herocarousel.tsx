'use client'; // Enable client-side rendering for this module

// Import necessary styles and components
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import styles for the carousel
import { Carousel } from 'react-responsive-carousel'; // Import the Carousel component from 'react-responsive-carousel'
import Image from "next/image"; // Import the Image component from Next.js

// Define an array of hero images with their URLs and alt text
const heroImages = [
  { imgUrl: 'assets/images/hero-1.svg', alt: 'Smartwatch' },
  { imgUrl: 'assets/images/hero-2.svg', alt: 'Bag' },
  { imgUrl: 'assets/images/hero-3.svg', alt: 'Lamp' },
  { imgUrl: 'assets/images/hero-4.svg', alt: 'Air Fryer' },
  { imgUrl: 'assets/images/hero-5.svg', alt: 'Chair' }
];

// Define the Herocarousel component
const Herocarousel = () => {
  return (
    <div className="hero-carousel">

      {/* Define a responsive carousel using the Carousel component */}
      <Carousel
        showThumbs={false} // Hide thumbnail navigation
        infiniteLoop // Enable infinite loop for the carousel
        autoPlay // Uncomment this line to enable automatic carousel playback
        interval={3500} // Set the autoplay interval (in milliseconds)
        showArrows={false} // Hide arrow navigation
        showStatus={false} // Hide status indicators
      >
        {/* Map through the heroImages array and display each image */}
        {heroImages.map((image) => (
          <Image
            src={image.imgUrl}
            alt={image.alt}
            width={484}
            height={484}
            className="object-contain" // Apply CSS styles to the image
            key={image.alt} // Use alt text as a unique key for React
          />
        ))}
      </Carousel>

      {/* Display an arrow image at a specific position */}
      <Image
        src='assets/icons/hand-drawn-arrow.svg'
        alt='Arrow'
        width={175}
        height={175}
        className="max-xl:hidden absolute -left-[18%] -bottom-[3%] z-0" // Apply CSS styles to the arrow image
      />
    </div>
  );
};

// Export the Herocarousel component as the default export
export default Herocarousel;
