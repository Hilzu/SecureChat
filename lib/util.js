'use strict';

module.exports.generateGuid = function () {
  /* jshint bitwise: false */
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

module.exports.isGuid = function (guid) {
  return (/\b[A-F0-9]{8}(?:-[A-F0-9]{4}){3}-[A-F0-9]{12}/i).test(guid);
};
