import mongoose from 'mongoose';


const reservationSchema = new mongoose.Schema({
  name: { type: String, required: true },  // name of the person
  email: { type: String, required: true },  // mail of the person
  slot: { type: Date, required: true },  // slot choosen
  consumable: { type: Boolean, default: false },  // if the slot is consumable
});


const Reservation = mongoose.model('Reservation', reservationSchema);

export default Reservation;