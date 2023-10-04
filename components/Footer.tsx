import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-black w-full text-white py-4 text-center p-8">
      <div className="container mx-auto text-center">
        <p className='text-primary text-2xl'> Pocket Saver</p>
        <p className='text-xl'>All rights reserved. &copy; {new Date().getFullYear()} <a href="https://github.com/edRibas" target="_blank" rel="noopener noreferrer" className='text-primary'>edRibas</a></p>
      </div>
    </footer>
  )
}

export default Footer