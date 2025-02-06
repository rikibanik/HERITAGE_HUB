import React, { useContext } from 'react';
import OTP from './OTP';
import Register from './Register';
import { ContextComponent } from '../../context/context';

const Default = () => {

    const { component, setComponent } = useContext(ContextComponent);
    
    return (
        <>
            {(() => {
                switch (component) {
                    case 'OTP':
                        return <OTP />;
                    case 'Register':
                        return <Register />
                    default:
                        return <Register />;
                }
            })()}
        </>
    );
};

export default Default;
