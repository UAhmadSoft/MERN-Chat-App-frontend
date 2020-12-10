import React, { useContext } from 'react';

import { Switch, Route } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';

import './App.css';
import ChatApp from './Components/ChatApp';
import JoinRoomForm from './Components/joinRoomForm';
import CreateRoomForm from './Components/createRoomForm';
import { RoomContext } from './Contexts/roomContext';

const App = () => {
   const { isRoomJoined } = useContext(RoomContext);
   return (
      <div className='App'>
         <ToastContainer
            style={{
               width: '400px',
            }}
         />
         <Switch>
            <Route
               exact
               path='/room'
               render={() => {
                  console.log('isRoomJoined', isRoomJoined);
                  if (!isRoomJoined || isRoomJoined === false)
                     window.location.href = '/join';
                  return <ChatApp />;
               }}
            />
            <Route exact path='/create' component={CreateRoomForm} />
            <Route exact path='/join' component={JoinRoomForm} />
            <Route path='/' component={JoinRoomForm} />
         </Switch>
      </div>
   );
};

export default App;
