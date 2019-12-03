import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import MoodIcon from '@material-ui/icons/Mood';
import Button from '@material-ui/core/Button';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';


const useStyles = makeStyles(theme => ({
    input: {
        display: 'none'
      },

    margin: {
        margin: theme.spacing(1),
    },
    wrapper: {
        position: 'relative',
    },
    div: {
        position: 'absolute',
        top: 28,
        right: 0,
        left: 0,
        border: '1px solid',
        padding: theme.spacing(1),
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function ClickAway() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(prev => !prev);
    };

    const handleClickAway = () => {
        setOpen(false);
    };

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <div className={classes.wrapper}>


            <Button variant="contained" size="medium" color="primary" className={classes.margin} onClick={handleClick} >
          Edit Profile
      </Button>

                {/* <button variant="contained" size="medium" color="primary"  onClick={handleClick}>
                    Edit Profile
                </button> */}



                {open ? (
                    <div className={classes.div.margin}>
                       
                        <Grid container spacing={1} alignItems="flex-end">
                            <Grid item>
                                <AccountCircle />
                            </Grid>
                            <Grid item>
                                <TextField id="input-with-icon-grid" label="Username" value="Maria Angela" />
                            </Grid>
                        </Grid>


                        <Grid container spacing={1} alignItems="flex-end">
                            <Grid item>
                                <AlternateEmailIcon />
                            </Grid>
                            <Grid item>
                                <TextField id="input-with-icon-grid" label="Username" value="leahdagsdas@gmail.com" />
                            </Grid>
                        </Grid>



                        <Grid container spacing={1} alignItems="flex-end">
                            <Grid item>
                                <LocationOnIcon />
                            </Grid>
                            <Grid item>
                                <TextField id="input-with-icon-grid" label="Location" value="Cebu City" />
                            </Grid>
                        </Grid>
                        <Grid container spacing={1} alignItems="flex-end">
                            <Grid item>
                                <MoodIcon />
                            </Grid>
                            <Grid item>
                                <TextField id="input-with-icon-grid" label="Age" value="19 years old" />
                            </Grid>

                        </Grid>
                        <Fab variant="extended" aria-label="like" className={classes.fab}>
            <NavigationIcon className={classes.extendedIcon} />
            Save
    
      </Fab>
                       




                    </div>
                ) : null}
            </div>
        </ClickAwayListener>
    );
}