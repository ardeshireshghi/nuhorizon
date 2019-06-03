const { expect } = require('chai');
const BookingRepository = require('../../booking/repository');
const Booking = require('../../booking/models/booking');
const { Storage } = require('../../store/store');

describe('BookingRepository', () => {
  describe('#insert', () => {
    const db = '{"1559646000000":{"id":"c49ace72-20f4-4b81-ba0a-b60988e45a7c","time":"12:00","date":"2019-06-04","name":"Ardeshir","email":"ard@live.com"}}';
    let repo;

    beforeEach(() => {
      repo = new BookingRepository(new Storage(JSON.parse(db)));
    })

    it('should insert new booking', () => {
      const booking = Booking.create({
        time: '13:00',
        date:'2019-06-04',
        name: 'Ardeshir',
        email: 'ard@live.com'
      });

      repo.insert(booking);

      expect(repo.has(booking)).to.be.true;
    });

    describe('when a booking with a given date and time exists', () => {
      it('should not add the booking', () => {
        const booking = Booking.create({
          time: '12:00',
          date:'2019-06-04',
          name: 'Ardeshir',
          email: 'ard@live.com'
        });

        repo.insert(booking);
        expect(repo.all().length).to.be.equal(1);
      });
    });
  })
});
