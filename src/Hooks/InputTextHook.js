import { useState } from 'react';

const InputTextHook = (initialState) => {
   const [text, setText] = useState(initialState || '');

   const handleChange = (e) => {
      setText(e.target.value);
   };

   const clearText = () => {
      setText('');
   };

   return [text, handleChange, clearText];
};

export default InputTextHook;
