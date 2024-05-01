import React from 'react';
import MyImage from '../assets/me.jpg'; 
export default function About() {
  return (
    <div className='py-20 px-4 max-w-6xl mx-auto'>
      <div className="flex flex-col items-center mb-8">
         <img
          src={MyImage} // Replace 'your_photo_url.jpg' with the URL of your photo
          alt="Osama Mohamed"
          className="w-32 h-32 rounded-full mb-4"
        /> 
        <h1 className='text-3xl font-bold mb-2 text-slate-800'>Osama Mohamed</h1>
        <p className='text-lg text-gray-600'>Full Stack Developer</p>
      </div>
      <div>
        <h2 className='text-2xl font-bold mb-4 text-slate-800'>About Molak Estate</h2>
        <p className='mb-4 text-slate-700'>Osama Mohamed Mahmoud presents a groundbreaking project aimed at revolutionizing real estate transactions. By leveraging the MERN stack, this web-based platform connects property owners directly, eliminating intermediaries and associated costs. With a focus on user-centric design and integrated AI capabilities, the platform offers personalized recommendations and enhances the property search experience. It prioritizes backend robustness and frontend accessibility while ensuring security measures and direct communication tools. This project seeks to democratize property transactions, making them more accessible, transparent, and cost-effective.</p>
      </div>
    </div>
  );
}
