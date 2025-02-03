import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData } from '/home/sanu/Documents/Web Deployment/HERITAGE_HUB/client/redux/slices/getUserDataSlice';

const UserDataComponent = () => {
    const dispatch = useDispatch();
    const userData = useSelector((state) => console.log(state));
    // const loading = useSelector((state) => state.userData.loading);
    // const error = useSelector((state) => state.userData.error);

    useEffect(() => {
        dispatch(getUserData());
    }, [dispatch]);

    // if (loading) {
    //     return <div>Loading...</div>;
    // }

    // if (error) {
    //     return <div>Error: {error}</div>;
    // }

    return (
        <div>
            <h1>User Data</h1>
            <pre>JSON.stringify(userData, null, 2)</pre>
        </div>
    );
};

export default UserDataComponent;
