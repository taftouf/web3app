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
import { useSelector } from "react-redux";
import { Pagination } from "@mui/material";
import Grid from '@mui/material/Grid';
import { theme } from '../componets/theme';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1),
      background: 'linear-gradient(45deg, #b5b3b3 30%, #dbdbdb 90%)',
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
        background: 'linear-gradient(45deg, #b5b3b3 40%, #dbdbdb 90%)',
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
    const isSmall = useMediaQuery(theme.breakpoints.down('md'));
    const classes = useStyles();
    const address = useSelector((state)=>state.account.address);
    const token = useSelector((state)=>state.account.token_type)+" "+useSelector((state)=>state.account.access_token);
    const [name, setName] = useState("");
    const [open, setOpen] = useState(false);
    const [integrations, setIntegrations] = useState([]);
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [nombrePage, setNombrePage] = useState(0);
  
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
        await fetch('http://127.0.0.1:8000/api/integrations?page='+page, requestOptions)
        .then(response => response.json())
        .then(data => {setIntegrations(data); setNombrePage(data['integration']?.last_page)})
        .catch(err => {
            console.log("error");
        });
    }

    useEffect(()=>{
        getIntegration(); 
        console.log(integrations); 
    },[page])
   
    const integrationDetails = (integration)=>{
        navigate('/integration',{state:{integration}});
    }
    const AddIntegration= async() => {
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json' ,
                'Accept': 'application/json',
                'Authorization': token,
            },
            body: JSON.stringify({ 
                owner: address,
                name: name })
        };
        await fetch('http://127.0.0.1:8000/api/integrations', requestOptions)
        .then(response => response.json())
        .then(data => setIntegrations(data))
        .catch(err => {
            console.log("error");
        });
    }
    return (
        <>
            <Card elevation={4} sx={{ minWidth: 275 , background: '#ecf2f8'}}>
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
            <Card elevation={4} sx={{ minWidth: 275 , background: '#ecf2f8', mt: 2}}>
                <CardContent>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2}>
                        {integrations['integration'] === undefined ?
                        (<div> </div>)
                        :
                        integrations['integration'].data?.map((integration,i) => (
                                    <Grid item xs={isSmall ? 12 : 6}>
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
                                                    pl: 1,
                                                    ml: 1,
                                                    bgcolor: 'background.paper',
                                                    borderRadius: 1,
                                                }}
                                            >
                                            <pre>{integration.name}</pre> 
                                                
                                            </Box>
                                            <Box 
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    pl: 1,
                                                    ml: 1,
                                                    bgcolor: 'background.paper',
                                                    borderRadius: 1,
                                                    fontWeight: 'lighter',
                                                    color: '#dbdbdb'
                                                }}>
                                                <span>Payment Widget To 
                                                    {
                                                        " "+String(integration.receiver).substring(0, 6) +
                                                        "..." +
                                                        String(integration.receiver).substring(38)
                                                    }
                                                </span>
                                            </Box>
                                        </button>
                                    </Grid>
                        ))
                        }
                        </Grid>
                    </Box>
                </CardContent>
            </Card>

            {/* pagination */}
            {nombrePage > 1 &&(
            <Card elevation={4} sx={{ minWidth: 275 , background: '#ecf2f8', mt: 2}}>
                <CardContent>
                    <Pagination count={nombrePage} onChange={(e, value) => {setPage(value)}} />
                </CardContent>
            </Card>)
            }
            <Dialog 
                open={open} 
                TransitionComponent={Transition}
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
