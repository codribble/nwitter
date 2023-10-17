import React, { useEffect, useState } from 'react';
import AppRouter from 'components/Router';
import { authService } from "fbase";
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  // console.log(authService.currentUser);
  const [ init, setInit ] = useState(false);
  const [ userObj, setUserObj ] = useState(null);

  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if( user ) {
        setUserObj(user);
      }

      setInit(true);
    });
  }, []);

  return (
    <>
      { init ? (
        <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} />
      ) : (
        "Initilizing..."
      )}
    </>
  )
}

export default App;