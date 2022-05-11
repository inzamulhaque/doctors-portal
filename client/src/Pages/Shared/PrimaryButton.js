import React from 'react';

const PrimaryButton = ({ children }) => {
    return (
        <>
            <button className="btn btn-primary uppercase text-white font-bold bg-gradient-to-r from-secondary to-primary duration-300 ease-in-out hover:bg-gradient-to-l">{children}</button>
        </>
    );
};

export default PrimaryButton;