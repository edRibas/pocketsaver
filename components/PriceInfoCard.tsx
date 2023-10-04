import Image from 'next/image'; // Import the Image component from Next.js
import React from 'react'; // Import React

// Define the Props interface for the PriceInfoCard component
interface Props {
  title: string; // The title text for the card
  iconSrc: string; // The source URL of the icon image
  value: string; // The value to display on the card
}

// Define the PriceInfoCard component
const PriceInfoCard = ({
  title,
  iconSrc,
  value,
}: Props) => {
  return (
    <div className={`price-info_card`}>

      {/* Display the title */}
      <p className='text-base text-black-100'>
        {title}
      </p>

      {/* Display an icon and the value */}
      <div className='flex gap-1'>

        {/* Display the icon image */}
        <Image
          src={iconSrc} // Icon source URL
          alt={title} // Alt text for the icon
          width={24} // Width of the icon
          height={24} // Height of the icon
        />

        {/* Display the value */}
        <p className='text-2xl font-bold text-secondary'>
          {value}
        </p>
      </div>
    </div>
  );
};

// Export the PriceInfoCard component as the default export
export default PriceInfoCard;
