import { Grid } from "@mui/material";
import ReactLoading from 'react-loading'

export default function Loading({ type, color }) {
    return (
        <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" style={{ minHeight: '100vh' }} >
            <ReactLoading type={type} color={color} height={'7%'} width={'7%'} />
        </Grid>
    )
}