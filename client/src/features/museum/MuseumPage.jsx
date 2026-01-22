import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Description from './components/Description'
import Collections from './components/Collections'
import VisitingInfo from './components/VisitingInfo'
import Booking from './components/Booking'
import Gallery from './components/Gallery'
import Footer from '../Footer'
import { ContextConfirmOrder } from '../../context/context'
import { Element } from 'react-scroll'
import LogoutBooking from './components/LogoutBooking'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useGetMuseumQuery } from './museumApi'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectMuseumId, setMuseumId } from './museumSlice'
import { useGetUserQuery } from '../auth/authApi'

export default function MuseumPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const { data: resData } = useGetUserQuery();
    const [searchParams] = useSearchParams();

    const MuseumId = useSelector(selectMuseumId);
    const id = params.id;
    const { data: MuseumData, error } = useGetMuseumQuery(id, { skip: !id });

    const [confirmOrder, setConfirmOrder] = useState(false);
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);

    const handleBookNow = () => {
        if (resData && resData.email) setIsBookingOpen(true);
        else setIsLoginPopupOpen(true);
    };

    useEffect(() => {
        dispatch(setMuseumId(id));
    }, [id]);

    useEffect(() => {
        if (error) {
            navigate('/error');
        }
    }, [error]);

    return (
        <>
            <ContextConfirmOrder.Provider value={{ confirmOrder, setConfirmOrder }}>
                <main className='min-w-[320px]'>
                    <Navbar />

                    <Description onBookNow={handleBookNow} />
                    {MuseumData &&
                        <>
                            <Element name='visitinginfo'>
                                <VisitingInfo onBookNow={handleBookNow} />
                            </Element>
                            <Element name='gallery'>
                                <hr className="border-t border-gray-300 dark:border-gray-700" />
                                <Gallery />
                            </Element>
                            <hr className="border-t border-gray-300 dark:border-gray-700" />
                            <Collections />
                            <hr className="border-t border-gray-300 dark:border-gray-700" />
                            <Footer />
                        </>
                    }

                    <Booking isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
                    <LogoutBooking isOpen={isLoginPopupOpen} onClose={() => setIsLoginPopupOpen(false)} />
                </main>
            </ContextConfirmOrder.Provider>
        </>
    )
}
