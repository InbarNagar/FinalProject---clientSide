import React, { useState,createContext} from 'react';

export const UserContext = createContext();


export const loginHook = () => {

  const [userDetails, setUserDetails] = useState();

  return {
    userDetails,
    setUserDetails,
  }
}
