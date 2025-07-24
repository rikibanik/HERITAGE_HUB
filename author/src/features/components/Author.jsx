import React, { useState, useEffect } from 'react'
import AuthorProfile from './AuthorProfile'
import ManageSlots from './ManageSlots'
import AuthorNav from './authorHeader/AuthorNav'
import Footer from './Footer'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion';
import { useGetAuthorDetailsQuery } from '../authorApi'

const Author = () => {
    const navigate = useNavigate();
    const [authorData, setAuthorData] = useState(null)

    const { data: authorDetails, error, isLoading } = useGetAuthorDetailsQuery();
    useEffect(() => {
        if (authorDetails) {
            setAuthorData(authorDetails);
        } else if (error) {
            navigate("/login");
        }
    }, [authorDetails, error, navigate]);

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
                </> :
                <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-indigo-100 to-indigo-300">
                    <motion.div
                        className="text-4xl font-bold text-indigo-900 mb-4"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        HeritageHub
                    </motion.div>
                    <motion.div
                        className="text-lg text-indigo-700 mb-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                    >
                        Preserving culture
                    </motion.div>
                    <motion.div
                        className="animate-spin rounded-full border-t-4 border-b-4 border-indigo-800 h-16 w-16"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 100 }}
                    />
                </div>
            }
        </>
    )
}

export default Author
