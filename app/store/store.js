const { objectFromEntries } = require('../utils');
exports.Storage = class {
  constructor(dataObject = {}) {
    this.store = new Map(Object.entries(dataObject));
  }

  get(...thisArgs) {
    return this.store.get(...thisArgs);
  }

  set(...thisArgs) {
    return this.store.set(...thisArgs);
  }

  has(...thisArgs) {
    return this.store.has(...thisArgs);
  }

  values() {
    return this.store.values();
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
