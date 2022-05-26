import React from 'react';
import {Redirect} from "react-router-dom";
import CustomSpinner from './CustomSpinner';
import AppContext from "../AppContext";

export default function PrivateRoute(props) { 

  if(props.isLoading) {
      return <div><CustomSpinner/></div>
  }
  if(!props.isAuthenticated) {
      return <Redirect to="/login" />
  }
  
  return <AppContext.Provider value={props.contextData}>
       <div>{props.component}</div>
      </AppContext.Provider>
}
