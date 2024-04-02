import React, { useState } from 'react';

const WithAuthentication = (WrappedComponent) => {
    // Define the shared state and its updater function
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Return a new component that wraps the WrappedComponent
    return (props) => {
        // Pass down the shared state and its updater function as props
        return <WrappedComponent {...props} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />;
    };
};

export default WithAuthentication;
