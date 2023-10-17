import React, { useEffect, useState } from 'react';
import AppRouter from 'components/Router';
import { authService } from "fbase";
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  // console.log(authService.currentUser);
  const [ init, setInit ] = useState(false);
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);
  const [ userObj, setUserObj ] = useState(null);

  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if( user ) {
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }

      setInit(true);
    });
  }, []);

  return (
    <>
      { init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} /> : "Initilizing..." }
      <footer>&copy; {new Date().getFullYear()} Nwitter.</footer>
    </>
  )
}

export default App;