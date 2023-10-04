import Navbar from '@/components/Navbar' // Import the Navbar component from the specified path.
import './globals.css' // Import the global CSS file.
import type { Metadata } from 'next' // Import the 'Metadata' type from the 'next' module.
import { Raleway } from 'next/font/google' // Import the 'Raleway' font from the 'next/font/google' module.
import Footer from '@/components/Footer'
const raleway = Raleway({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'] }) // Define the 'raleway' font with specific subsets and weights.

// Define metadata for the page.
export const metadata: Metadata = {
  title: 'Pocket Saver',
  description: 'Easily track the price of products and save your money!',
}

// Define the default export function for the RootLayout component to  provide a consistent layout structure that can be used across multiple pages or components within the application.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

    // Define the root HTML element with the 'lang' attribute set to 'en'.
    <html lang="en">
      <body className={raleway.className}>

        {/* Define the main content container with a maximum width and centered alignment. */}
        <main className='max-w-10xl mx-auto'>

          {/* Render the Navbar component. */}
          <Navbar />

          {/* Render the child components passed as 'children'. */}
          {children}
        </main>

        {/* Render the Footer component. */}
        <Footer />
      </body>
    </html>
  )
}
