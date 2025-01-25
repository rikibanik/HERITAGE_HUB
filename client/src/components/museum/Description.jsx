import React, { useState, useEffect, useContext } from 'react'
import { useLocation } from 'react-router-dom';
import { ContextMuseum } from '../context/context';
import Loading from '../dashboard/Loading';

const Description = () => {

    const { MuseumData, setMuseumData } = useContext(ContextMuseum)
    console.log(MuseumData);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const id = queryParams.get("id");
    const name = queryParams.get("name");

    // console.log(id)
    useEffect(() => {
        const venueId = id;
        fetch(`http://localhost:3000/venue/museum/${venueId}`)
            .then(response => response.json())
            .then(data => {
                setMuseumData(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });

    }, [])

    return (
        <>
            {MuseumData && MuseumData.venue ?
                (<section id="Hero" className="relative h-screen bg-neutral-900 text-white pt-16">
                    <div className="absolute inset-0">
                        <img src={MuseumData.venue.imgLink} alt="Museum" className="w-full h-full object-cover opacity-40" />
                    </div>

                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
                        <div className="animate__animated animate__fadeIn">
                            <h1 className="text-4xl md:text-6xl font-bold mb-4">{MuseumData.venue.name}</h1>
                            <p className="text-xl md:text-2xl mb-6">{MuseumData.venue.description.line}</p>
                            <p className="text-lg md:text-xl mb-8 max-w-2xl">{MuseumData.venue.description.elaborated}</p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <a href="#BookingForm" className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 animate__animated animate__pulse animate__infinite">
                                    Book Now
                                </a>
                                <a href="#Collections" className="inline-block bg-transparent border-2 border-white hover:bg-white hover:text-neutral-900 text-white font-bold py-3 px-8 rounded-lg transition duration-300">
                                    Gallery
                                </a>
                                <a href="#Collections" className="inline-block bg-transparent border-2 border-white hover:bg-white hover:text-neutral-900 text-white font-bold py-3 px-8 rounded-lg transition duration-300">
                                    Visiting Information
                                </a>
                            </div>
                        </div>
                    </div>
                </section>) : <Loading type="spinningBubbles" color="blue" />}
        </>
    )
}

export default Description
