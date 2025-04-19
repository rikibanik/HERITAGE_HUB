import React from 'react'
import Header from './header/Header'
import Contacts from './Contacts'
import Footer from '../Footer'
import { Element } from 'react-scroll'
import { SidebarData } from './header/sidebar/SidebarData'
import BookingProcess from './BookingProcess'
import Reviews from './Reviews'

const Home = () => {

  return (
    <main className='min-w-[320px]'>
      <Header />
      {SidebarData.map((items, index) => {
        return (
          <Element key={index} name={items.to}>
            {items.element}
            {items.to !== "events" && (
              <hr className="border-t border-gray-300 dark:border-gray-700" />
            )}
          </Element>
        )
      })}
      <BookingProcess />
      <hr className="border-t border-gray-300 dark:border-gray-700" />
      <Reviews />
      <hr className="border-t border-gray-300 dark:border-gray-700" />
      <Contacts />
      <hr className="border-t border-gray-300 dark:border-gray-700" />
      <Footer />
    </main>
  )
}

export default Home
