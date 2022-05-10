import React from 'react';
import InfoCard from './InfoCard';
import clock from '../../assets/icons/clock.svg';
import marker from '../../assets/icons/marker.svg';
import phone from '../../assets/icons/phone.svg';

const Info = () => {
    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                <InfoCard img={clock} cardTitle="Opening Hours" bgClass="bg-gradient-to-r from-secondary to-primary" />
                <InfoCard img={marker} cardTitle="Our Locations" bgClass="bg-neutral" />
                <InfoCard img={phone} cardTitle="Contact Us" bgClass="bg-gradient-to-r from-secondary to-primary" />
            </div>
        </>
    );
};

export default Info;