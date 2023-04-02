import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";

const WS_URL = 'ws://127.0.0.1:8084/ws';

const { sendMessage, lastMessage, readyState, getWebSocket } = useWebSocket(
    'ws://127.0.0.1:8084/ws',
    { share: true }
  );


export default class PeerService {

    static async createConnection() {
        return 
    }

}