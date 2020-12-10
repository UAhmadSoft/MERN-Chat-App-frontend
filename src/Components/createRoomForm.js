import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
   FormControl,
   Input,
   InputLabel,
   FormHelperText,
   Button,
} from '@material-ui/core';

import styles from '../Styles/joinRoomForm';
import bg from '../Styles/Backgrounds/bg4.svg';
import useInputState from '../Hooks/InputTextHook';
import { API_URL } from '../Utils/APIInfo';

const stylesBack = {
   backgroundColor: '#1462aa',
   backgroundImage: `url(${bg})`,
   width: '100%',
   height: '100vh',
};

const CreateRoomForm = () => {
   const [roomTxt, handleChange, clearTxt] = useInputState('');
   const [keyTxt, handleChange2, clearTxt2] = useInputState('');

   React.useEffect(() => {}, []);

   const createRoom = async (e) => {
      e.preventDefault();
      // console.log('res sent');

      try {
         const res = await axios.post(`${API_URL}/rooms`, {
            name: roomTxt,
            key: keyTxt,
         });
         // console.log('res', res);
         if (res.status === 200) {
            toast.success('🦄 New Room Created Successfully', {
               position: 'top-right',
               autoClose: 5000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
            });

            setTimeout(() => {
               window.location.href = '/join';
            }, 4000);

            clearTxt();
            clearTxt2();
         }
      } catch (err) {
         toast.error('Error Creating Room ...Try Selecting another Room Name', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
         });
         console.log('err', err);
      }

      //   window.location.href = '/join';
   };

   const gotoJoinRoom = () => {
      window.location.href = '/join';
   };

   return (
      <div style={stylesBack}>
         <div style={styles.root}>
            <div style={styles.formHeader}>
               <h4>Create New Room</h4>
            </div>

            <div style={styles.formContainer}>
               <form onSubmit={createRoom}>
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
                           Create Room
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
                     <i> want to Join room ?</i>
                  </p>
               </div>
               <div onClick={gotoJoinRoom}>
                  <Button
                     variant='contained'
                     color='primary'
                     size='small'
                     style={{
                        fontWeight: 'bold',
                     }}
                     pn
                  >
                     Join Room
                  </Button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default CreateRoomForm;
