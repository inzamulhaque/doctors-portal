import React from 'react';
import Banner from './Banner';
import Contact from './Contact ';
import Info from './Info';
import MakeAppointment from './MakeAppointment';
import SecondBanner from './SecondBanner';
import Services from './Services';
import Testimolians from './Testimolians';
import Footer from '../Shared/Footer';

const Home = () => {
    return (
        <>
            <div>
                <Banner />
                <Info />
                <Services />
                <SecondBanner />
                <MakeAppointment />
                <Testimolians />
                <Contact />
                <Footer />
            </div>
        </>
    );
};

export default Home;