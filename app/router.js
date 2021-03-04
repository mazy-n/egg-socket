'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { io } = app;
  // router.get('/', controller.home.index);
  app.user = [];
  io.route('chat', app.io.controller.chat.index);
  io.route('message', app.io.controller.chat.message);
};
