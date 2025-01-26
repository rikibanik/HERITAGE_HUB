import React, { useState } from 'react'
import Navbar from './Navbar'
import Description from './Description'
import Collections from './Collections'
import VisitingInfo from './VisitingInfo'
import Booking from './Booking'
import Gallery from './Gallery'
import Footer from '../Footer'
import { ContextMuseum } from '../context/context'
import { Element } from 'react-scroll'

// MuseumList
const MuseumPage = () => {
    const [MuseumData, setMuseumData] = useState(null)
    return (
        <>
            <ContextMuseum.Provider value={{ MuseumData, setMuseumData }}>
                <Navbar />
                {/* <Header/> */}
                <Description />
                {MuseumData &&
                    <main>
                        <Element name='visitinginfo'>
                            <VisitingInfo />
                        </Element>
                        <Element name='booking'>
                            <Booking />
                        </Element>
                        <Element name='gallery'>
                            <Gallery />
                        </Element>
                        <Collections />
                        <Footer />
                    </main>
                }
            </ContextMuseum.Provider>
        </>
    )
}

export default MuseumPage
