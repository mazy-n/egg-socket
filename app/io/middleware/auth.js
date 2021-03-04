'use strict';

const room = 'default_room';

module.exports = () => {
  return async (ctx, next) => {
    // 权限校验通过
    // ctx.socket.emit('res', 'auth success');
    // 放行
    await next();
    console.log('断开连接', ctx.socket.id);
    const user = ctx.app.user;
    const index = user.findIndex(v => v.id === ctx.socket.id);
    if (index !== -1) {
      const res = {
        datas: {
          name: user[index].name,
          isOnline: false,
        },
        count: user.length - 1,
      };
      ctx.app.io.of('/').to(room).emit('online', ctx.response.success(res));
      user.splice(index, 1);
      ctx.app.user = user;
    }
  };
};
