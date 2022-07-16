import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@mui/material/TextField';
import DialogContentText from '@mui/material/DialogContentText';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1),
      background: 'linear-gradient(45deg, #dbdbdb 30%, #b5b3b3 90%)',
      color: 'black',
      [theme.breakpoints.down("sm")]: {
        minWidth: 32,
        paddingLeft: 8,
        paddingRight: 8,
        "& .MuiButton-startIcon": {
          margin: 0
        },
      },
      "&:hover":{
        background: 'white'
       }
    },
    buttonText: {
      [theme.breakpoints.down("sm")]: {
        display: "none"
      }
    },
    dialog : {
        width : 500,
        [theme.breakpoints.down("sm")]: {
            width : 100,
          }
    }
  }));

export const Integrations=()=>{
    const classes = useStyles();
    const [name, setName] = useState("");
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const AddIntegration= () => {
        console.log(name);
    }
    return (
        <>
            <Card sx={{ minWidth: 275 , background: '#ecf2f8'}}>
                <CardContent>
                    <Button
                        variant="contained"
                        onClick={handleClickOpen}
                        className={classes.button}
                        startIcon={<AddCircleIcon />}
                    >
                        <span className={classes.buttonText}>New Integration</span>
                    </Button>

                </CardContent>
                <CardActions>
                    
                </CardActions>
            </Card>

            <Dialog 
                open={open} 
                onClose={handleClose} 
                PaperProps={{
                    sx: {
                        width: "50%",
                        maxHeight: 300
                    }
                }
            }>
                <DialogTitle>Add New Integration</DialogTitle>
                <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Name"
                    type="email"
                    fullWidth
                    variant="standard"
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                />
                </DialogContent>
                <DialogActions>
                <Button startIcon={<AddCircleIcon />} onClick={async()=>{AddIntegration();setOpen(false)}}>Add</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
