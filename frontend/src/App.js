import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import AllSpotsDetails from "./components/AllSpotsDetails";
import SetOneSPot from "./components/SetOneSpot/setOneSpot";
function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser());
  }, [dispatch]);
  useEffect(() =>{
    setIsLoaded(true)
  }, [])
    // < Navigation isLoaded = { isLoaded } />
    //   <AllSpotsDetails />
  return (
    <>
      
      
     
     
        <Switch>
          <Route exact path={'/'}>
          < Navigation isLoaded={isLoaded} />
          <AllSpotsDetails />
          </Route>
          <Route path={'/spots/:spotId'}>
            < Navigation isLoaded={isLoaded} />
            <SetOneSPot />
          </Route>
        </Switch>
      
    </>
  );
}

export default App;