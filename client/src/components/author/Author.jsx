import React, { useState, useEffect } from 'react'
import AuthorProfile from './AuthorProfile'
import ManageSlots from './ManageSlots'
import Analytics from './Analytics'
import AuthorNav from './authorHeader/AuthorNav'
import Footer from '../Footer'

const Author = () => {

    const [authorData, setAuthorData] = useState(null)
    const getAuthorData = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_HOST}/author/dashboard`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (!response.ok) {
                throw new Error('response not ok for getting author data!')
            }
            const data = await response.json();
            setAuthorData(data)
        } catch (error) {
            console.error('Error:', error);
        }
    }
    useEffect(() => {
        getAuthorData();
    }, [])

    return (
        <>
            {authorData && authorData.details &&
                <>
                    <AuthorNav authorData={authorData.details} />
                    <main className='mt-16 bg-indigo-200'>
                        <AuthorProfile authorData={authorData.details} />
                        <ManageSlots />
                        <Analytics />
                    </main>
                    <Footer />
                </>
            }
        </>
    )
}

export default Author
