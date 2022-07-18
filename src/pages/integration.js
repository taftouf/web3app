import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@mui/material/TextField';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux"

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
    },
    buttonIntegration : {
        margin: theme.spacing(1),
        background: 'linear-gradient(45deg, #dbdbdb 30%, #b5b3b3 90%)',
        color: 'black',
        padding: 8,
        width: '100%',
        border: '0',
        borderRadius: 4,
        textAlign: 'left',
        fontWeight: 'bold',
        "&:hover":{
            background: 'white'
        },
        cursor: 'pointer',
    }
  }));

export const Integrations=()=>{
    const classes = useStyles();
    const address = useSelector((state)=>state.account.address);
    const token = useSelector((state)=>state.account.token_type)+" "+useSelector((state)=>state.account.access_token);
    const [name, setName] = useState("");
    const [open, setOpen] = useState(false);
    const [integrations, setIntegrations] = useState([]);
    const navigate = useNavigate();

    const getIntegration = async()=>{
        const requestOptions = {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json' ,
                'Accept': 'application/json',
                'Authorization': token,
                'owner': address
            },
        };
        await fetch('http://127.0.0.1:8000/api/integrations', requestOptions)
        .then(response => response.json())
        .then(data => setIntegrations(data));
    }

    useEffect(()=>{
        getIntegration();  
    },[])
   
    const integrationDetails = (integration)=>{
        navigate('/integration',{state:{integration}});
    }
    const AddIntegration= () => {
        console.log(name);
    }
    return (
        <>
            <Card sx={{ minWidth: 275 , background: '#ecf2f8'}}>
                <CardContent>
                    <Button
                        variant="contained"
                        onClick={()=>setOpen(true)}
                        className={classes.button}
                        startIcon={<AddCircleIcon />}
                    >
                        <span className={classes.buttonText}>New Integration</span>
                    </Button>

                </CardContent>
                <CardActions>
                    
                </CardActions>
            </Card>

            {/* liste of Integrations */}
            <Card sx={{ minWidth: 275 , background: '#ecf2f8', mt: 2}}>
                <CardContent>
                    {integrations['integration']?.map((integration,i) => (
                            <button 
                                key={i}
                                variant="contained"
                                onClick={()=>integrationDetails(integration)}
                                className={classes.buttonIntegration}
                            >
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    p: 1,
                                    m: 1,
                                    bgcolor: 'background.paper',
                                    borderRadius: 1,
                                }}
                            >
                                {integration.name}
                                
                            </Box>
                            </button>
                    ))}
                </CardContent>
                <CardActions>
                    
                </CardActions>
            </Card>
            <Dialog 
                open={open} 
                onClose={()=> setOpen(false)} 
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
