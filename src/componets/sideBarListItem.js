import { List, ListItem, ListItemText} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ExtensionIcon from '@mui/icons-material/Extension';
import PaymentsIcon from '@mui/icons-material/Payments';
import { useNavigate } from "react-router-dom";

const SideBarListItem = ()=>{
    const navigate = useNavigate();

    return(
        <List>               
            <ListItem 
                button 
                sx={{mt:2, '&:hover':{background: "#fff"}, borderRadius: 16}}
                onClick={()=>{navigate('home')}}
                >
                <DashboardIcon sx={{ml:2}} />
                <ListItemText sx={{ml:2}}>Overview</ListItemText>
            </ListItem>
            <ListItem 
                button 
                sx={{mt:2, '&:hover':{background: "#fff"}, borderRadius: 16}}
                onClick={()=>{navigate('payments')}}
            >
                <PaymentsIcon sx={{ml:2}}/>
                <ListItemText sx={{ml:2}}>Payments</ListItemText>
            </ListItem>
            <ListItem 
                button 
                sx={{mt:2, '&:hover':{background: "#fff"}, borderRadius: 16}}
                onClick={()=>{navigate('integrations')}}>
                <ExtensionIcon sx={{ml:2}}/>
                <ListItemText sx={{ml:2}}>Integrations</ListItemText>
            </ListItem>
        </List>
    )
 } 

 export default SideBarListItem;
 