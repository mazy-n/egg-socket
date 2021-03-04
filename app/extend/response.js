'use strict';

module.exports = {
  error(message) {
    const res = {
      message,
      code: 0,
      status: 500,
    };
    return res;
  },
  success(data) {
    const res = {
      code: 0,
      status: 200,
      result: data,
    };
    return res;
  },
  connect() {
    return {
      code: 1,
      status: 200,
    };
  },
};
