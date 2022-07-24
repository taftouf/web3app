import { List, ListItem, ListItemText} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ExtensionIcon from '@mui/icons-material/Extension';
import PaymentsIcon from '@mui/icons-material/Payments';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';


const SideBarListItem = ()=>{
    const navigate = useNavigate();
    const [active, setActive] = useState({overview:false,payments:false,integrations:false});

    const changeState = (str)=>{
        switch (str) {
            case "overview":
                setActive({overview:true,payments:false,integrations:false});
                break;
            case "payments":
                setActive({overview:false,payments:true,integrations:false});
                break;

            case "integrations":
                setActive({overview:false,payments:false,integrations:true});
                break;
        
            default:
                break;
        }
    }
    return(
        <List>               
            <ListItem 
                className='li'
                button 
                sx={{mt:2, '&:hover':{background: "#ecf2f8", color: 'black'},  borderBottomLeftRadius: 8,borderTopLeftRadius:8, ...(active.overview&&{background:'#ecf2f8', color:'black'})}}
                onClick={()=>{navigate('home');changeState("overview")}}
                >
                <b className={active.overview?'active outsid':"outsid"}></b>
                <b className={active.overview?'active outsid':"outsid"}></b>
                <DashboardIcon sx={{ml:2}} />
                <ListItemText sx={{ml:2}}>Overview</ListItemText>
            </ListItem>
            <ListItem 
                className='li'
                button 
                sx={{mt:2, '&:hover':{background: "#ecf2f8", color: 'black'}, borderBottomLeftRadius: 8,borderTopLeftRadius:8, ...(active.payments&&{background:'#ecf2f8', color:'black'})}}
                onClick={()=>{navigate('payments');changeState("payments")}}
            >
                <b className={active.payments?'active outsid':"outsid"}></b>
                <b className={active.payments?'active outsid':"outsid"}></b>
                <PaymentsIcon sx={{ml:2}}/>
                <ListItemText sx={{ml:2}}>Payments</ListItemText>
            </ListItem>
            <ListItem 
                className='li'
                button 
                sx={{mt:2, '&:hover':{background: "#ecf2f8", color: 'black'}, borderBottomLeftRadius: 8,borderTopLeftRadius:8, ...(active.integrations&&{background:'#ecf2f8', color:'black'})}}
                onClick={()=>{navigate('integrations');changeState("integrations")}}>
                <b className={active.integrations?'active outsid':"outsid"}></b>
                <b className={active.integrations?'active outsid':"outsid"}></b>
                <ExtensionIcon sx={{ml:2}}/>
                <ListItemText sx={{ml:2}}>Integrations</ListItemText>
            </ListItem>
        </List>
    )
 } 

 export default SideBarListItem;
 