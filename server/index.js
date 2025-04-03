import express from 'express'
import reservationRoutes from './routes/reservationRoutes.js';

import cors from 'cors'
import mongoose from 'mongoose';

const app = express()

const corsOptions = {
    origin: 'http://localhost:5173',
  }

  app.use(cors(corsOptions))

  mongoose.connect('mongodb://localhost:27017/dbconnect', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('Hello World')
})

// app.get('/api', (req, res) => {
//     res.json({test : ['a','b','C']})
//   })

app.use('/api', reservationRoutes);

app.listen(3000, () => {
    console.log('Server started');
});