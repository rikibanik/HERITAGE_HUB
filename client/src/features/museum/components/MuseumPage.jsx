import React, { useState } from 'react'
import Navbar from './Navbar'
import Description from './Description'
import Collections from './Collections'
import VisitingInfo from './VisitingInfo'
import Booking from './Booking'
import Gallery from './Gallery'
import Footer from '../../Footer'
import { ContextMuseum, ContextCheckLogin, ContextConfirmOrder } from '../../../context/context'
import { Element } from 'react-scroll'
import LogoutBooking from './LogoutBooking'
import { useParams, useSearchParams } from 'react-router-dom'
import { useGetMuseumQuery } from '../museumApi'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectMuseumId, setMuseumId } from '../museumSlice'

export default function MuseumPage() {
    const [resData, setResData] = useState(null)
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const MuseumId = useSelector(selectMuseumId);
    const { data: MuseumData } = useGetMuseumQuery(MuseumId);
    console.log(MuseumData);
    const [orderId, setOrderId] = useState(null);
    const [confirmOrder, setConfirmOrder] = useState(false);

    useEffect(() => {
        dispatch(setMuseumId(id));
    }, [id]);
    // document.title = MuseumData ? `${MuseumData.venue.name} | HeritageHub` : "HeritageHub";
    return (
        <>
            <ContextConfirmOrder.Provider value={{ confirmOrder, setConfirmOrder }}>
                <ContextCheckLogin.Provider value={{ resData, setResData }}>
                    {/* <ContextMuseum.Provider value={{ MuseumData, setMuseumData }}> */}
                    <main className='min-w-[320px]'>
                        <Navbar />

                        {/* <Header/> */}
                        <Description />
                        {MuseumData &&
                            <>
                                <Element name='visitinginfo'>
                                    <VisitingInfo />
                                </Element>
                                <Element name='booking'>
                                    <hr className="border-t border-gray-300 dark:border-gray-700" />
                                    {resData && resData.email ?
                                        <Booking />
                                        : <LogoutBooking />}
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
                    </main>
                    {/* </ContextMuseum.Provider> */}
                </ContextCheckLogin.Provider>
            </ContextConfirmOrder.Provider>
        </>
    )
}
