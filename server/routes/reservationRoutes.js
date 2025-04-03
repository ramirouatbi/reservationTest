import express from 'express';
import Reservation from '../models/Reservation.js';
import { generateTimeSlots } from '../utils/timeUtils.js';

const router = express.Router();

// route to get available slots
router.get('/available-slots', (req, res) => {
  const { startHour, endHour, intervalMinutes } = req.query;

  const slots = generateTimeSlots(parseInt(startHour), parseInt(endHour), parseInt(intervalMinutes));
  
  res.json({ slots });
});


// route to reserve
router.post('/reserve', async (req, res) => {
    const { name, email, slot, consumable } = req.body;
    const reservationTime = DateTime.fromISO(slot);
  
    //check if slot is already reserved
    if (consumable) {
      const existingReservation = await Reservation.findOne({ slot: reservationTime.toJSDate() });
  
      if (existingReservation) {
        return res.status(400).json({ message: 'This slot has already been reserved.' });
      }
    }
  
    //create a new reservation
    const reservation = new Reservation({
      name,
      email,
      slot: reservationTime.toJSDate(),
      consumable,
    });
  
    await reservation.save();
  
    res.status(201).json({ message: 'Reservation successful', reservation });
  });
  

export default router;
