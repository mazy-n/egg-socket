'use strict';

const Controller = require('egg').Controller;
const room = 'default_room';

class chat extends Controller {
  async index() {
    const {
      app,
      socket,
    } = this.ctx;
    const id = socket.id;
    const nsp = app.io.of('/');

    const name = this.ctx.args[0];
    const user = this.app.user;
    if (user.some(v => v.name === name)) {
      nsp.sockets[id].emit('res', this.ctx.response.error('用户名重复'));
      return;
    }

    user.push({ id, name });

    this.app.user = user;
    // 加入房间
    this.ctx.socket.join(room);
    nsp.sockets[id].emit('res', this.ctx.response.connect());
    // 指定房间连接信息列表
    nsp.adapter.clients([ room ], (err, clients) => {
      console.log(JSON.stringify(clients));
    });
    //  给指定房间的每个人发送消息
    const online = {
      datas: {
        name,
        isOnline: true,
      },
      count: user.length,
    };
    this.ctx.app.io.of('/').to(room).emit('online', this.ctx.response.success(online));
    // 断开连接
    // this.ctx.socket.disconnect();
  }

  async message() {
    this.ctx.app.io.of('/').to(room).emit('res', this.ctx.response.success(this.ctx.args[0]));
  }

}
module.exports = chat;
