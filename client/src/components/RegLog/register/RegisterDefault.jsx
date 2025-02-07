import React, { useState } from 'react';
import OTP from './OTP';
import Register from './Register';

const RegisterDefault = () => {

    const [component, setComponent] = useState("Register");

    return (
        <>
            {(() => {
                switch (component) {
                    case 'OTP':
                        return <OTP setComponent={setComponent} />;
                    case 'Register':
                        return <Register setComponent={setComponent}/>
                    default:
                        return <Register setComponent={setComponent}/>;
                }
            })()}
        </>
    );
};

export default RegisterDefault;
