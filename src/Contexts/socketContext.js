import { createContext } from 'react';
const socketIo = require('socket.io-client');
let socket;

export const SocketContext = createContext();

export const SocketProvider = (props) => {
   // socket = socketIo.connect('localhost:5000', {
   socket = socketIo.connect('https://mern-chat-project.herokuapp.com', {
      transports: ['websocket'],
   });
   socket.on('connect', function () {
      console.log(`Hurrah Socket ${socket.id} Connected`);
   });

   return (
      <SocketContext.Provider value={{ socket }}>
         {props.children}
      </SocketContext.Provider>
   );
};
