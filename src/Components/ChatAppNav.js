import React, { useContext } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import clsx from 'clsx';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Button, Typography } from '@material-ui/core';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

import { RoomContext } from '../Contexts/roomContext';

import { API_URL } from '../Utils/APIInfo';

import { SocketContext } from '../Contexts/socketContext';

const ChatAppNav = (props) => {
   const { classes } = props;
   const { socket } = useContext(SocketContext);
   const {
      setRoom,
      setCurrentUser,
      setRoomJoined,
      currentUser,
      room,
   } = useContext(RoomContext);

   React.useEffect(() => {}, []);

   React.useEffect(() => {
      socket.on('message', (data) => {
         console.log('data', data);
      });

      socket.on('userLeft', (data) => {
         console.log('data', data);
         if (data.socketId !== socket.id) {
            // Only For Broadcast , NOT for sender
            toast.dark(`${data.user.name} left the room`, {
               position: 'bottom-left',
               autoClose: 5000,
               hideProgressBar: true,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
            });
         }
      });
   }, [room, socket]);

   const leaveRoom = async () => {
      setRoom(null);
      setRoomJoined(false);

      try {
         const res = await axios.put(`${API_URL}/rooms/${room.name}`, {
            currentUser,
            socketId: socket.id,
         });

         console.log('res', res);
         setCurrentUser(null);
      } catch (err) {
         console.log('err', err);
      }

      // window.location.href = '/join';
   };

   return (
      <AppBar
         position='fixed'
         className={clsx(classes.appBar, {
            [classes.appBarShift]: true,
         })}
      >
         <Toolbar>
            <Typography variant='h6' noWrap className={classes.NavHeading}>
               MERN Chat App
            </Typography>
            <Button
               variant='contained'
               color='secondary'
               style={{ cursor: 'pointer' }}
               onClick={leaveRoom}
            >
               <KeyboardBackspaceIcon style={{ marginRight: '10px' }} />
               Leave Room
            </Button>
         </Toolbar>
      </AppBar>
   );
};

export default ChatAppNav;
