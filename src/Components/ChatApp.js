import React, { useState, useContext } from 'react';
import clsx from 'clsx';
import uuid from 'uuid/dist/v4';
import axios from 'axios';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import socketIo from 'socket.io-client';

import {
   Drawer,
   ListItemText,
   List,
   Typography,
   ListItem,
   Divider,
   ListItemAvatar,
   Avatar,
} from '@material-ui/core';

import useStyles from '../Styles/ChatApp';
import ChatAppNav from './ChatAppNav';
import ChatAppFooter from './ChatAppFooter';
import { RoomContext } from '../Contexts/roomContext';

import '../Styles/scrollbars.css';
import { SocketContext } from '../Contexts/socketContext';
import { API_URL } from '../Utils/APIInfo';

const ChatApp = () => {
   const classes = useStyles();
   const { room, currentUser, setRoom } = useContext(RoomContext);
   const { socket } = useContext(SocketContext);
   const [messages, setMessages] = useState(room.messages);

   React.useEffect(() => {
      socket.on('userJoined', (data) => {
         console.log('data', data);
         if (data.socketId !== socket.id) {
            setRoom(data.room);
            // Only For Broadcast , NOT for sender
            toast.info(`${data.userName} Joined the room`, {
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

      socket.on('newMessage', (data) => {
         console.log('data', data);
         if (data.socketId !== socket.id) {
            setMessages([...messages, data.newMessage]);
            setRoom(data.room);
         }
      });
   }, [socket, setRoom, messages]);

   const addNewMsg = async (msg) => {
      const newMessage = {
         text: msg,
         user: {
            avatar: 'https://www.w3schools.com/images/w3schools_green.jpg',
            name: currentUser,
         },
      };

      try {
         // * Send Request to add New Message
         const res = await axios.post(`${API_URL}/rooms/message`, {
            newMessage,
            socketId: socket.id,
            roomName: room.name,
         });

         if (res.status === 200) {
            setMessages([...messages, newMessage]);
            setRoom(res.data.room);
         }
      } catch (err) {
         console.log('err', err);
         toast.error(`Can't Send message ... Something went very wrong`, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
         });
      }
   };

   const open = true;

   let continuousMsg = false;
   let currentMsgUser = null;

   React.useEffect(() => {
      const messagedContainer = document.getElementById('messages');
      messagedContainer.scrollTop = messagedContainer.scrollHeight;
   }, [messages]);

   return (
      <div className={classes.root}>
         <ChatAppNav
            classes={classes}
            // handleDrawerOpen={handleDrawerOpen}
         />
         <ChatAppFooter classes={classes} addNewMsg={addNewMsg} />
         <Drawer
            className={classes.drawer}
            variant='persistent'
            anchor='left'
            open={true}
            classes={{
               paper: classes.drawerPaper,
            }}
         >
            <div className={classes.drawerHeader}>
               <h4
                  style={{
                     textAlign: 'center',
                  }}
               >
                  Room : Developers
               </h4>
            </div>

            <div className={classes.demo}>
               <Typography variant='h6' className={classes.title}>
                  Users
               </Typography>
               <Divider />
               <List>
                  {room.users.map((user) => (
                     <ListItem key={uuid()}>
                        <ListItemAvatar>
                           <Avatar>
                              <img
                                 src={`https://ui-avatars.com/api/?name=${user.name}&background=0D8ABC&color=fff&size=40`}
                                 alt='W3Schools.com'
                              ></img>
                           </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                           primary={
                              currentUser === user.name ? 'You' : user.name
                           }
                           // secondary={user.userName}
                        />
                     </ListItem>
                  ))}
               </List>
            </div>
         </Drawer>
         <main
            className={clsx(classes.content, {
               [classes.contentShift]: open,
            })}
         >
            <List
               style={{
                  overflowY: 'scroll',
                  height: '840px',
                  // height: '75vh',
               }}
               id='messages'
               className={classes.messagesList}
            >
               {messages.map((msg) => {
                  if (
                     currentMsgUser &&
                     currentMsgUser.toLowerCase() ===
                        msg.user.name.toLowerCase()
                  ) {
                     continuousMsg = true;
                  } else {
                     continuousMsg = false;
                  }
                  currentMsgUser = msg.user.name;

                  return (
                     <React.Fragment key={uuid()}>
                        <ListItem
                           style={{
                              padding: '0px 10px',
                              marginLeft:
                                 currentUser.toLowerCase() ===
                                    currentMsgUser.toLowerCase() && 'auto',
                              maxWidth: 400,
                              marginTop: continuousMsg === false && 35,
                              paddingLeft:
                                 continuousMsg === true &&
                                 currentUser.toLowerCase() !==
                                    currentMsgUser.toLowerCase() &&
                                 65,
                           }}
                        >
                           {currentUser.toLowerCase() !==
                              currentMsgUser.toLowerCase() &&
                              continuousMsg === false && (
                                 <ListItemAvatar
                                    style={{
                                       marginRight: '10px',
                                       minWidth: '30px   ',
                                    }}
                                 >
                                    <Avatar>
                                       <img
                                          src={`https://ui-avatars.com/api/?name=${msg.user.name}&background=0D8ABC&color=fff&size=40  `}
                                          alt='W3Schools.com'
                                       ></img>
                                    </Avatar>
                                 </ListItemAvatar>
                              )}
                           {currentUser.toLowerCase() !==
                              msg.user.name.toLowerCase() &&
                              continuousMsg === false && (
                                 <span
                                    style={{
                                       margin: '0px',
                                       position: 'absolute',
                                       left: '50%',
                                       top: '-20px',
                                       userSelect: 'text',
                                    }}
                                 >
                                    {msg.user.name}
                                 </span>
                              )}
                           <ListItemText
                              primary={msg.text}
                              style={{
                                 backgroundColor:
                                    currentUser.toLowerCase() ===
                                    currentMsgUser.toLowerCase()
                                       ? '#0095f9'
                                       : '#e4e6eb',
                                 color:
                                    currentUser.toLowerCase() ===
                                    currentMsgUser.toLowerCase()
                                       ? '#fff'
                                       : '#050505',
                                 padding: '5px 10px',
                                 borderRadius: '20px',
                              }}
                           ></ListItemText>
                        </ListItem>
                     </React.Fragment>
                  );
               })}

               <div className='force-overflow'></div>
            </List>
         </main>
      </div>
   );
};

export default ChatApp;
