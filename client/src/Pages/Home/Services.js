import React from 'react';
import Service from './Service';
import fluoride from '../../assets/images/fluoride.png';
import cavity from '../../assets/images/cavity.png';
import whitening from '../../assets/images/whitening.png';

const Services = () => {
    const services = [
        {
            _id: 1,
            name: 'Fluoride Treatment',
            description: '',
            img: fluoride
        },
        {
            _id: 2,
            name: 'Cavity Filling',
            description: '',
            img: cavity
        },
        {
            _id: 3,
            name: 'Teeth Whitening',
            description: '',
            img: whitening
        },
    ];

    return (
        <>
            <div className='my-16'>
                <div className="text-center">
                    <h3 className='text-primary font-bold text-xl uppercase'>Our Services</h3>
                    <h2 className='text-4xl'>Services We Provide</h2>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
                    {
                        services.map(service => <Service
                            key={service._id}
                            service={service}
                        />)
                    }
                </div>
            </div>
        </>
    );
};

export default Services;