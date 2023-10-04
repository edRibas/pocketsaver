import Image from 'next/image'; // Import the Image component from Next.js
import Link from 'next/link'; // Import the Link component from Next.js

// Define an array of navigation icons with their image sources and alt text
const navIcons = [
  { src: '/assets/icons/search.svg', alt: 'Search' },
  { src: '/assets/icons/black-heart.svg', alt: 'Heart' },
  { src: '/assets/icons/user.svg', alt: 'User' },
];

// Define the Navbar component
const Navbar = () => {
  return (
    <header className='w-full'>

      <nav className='nav'> {/* The 'nav' class is a custom Tailwind CSS class */}

        {/* Create a link to the home page with the logo and text */}
        <Link href='/' className='flex items-center gap-1'>

          {/* Display the logo image */}
          <Image
            src='/assets/icons/logo1.png'
            alt='Pocket Web Scraper logo'
            width={38}
            height={38}
          />

          {/* Display the website name and a span with primary-colored text */}
          <p className='nav-logo'>
            Pocket Saver <span className='text-primary'>Web Scraper</span>
          </p>
        </Link>

        {/* Create a section for navigation icons */}
        <div className='flex items-center gap-5'>

          {/* Map through the navIcons array and display each navigation icon */}
          {navIcons.map((icon) => (
            <Image
              key={icon.alt} // Use alt text as a unique key for React
              src={icon.src} // Image source URL
              alt={icon.alt} // Alt text for the image
              width={28}
              height={28}
              className='object-contain' // Apply CSS styles to the image
            />
          ))}
        </div>
      </nav>
    </header>
  );
};

// Export the Navbar component as the default export
export default Navbar;
