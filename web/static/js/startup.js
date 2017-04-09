import { Actions } from 'jumpsuit';

export default {
  initialize: () => {
    Actions.socket.connect();
    Actions.socket.channelJoin("auth");
  }
}

