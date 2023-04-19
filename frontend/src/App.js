import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import AllSpotsDetails from "./components/AllSpotsDetails";
import SetOneSPot from "./components/SetOneSpot/setOneSpot";
import CreateNewSpot from "./components/CreateNewSpot/CreateNewSpot";
import ManageSpots from "./components/ManageSpots";
import UpdateSpot from "./components/UpdateSpot/UpdateSpot";
import CreateBooking from "./components/CreateBookings";
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


 
    // <Route path={'/spots/new'}>
    //   <CreateNewSpot />
    // </Route>
  return (
    <>
      
      
     
      < Navigation isLoaded={isLoaded} />
        <Switch>
          <Route exact path={'/'}>
            <AllSpotsDetails />
          </Route>
        <Route exact path={'/spots/new'}>
          <CreateNewSpot />
        </Route>
        <Route path={'/users/current'}>
          <ManageSpots />
        </Route>
        < Route exact path={'/spots/:spotId'} >
          <SetOneSPot />
        </Route >
        < Route exact path={'/spots/:spotId/edit'} >
          <UpdateSpot />
        </Route >
       <Route exact path={'/spots/:spotId/bookings/new'} >
           <CreateBooking /> 
       </Route>
        </Switch>
      
    </>
  );
}

export default App;