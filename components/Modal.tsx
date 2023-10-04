'use client'; // Enable client-side rendering for this module

// Import necessary modules and components
import { FormEvent, Fragment, useState } from 'react'; // Import React components and hooks
import { Dialog, Transition } from '@headlessui/react'; // Import components from the Headless UI library for creating modal dialogs
import Image from 'next/image'; // Import the Image component from Next.js
import { addUserEmailToProduct } from '@/lib/actions'; // Import a function for adding user email to a product

// Define the Props interface for the Modal component
interface Props {
  productId: string; // The ID of the product associated with the modal
}

// Define the Modal component
const Modal = ({ productId }: Props) => {

  // Define state variables
  let [isOpen, setIsOpen] = useState(true); // Control the modal's open/closed state
  const [isSubmitting, setIsSubmitting] = useState(false); // Control the form submission state
  const [email, setEmail] = useState(''); // Store the user's email input

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setIsSubmitting(true); // Set the form submission state to true

    // Call the function to add the user's email to the product
    await addUserEmailToProduct(productId, email);

    setIsSubmitting(false); // Set the form submission state back to false
    setEmail(''); // Clear the email input field
    closeModal(); // Close the modal
  };

  // Function to open the modal
  const openModal = () => setIsOpen(true);

  // Function to close the modal
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <button
        type='button'
        className='btn'
        onClick={openModal}>
        Track Product
      </button>

      {/* Define the modal transition and dialog */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          onClose={closeModal}
          className='dialog-container'
        >
          <div className='min-h-screen px-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-350"
              enterFrom="opacity-0"
              enterTo="opacity-150"
              leave="ease-in duration0-250"
              leaveFrom="opacity-150"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className='fixed inset-0' />
            </Transition.Child>

            <span
              className='inline-block h-screen align-middle'
              aria-hidden="true"
            ></span>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-350"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className='dialog-content'>
                <div className='flex flex-col'>

                  <div className='flex justify-between'>

                    {/* Display the modal logo */}
                    <div className='p-3 border border-gray-200 rounded-10'>
                      <Image
                        src="/assets/icons/logo1.png"
                        alt="Logo"
                        width={38}
                        height={38}
                      />
                    </div>

                    {/* Display the close icon */}
                    <Image
                      src="/assets/icons/x-close.svg"
                      alt="Close"
                      width={24}
                      height={24}
                      className='cursor-pointer'
                      onClick={closeModal}
                    />
                  </div>

                  {/* Modal header text */}
                  <h4 className='dialog-head_text'>
                    Stay updated with product alerts in your inbox!
                  </h4>

                  {/* Modal description text */}
                  <p className='text-sm text-gray-700 mt-2'>
                    Never miss any discount with our alerts!
                  </p>
                </div>

                {/* Modal form for entering email */}
                <form
                  className='flex flex-col mt-5'
                  onSubmit={handleSubmit}
                >
                  {/* Email input label */}
                  <label htmlFor='email' className='text-sm font-medium text-gray-500'>
                    Enter your email address
                  </label>

                  <div className='dialog-input_container'>

                    {/* Email input icon */}
                    <Image
                      src="/assets/icons/mail.svg"
                      alt="Mail"
                      width={18}
                      height={18}
                    />

                    {/* Email input field */}
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      id='email'
                      type="email"
                      placeholder='Email Address'
                      className='dialog-input'
                      required
                    />
                  </div>

                  {/* Submit button */}
                  <button
                    type='submit'
                    className='dialog-btn'
                  >
                    {isSubmitting ? 'Submitting...' : 'Keep tracking!'}
                  </button>
                </form>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

// Export the Modal component as the default export
export default Modal;
