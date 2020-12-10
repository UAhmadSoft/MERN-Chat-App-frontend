import { useState, useEffect } from 'react';

const useLocalStorageState = (key, initialState) => {
   let localObject;
   try {
      localObject = JSON.parse(window.localStorage.getItem(key));
   } catch (err) {
      localObject = initialState;
   }

   const [object, changeObject] = useState(localObject || null);

   useEffect(() => {
      window.localStorage.setItem(key, JSON.stringify(object));
   }, [object, key]);

   const replaceObject = (newObj) => {
      console.log('key', key);
      console.log('newObj', newObj);
      changeObject(newObj);
   };

   return [object, replaceObject];
};

export default useLocalStorageState;
