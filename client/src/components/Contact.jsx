import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PiWhatsappLogo } from "react-icons/pi";

export default function Contact( {listing} ) {
  const [Owner, setOwner] = useState(null);
  const [message, setMessage] = useState('');
  const onChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setOwner(data);
        console.log(data);
        
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
          <p>
            Contact <span className='font-semibold'>{Owner.username}</span>{' '}
            for{' '}
            <span className='font-semibold'>{listing.name.toLowerCase()}</span>
          </p>
          <textarea
            name='message'
            id='message'
            rows='2'
            value={message}
            onChange={onChange}
            placeholder='Enter your message here...'
            className='w-full border p-3 rounded-lg'
          ></textarea>

          <Link
          to={`https://api.whatsapp.com/send?phone=${listing.whatsappNumbers}&text=${(message)}`}
          className='bg-slate-700 flex items-center justify-center text-white text-center p-3 uppercase rounded-lg hover:opacity-95'
          >
           <PiWhatsappLogo className='mr-2 ' /> <p>Send WhatsApp Message </p>        
          </Link>
        </div>
      )}
    </>
  );
}
