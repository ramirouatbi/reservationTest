import React, { useState } from 'react';
import { List, ListItem, ListItemButton, ListItemText, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';
import { z } from 'zod';

// generateTime will generate Date and change the hours from begin to end.
const generateTimeSlots = (start, end, interval) => {
  const slots = [];
  let current = new Date();
  current.setHours(start, 0, 0, 0);
  const endTime = new Date();
  endTime.setHours(end, 0, 0, 0);


  // while loop, convert date to time (hours:minutes), push it to slots array, convert it to time (ms), added intervall in ms, and then reconvert it to date
  while (current <= endTime) {
    slots.push(current.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    current = new Date(current.getTime() + interval * 60000);
    
  }
  return slots;
};

const MeetingScheduler = () => {

  const bookingSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().min(1, 'Email is required').email('Invalid email address'),
  });

  const timeSlots = generateTimeSlots(10, 15, 15);
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
