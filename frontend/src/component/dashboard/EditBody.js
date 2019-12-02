import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import MediaCapture from './MediaCapture';
import User from './profile/User';
import ImageAvatars from './profile/ImageAvatars';
import ClickAway from './profile/ClickAway';
import UserInformation from './UserInformation';
import AlignItemsList from './AlignItemsList';

// import InteractiveList from './profile/InteractiveList';


const useStyles = makeStyles(theme => ({
  input: {
    display: 'none'
  },
  fab: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function EditBody() {

  const classes = useStyles();



  return (
    
    
      <div className={classes.root}>
        <User />
     
      <ImageAvatars />
      <ClickAway/>
      <MediaCapture />
      <AlignItemsList/>
      {/* <EditInfo/>
      <UserInformation/> */}
{/* 

       */}
     {/* <EditUsertextField /> */}
     
     
      
   
      
    </div>
  );
}

