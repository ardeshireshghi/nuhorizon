const express = require('express');
const fs = require('fs');
const router = express.Router();
const Booking = require('../booking/models/booking');
const BookingRepository = require('../booking/repository');
const { Storage } = require('../store/store');

const db = require('../data/db.json');
const store = new Storage(db);
const bookingRepo = new BookingRepository(store);

const setBookingStoreSync = (store) => {
  const exitHandler = (exitCode) => {
    console.log('Syncing to DB');
    fs.writeFileSync(`${__dirname}/../data/db.json`, store.toString());
    if (!exitCode) process.exit();
  };

  // Save to DB before exit
  process.on('exit', exitHandler);
  process.on('SIGINT', exitHandler);
  process.on('SIGUSR2', exitHandler);
  process.on('SIGUSR2', exitHandler);
};

router.get('/api/reservations', (_, res) => res.json(bookingRepo.all()));
router.post('/api/bookings', (req, res) => {
  const booking = Booking.create(req.body);

  if (!booking.valid()) {
    return res.render('booking', {
      error: 'Please enter valid information'
    });
  }

  if (bookingRepo.has(booking)) {
    return res.render('booking', {
      error: `Unfortunately there is already a booking on this date at ${booking.time}`
    });
  }

  bookingRepo.insert(booking);

  res.render('booking', {
    email: booking.email
  });
});

router.get('/reservations', (_, res) => res.render('reservations', {
  bookings: bookingRepo.all()
}));

router.get('/', (_, res) => res.render('home'));

setBookingStoreSync(store);

module.exports = router;
