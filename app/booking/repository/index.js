const { Storage } = require('../../store/store');

module.exports = class BookingRepository {
  constructor(storage = new Storage()) {
    this.storage = storage;
  }

  insert(booking) {
    this.storage.set(this._uniqueKey(booking), booking);
  }

  has(booking) {
    return this.storage.has(this._uniqueKey(booking));
  }

  _uniqueKey(booking) {
    return Date.parse(`${booking.date} ${booking.time}`).toString();
  }

  all() {
    return [...this.storage.values()];
  }

  store() {
    return this.storage;
  }
}
