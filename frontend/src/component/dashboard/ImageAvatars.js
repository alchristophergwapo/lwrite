import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';


const useStyles = makeStyles(theme => ({
  input: {
    display: 'none'
  },
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  bigAvatar: {
    width: 90,
    height: 90,
  },
}));

export default function ImageAvatars() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleChangeAvatar = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSave = files => {
    setOpen(false);

  };


  return (
    <div>
      <label htmlFor="icon-button-photo">
        <IconButton color="primary" component="span">

          <input

            type="file"
            style={{ display: "none" }}
          />


          <Avatar alt="Remy Sharp" component="span" src="https://image.freepik.com/free-vector/businessman-character-avatar-icon-vector-illustration-design_24877-18271.jpg"
            onclick={handleChangeAvatar}

            style={{
              columnSpan: "100px",
              margin: "10px",
              width: "80px",
              height: "80px",
              marginLeft: "10px",
            }}
          />
    
        </IconButton>
      </label>

    </div>
  );
}