import React, { useState, useEffect } from 'react'
import AuthorProfile from './AuthorProfile'
import ManageSlots from './ManageSlots'
import AuthorNav from './authorHeader/AuthorNav'
import Footer from './Footer'
import { useNavigate } from 'react-router-dom'

const Author = () => {
    const navigate = useNavigate();
    const [authorData, setAuthorData] = useState(null)
    const getAuthorData = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_HOST}/author/dashboard`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            const data = await response.json();
            if (!response.ok) {
                if ((data.message && data.message.includes("No token")) || (data.error && data.error.includes("Unauthorised"))) {
                    navigate('/login');
                }
                throw new Error('response not ok for getting author data!')
            }
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
            {authorData && authorData.details ?
                <>
                    <AuthorNav authorData={authorData.details} />
                    <main className='mt-16 bg-indigo-200'>
                        <AuthorProfile authorData={authorData.details} />
                        <ManageSlots />
                        {/* Analytics.jsx is in ManageSlots.jsx */}
                    </main>
                    <Footer />
                </> : "Loading..."
            }
        </>
    )
}

export default Author
