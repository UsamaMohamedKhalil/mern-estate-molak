import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PiWhatsappLogo } from "react-icons/pi";

export default function Contact({ listing }) {
  // State variables
  const [Owner, setOwner] = useState(null);
  const [message, setMessage] = useState('');

  // Function to handle input change
  const onChange = (e) => {
    setMessage(e.target.value);
  };

  // Effect hook to fetch landlord data
  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        // Fetch landlord data based on userRef
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        // Set landlord data to state
        setOwner(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandlord();
  }, [listing.userRef]);

  return (
    <>
      {Owner && (
        <div className='flex flex-col gap-2'>
          {/* Display landlord and listing information */}
          <p>
            Contact <span className='font-semibold'>{Owner.username}</span> for{' '}
            <span className='font-semibold'>{listing.name.toLowerCase()}</span>
          </p>
          {/* Textarea for message input */}
          <textarea
            name='message'
            id='message'
            rows='2'
            value={message}
            onChange={onChange}
            placeholder='Enter your message here...'
            className='w-full border p-3 rounded-lg'
          ></textarea>
          {/* Link to send WhatsApp message */}
          <Link
            to={`https://api.whatsapp.com/send?phone=${listing.whatsappNumbers}&text=${(message)}`}
            className='bg-slate-700 flex items-center justify-center text-white text-center p-3 uppercase rounded-lg hover:opacity-95'
          >
            {/* WhatsApp icon */}
            <PiWhatsappLogo className='mr-2 ' /> <p>Send WhatsApp Message </p>        
          </Link>
        </div>
      )}
    </>
  );
}
