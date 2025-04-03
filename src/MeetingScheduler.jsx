import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemButton, ListItemText, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';
import { z } from 'zod';
import axios from 'axios'
import { DateTime } from 'luxon';
import generateTimeSlots from '../server/utils/timeUtils'


const MeetingScheduler = () => {

  const bookingSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().min(1, 'Email is required').email('Invalid email address'),
  });

  useEffect(() => {
    const testApi = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/available-slots?startHour="+10+"&endHour="+15+"&intervalMinutes="+15);
        console.log("response of testApi ", response);
        // setTimeSlots(response.data)
        
        
      } catch (error) {
        console.error("Error fetching API", error);
      }
    };

    testApi();


  }, []);


  const timeSlots = generateTimeSlots(10, 15, 15);
  //const [timeSlots, setTimeSlots] = useState([])
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({ name: '', email: '' });


  // const handleSelectSlot = (slot) => {
  //   setSelectedSlot(slot);
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
    setName('');
    setEmail('');
  };

  const handleSubmit = () => {
    // safeParse used to not throw error when validation fails
    const result = bookingSchema.safeParse({ name, email });

    if (!result.success) {
      const formattedErrors = result.error.format();
      setErrors({
        name: formattedErrors.name?._errors[0] || '',
        email: formattedErrors.email?._errors[0] || '',
      });
      return;
    }

    console.log(`Meeting booked for ${selectedSlot} by ${name}, Email: ${email}`);
    handleClose();
  };

  return (
    <>
      <div>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'text.disabled' }}>
          {timeSlots.map((slot, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton onClick={() => {setSelectedSlot(slot),setOpen(true)}}>
                <ListItemText primary={slot} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Book Meeting Slot - {selectedSlot}</DialogTitle>
        <DialogContent>
          <TextField 
            label="Name" 
            fullWidth 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            sx={{ my:2  }}
          />
          <TextField 
            label="Email" 
            fullWidth 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">Book</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MeetingScheduler;
