import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import MediaCapture from './MediaCapture';
// import ImageAvatars from './profile/ImageAvatars';
// import ClickAway from '.profile/ClickAway';
// import AlignItemsList from './profile/AlignItemsList';



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
     
      {/* <ImageAvatars /> */}
      {/* <ClickAway/> */}
      <MediaCapture />
      {/* <AlignItemsList/> */}
    
    </div>
  );
}

