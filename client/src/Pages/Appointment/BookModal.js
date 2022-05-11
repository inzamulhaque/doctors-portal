import React from 'react';
import { format } from 'date-fns';

const BookModal = ({ treatment, date, setTreatment }) => {
    const { _id, name, slots } = treatment;

    const handleBooking = event => {
        event.preventDefault();
        const slot = event.target.slot.value;
        console.log(_id, name, slot);
        setTreatment(null);
    }

    return (
        <>

            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <label for="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="font-bold text-lg text-secondary">Booking For: {name}</h3>
                    <form onSubmit={handleBooking} className='grid grid-cols-1 gap-3 justify-items-center'>
                        <input type="text" placeholder="Enter Date" className="input input-bordered w-full max-w-xs" value={format(date, 'PP')} disabled />

                        <select name="slot" className="select select-bordered w-full max-w-xs">
                            {
                                slots.map((slot, index) => <option key={index} value={slot}>{slot}</option>)
                            }
                        </select>

                        <input type="text" name="name" placeholder="Enter Your Name" className="input input-bordered w-full max-w-xs" />

                        <input type="email" name="email" placeholder="Enter Your Email" className="input input-bordered w-full max-w-xs" />

                        <input type="number" name="phone" placeholder="Enter Your Phone Number" className="input input-bordered w-full max-w-xs" />
                        <input type="submit" value="Submit" className="btn btn-secondary w-full max-w-xs" />
                    </form>
                </div>
            </div>
        </>
    );
};

export default BookModal;