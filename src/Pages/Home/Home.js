import React from 'react';
import Banner from './Banner';
import Contact from './Contact ';
import Info from './Info';
import MakeAppointment from './MakeAppointment';
import SecondBanner from './SecondBanner';
import Services from './Services';
import Testimolians from './Testimolians';

const Home = () => {
    return (
        <>
            <div className="container mx-auto">
                <Banner />
                <Info />
                <Services />
                <SecondBanner />
                <MakeAppointment />
                <Testimolians />
                <Contact />
            </div>
        </>
    );
};

export default Home;