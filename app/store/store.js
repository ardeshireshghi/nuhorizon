const { objectFromEntries } = require('../utils');

exports.Storage = class {
  constructor(dataObject = {}) {
    this.store = new Map(Object.entries(dataObject));
  }

  set(...thisArgs) {
    this.store.set(...thisArgs);
  }

  has(...thisArgs) {
    this.store.has(...thisArgs);
  }

  values() {
    this.store.values();
  }

  toString() {
    return JSON.stringify(this.toJSON());
  }

  toJSON() {
    return objectFromEntries([...this.store]);
  }

  [Symbol.iterator]() {
    return this.store.entries();
  }
};
