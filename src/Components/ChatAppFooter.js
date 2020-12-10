import React from 'react';
import SendIcon from '@material-ui/icons/Send';
import InputTextHook from '../Hooks/InputTextHook';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import clsx from 'clsx';

const ChatAppFooter = (props) => {
   const { addNewMsg } = props;

   const { classes } = props;

   const [chatMessage, handleChange, clearText] = InputTextHook('');

   const handleKeyDown = (e) => {
      //   console.log('e.target.keycode ', e.key);
      if (e.key === 'Enter') {
         sendMessage();
      }
   };

   const sendMessage = () => {
      if (chatMessage === '') {
         return;
      }
      const message = chatMessage;
      addNewMsg(message);
      clearText();
   };

   return (
      <AppBar
         position='fixed'
         className={clsx(classes.appBar, {
            [classes.appBarShift]: true,
         })}
         style={{
            // position: 'absolute',
            bottom: '0px',
            top: 'unset',
            backgroundColor: '#f0f2f5',
         }}
      >
         <Toolbar
            style={{
               padding: '0px',
               // marginLeft: '240px',
            }}
         >
            <div className={classes.chatField}>
               <input
                  type='text'
                  value={chatMessage}
                  onChange={handleChange}
                  placeholder='Your Message here'
                  onKeyDown={handleKeyDown}
               />
            </div>
            <div className={classes.sendIcon}>
               <SendIcon onClick={sendMessage} />
            </div>
         </Toolbar>
      </AppBar>
   );
};

export default ChatAppFooter;
