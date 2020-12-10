import React, { useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

import {
   FormControl,
   Input,
   InputLabel,
   FormHelperText,
   Button,
} from '@material-ui/core';

import styles from '../Styles/joinRoomForm';
import useInputState from '../Hooks/InputTextHook';
import { API_URL } from '../Utils/APIInfo';

import { RoomContext } from '../Contexts/roomContext';

const RoomForm = () => {
   const [roomTxt, handleChange, clearTxt] = useInputState('');
   const [keyTxt, handleChange2, clearTxt2] = useInputState('');
   const [userNameTxt, handleChange3, clearTxt3] = useInputState('');

   const { setCurrentUser, setRoom, setRoomJoined } = useContext(RoomContext);

   const gotoCreateRoom = () => {
      window.location.href = '/create';
   };

   const joinRoom = async (e) => {
      e.preventDefault();

      try {
         const res = await axios.get(
            `${API_URL}/rooms/${userNameTxt}/${roomTxt}/${keyTxt}`
         );

         console.log('res', res);

         if (res.status === 200) {
            toast.success('🦄 Room Joined Successfully Redirecting...', {
               position: 'top-right',
               autoClose: 5000,
               hideProgressBar: false,
               closeOnClick: false,
               pauseOnHover: false,
               draggable: true,
               progress: undefined,
            });

            // console.clear();
            // console.log('room', res.data.room[0]);

            // Saving to room Context
            setRoomJoined(true);
            setRoom(res.data.room);
            setCurrentUser(userNameTxt);

            clearTxt();
            clearTxt2();
            clearTxt3();

            setTimeout(() => {
               console.clear();
               console.log('joining rom');
               window.location.href = '/room';
            }, 4000);
         }
      } catch (err) {
         toast.error('🦄 Wrong Combination of Room name and key', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
         });
      }
   };

   return (
      <div style={styles.stylesBack}>
         <div style={styles.root}>
            <div style={styles.formHeader}>
               <h4>Join Room</h4>
            </div>

            <div style={styles.formContainer}>
               <form onSubmit={joinRoom}>
                  <FormControl fullWidth style={{ marginBottom: 10 }} required>
                     <InputLabel htmlFor='userName'>Your Name</InputLabel>
                     <Input
                        id='userName'
                        required={true}
                        onChange={handleChange3}
                        value={userNameTxt}
                     />
                  </FormControl>
                  <FormControl fullWidth style={{ marginBottom: 10 }} required>
                     <InputLabel htmlFor='roomName'>Room Name</InputLabel>
                     <Input
                        id='roomName'
                        required={true}
                        onChange={handleChange}
                        value={roomTxt}
                     />
                  </FormControl>
                  <FormControl fullWidth>
                     <InputLabel htmlFor='roomKey'>Room Key</InputLabel>
                     <Input
                        id='roomKey'
                        aria-describedby='my-helper-text'
                        onChange={handleChange2}
                        value={keyTxt}
                     />
                     <FormHelperText
                        id='my-helper-text'
                        style={{
                           color: 'green',
                        }}
                     >
                        Only If you want to Lock Your room .
                     </FormHelperText>
                  </FormControl>

                  <div
                     style={{
                        display: 'flex',
                        flexDirection: 'row',
                        marginTop: 20,
                        alignItems: 'center',
                        // justifyContent: 'space-around',
                     }}
                  >
                     <div>
                        <Button
                           variant='contained'
                           style={{
                              backgroundColor: '#00ff40',
                           }}
                           type='submit'
                        >
                           Join Room
                        </Button>
                     </div>
                  </div>
               </form>
            </div>
            <div style={styles.formFooter}>
               <div>
                  <p
                     style={{
                        marginRight: 10,
                     }}
                  >
                     <i> want to Create new room ?</i>
                  </p>
               </div>
               <div onClick={gotoCreateRoom}>
                  <Button
                     variant='contained'
                     color='primary'
                     size='small'
                     style={{
                        fontWeight: 'bold',
                     }}
                     pn
                  >
                     Create Room
                  </Button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default RoomForm;
