import React, { useContext } from 'react';
import OTP from './OTP';
import Register from './Register';
import { ContextComponent } from '../../context/context';

const RegisterDefault = () => {

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

export default RegisterDefault;
