import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';
import { FaBath, FaBed } from 'react-icons/fa';

export default function ListingItem({ listing }) {
  // Check if listing or _id is undefined, return null
  if (!listing || !listing._id) {
    return null;
  }

  // Determine the listing type label based on the type
  const listingTypeLabel =
    listing.type === 'rent' ? 'For Rent' : 'For Sale';

  return (
    <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px] relative'>
      {/* Link to the individual listing */}
      <Link to={`/listing/${listing._id}`}>
        {/* Listing cover image */}
        <img
          src={
            listing.imageUrls[0] ||
            'https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg'
          }
          alt='listing cover'
          className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'
        />
        {/* Listing type label */}
        <div className="absolute top-0 left-0 bg-gray-800 text-white px-2 py-1">{listingTypeLabel}</div>
        
        {/* Listing details */}
        <div className='p-3 flex flex-col gap-2 w-full'>
          {/* Listing name */}
          <p className='truncate text-lg font-semibold text-slate-700'>
            {listing.name}
          </p>
          {/* Location */}
          <div className='flex items-center gap-1'>
            <MdLocationOn className='h-4 w-4 text-green-700' />
            <p className='text-sm text-gray-600 truncate w-full'>
              {listing.city}
            </p>
          </div>
          {/* Description */}
          <p className='text-sm text-gray-600 line-clamp-2'>
            {listing.description}
          </p>
          {/* Price */}
          <p className='text-slate-500 mt-2 font-semibold'>
            {listing.offer
              ? listing.discountPrice.toLocaleString('en-US')
              : listing.regularPrice.toLocaleString('en-US')}{' '}
            EGP {listing.type === 'rent' ? '/ month' : ''}
          </p>
          {/* Bedroom and Bathroom count */}
          <div className='text-slate-700 flex gap-4'>
            <FaBed className='text-sm' />
            <div className='font-bold text-xs'>
              {listing.bedrooms > 1
                ? `${listing.bedrooms} beds `
                : `${listing.bedrooms} bed `}
            </div>
            <FaBath className='text-sm' />
            <div className='font-bold text-xs'>
              {listing.bathrooms > 1
                ? `${listing.bathrooms} baths `
                : `${listing.bathrooms} bath `}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
