const { reduce } = require('ramda');
exports.objectFromEntries = reduce((acc, cur) => ({...acc, [cur[0]]: cur[1] }), {});
