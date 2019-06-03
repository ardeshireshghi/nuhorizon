const uuidv4 = require('uuid/v4');
const { validateBooking } = require('../../services/validation/booking_validator');

module.exports = class Booking {
  constructor({ time, date, name, email }) {
    this.id = uuidv4();
    this.time = time;
    this.date = date;
    this.name = name;
    this.email = email;

    this.valid = () => validateBooking(this._requiredFieldNameValues());
  }

  static create(props) {
    return new Booking(props);
  }

  static get requiredFields() {
    return ['time', 'date', 'name', 'email'];
  }

  _requiredFieldNameValues() {
    return Booking.requiredFields.map(field => [field, this[field]]);
  }
}
