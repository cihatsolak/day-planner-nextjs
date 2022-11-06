import { Grid, Button } from "@mui/material";
import GoogleIcon from '@mui/icons-material/Google'
import { auth, provider } from "../firebase";
import { signInWithPopup } from "@firebase/auth";

export default function Login() {

    const loginGoogle = () => {
        signInWithPopup(auth, provider);
    }


    return (
        <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" style={{ minHeight: '100vh' }} >
            <Button onClick={loginGoogle} variant="contained" startIcon={<GoogleIcon />} >LOGIN IN WITH GOOGLE</Button>
        </Grid>
    )
}