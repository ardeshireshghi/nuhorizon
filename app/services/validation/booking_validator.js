const { allPass, all, identity, match, isEmpty, not, prop, compose, values } = require('ramda');
const { objectFromEntries } = require('../../utils');
const logger = message => context => { console.log(message, context); return context; };

const emailValid = compose(not, isEmpty, logger('email matching the regex?'), match(/[\w-+\.%]+@[\w-+\.%]+\.[a-z]{2,}/), prop('email'), objectFromEntries);
const allFieldsSet = compose(logger('all Fields are set?'), all(identity), values, logger('objects from entries'), objectFromEntries);

exports.validateBooking = compose(allPass([emailValid, allFieldsSet]), logger('validate booking attributes'));
