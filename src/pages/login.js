import LoginButton from "../componets/loginbutton";
import { StyledEngineProvider } from '@mui/material/styles';
import { Grid } from "@mui/material";

export const Login = ()=>{
    
    return(
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '100vh' }}
        >
            <StyledEngineProvider injectFirst>
                <LoginButton/>
            </StyledEngineProvider>
        </Grid>
    );
}