import React, { useState } from 'react'
import Navbar from './Navbar'
import Description from './Description'
import Collections from './Collections'
import VisitingInfo from './VisitingInfo'
import Booking from './Booking'
import Gallery from './Gallery'
import Footer from '../Footer'
import { ContextMuseum } from '../context/context'

// MuseumList
const MuseumPage = () => {
    const [MuseumData, setMuseumData] = useState(null)
    return (
        <>
            <ContextMuseum.Provider value={{ MuseumData, setMuseumData }}>
                <Navbar />
                <Description />
                {MuseumData &&
                    <main>
                        <VisitingInfo />
                        <Booking />
                        <Gallery />
                        <Collections />
                        <Footer />
                    </main>
                }
            </ContextMuseum.Provider>
        </>
    )
}

export default MuseumPage
