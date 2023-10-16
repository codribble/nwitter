import React, { useEffect, useState } from 'react';
import AppRouter from 'components/Router';
import { authService } from "fbase";
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  // console.log(authService.currentUser);
  const [ init, setInit ] = useState(false);
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);
  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if( user ) {
        setIsLoggedIn(true);
        const uid = user.uid;
      } else {
        setIsLoggedIn(false);
      }

      setInit(true);
    });
  }, []);

  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn} />
      <footer>&copy; {new Date().getFullYear()} Nwitter.</footer>
    </>
  )
}

export default App;