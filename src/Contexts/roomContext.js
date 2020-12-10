import React, { createContext } from 'react';
import useLocalStorageState from './useLocalStorageState';

export const RoomContext = createContext();

export const RoomProvider = (props) => {
   const [isRoomJoined, setRoomJoined] = useLocalStorageState(
      'isRoomJoined',
      false
   );
   const [room, setRoom] = useLocalStorageState('room', null);

   const [currentUser, setCurrentUser] = useLocalStorageState(
      'currentUser',
      null
   );

   const addUser = (newUser) => {
      const newRoom = { ...room };

      newRoom.users = [...newRoom.users, newUser];

      setRoom(newRoom);
   };

   const addNewMsg = (newMsg) => {
      const newRoom = { ...room };

      newRoom.messages = [...newRoom.messages, newMsg];

      setRoom(newRoom);
   };

   return (
      <RoomContext.Provider
         value={{
            isRoomJoined,
            setRoomJoined,
            room,
            setRoom,
            addUser,
            addNewMsg,
            currentUser,
            setCurrentUser,
         }}
      >
         {props.children}
      </RoomContext.Provider>
   );
};
