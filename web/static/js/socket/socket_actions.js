'use strict';

import { Socket } from 'phoenix';
import { State, Actions } from 'jumpsuit'

// Yes, it's stateful
const SocketActions = State('socket', {
  // Initial State
  initial: { socket: null, channels: [] },
  // Actions
  connect(state) {
    if (state.socket)
      return { ...state };
    console.log(state);
    const socket = new Socket('/socket', {});
    console.log(socket);
    socket.connect();
    return { socket: socket }
  },
  channelAdd(state, [alias, channel]) {
    const channels = {
      ...state.channels,
      [alias]: channel
    };
    return { channels: channels};
  },
  channelJoin(state, name, alias = null) {
    if (state.channels && state.channels.includes('auth'))
      return { ...state };
    console.log(state);
    alias = alias === null ? name : alias;
    // return (dispatch, getState) => {
    const ws = state.socket;
    if (ws !== null) {
      console.log(ws);
      const channel = ws.channel(name);
      channel.join().receive('ok', (data) => {
        console.log('ok from channel ' + alias);
        console.log(data);
        Actions.socket.channelAdd([alias, channel]);
        // setupHandlers(alias, channel, dispatch);
        // dispatch({
        //   type: 'CHANNEL_JOINED',
        //   name: alias,
        //   channel: channel
        // });
      });
    }
    return state;
  }
})

const setupHandlers = (name, channel, dispatch) => {
  switch (name) {
    case "visitors":
      channel.on("init", (msg) => {
        dispatch({
          type: "VISITORS_INIT",
          total: msg.total,
          online: msg.online,
          max_online: msg.max_online
        });
      });
      channel.on("add", () => {
        dispatch({
          type: "VISITORS_ADD"
        });
      });
      channel.on("remove", () => {
        dispatch({
          type: "VISITORS_REMOVE"
        });
      });
      break;
    default:
      break;
  }
}

export default SocketActions;

// export default {
//   channel_join: (name, alias = null) => {
//     alias = alias === null ? name : alias;
//     // return (dispatch, getState) => {
//       const { ws } = getState();
//       if (ws.socket !== null) {
//         console.log(ws.socket);
//         const channel = ws.socket.channel(name);
//         channel.join().receive('ok', () => {
//           setupHandlers(alias, channel, dispatch);
//           dispatch({
//             type: 'CHANNEL_JOINED',
//             name: alias,
//             channel: channel
//           });
//         });
//       }
//     // }
//   }
// };