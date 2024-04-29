import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaMapMarkerAlt, FaShare } from 'react-icons/fa';
import { TbRulerMeasure } from "react-icons/tb";
import Contact from '../components/Contact';

export default function Request() {
    const { currentUser } = useSelector((state) => state.user);
    const params = useParams();
    const [contact, setContact] = useState(false);
    const [request, setRequest] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const fetchRequest = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/request/get/${params.requestId}`);
                const data = await res.json();
                if (data.success === false) {
                    setError(true);
                    setLoading(false);
                    return;
                }
                setRequest(data);
                setLoading(false);
                setError(false);
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        }
        fetchRequest();
    }, [params.requestId]);

    return (
        <main className="container mx-auto px-4 py-8">
            {loading && <p className="text-center my-7 text-lg">Loading...</p>}
            {error && <p className="text-center my-7 text-lg text-red-500">Something went wrong!</p>}
            {request && !loading && !error && (
                <div>
                    <div className="fixed top-16 right-4 z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-gray-100 cursor-pointer">
                        <FaShare
                            className="text-gray-600"
                            onClick={() => {
                                navigator.clipboard.writeText(window.location.href);
                                setCopied(true);
                                setTimeout(() => {
                                    setCopied(false);
                                }, 2000);
                            }}
                        />
                    </div>
                    {copied && (
                        <p className="fixed top-28 right-6 z-10 rounded-md bg-gray-100 p-2 text-gray-800">
                            Link copied!
                        </p>
                    )}
                    <div className="max-w-4xl mx-auto p-3 my-7 gap-4 bg-white shadow-md rounded-md">
                        <p className="text-2xl font-semibold">{request.name} - Max {request.maxPrice.toLocaleString('en-US')} Egp</p>
                        <p className="flex items-center mt-3 text-gray-600 text-sm">
                            <TbRulerMeasure className="text-green-700 mr-1" />
                            {request.Area} m²
                        </p>

                        <p className="flex items-center mt-3 text-gray-600 text-sm">
                            <FaMapMarkerAlt className="text-green-700 mr-1" />
                            {request.city}
                        </p>
                        <p className="mt-3 text-gray-800">
                            <span className="font-semibold">Additional Details:</span> {request.furnished ? 'Furnished, ' : 'Unfurnished, '}
                            {request.parking ? 'Parking available' : 'No Parking'}
                        </p>
                        {currentUser && request.userRef !== currentUser._id && !contact && (
                            <button onClick={() => setContact(true)} className="mt-5 bg-blue-600 text-white rounded-lg uppercase px-4 py-2 hover:bg-blue-700 focus:outline-none">
                                Contact Owner
                            </button>
                        )}
                        {contact && <Contact request={request} />}
                    </div>
                </div>
            )}
        </main>
    );
}
