
import { Button, TextField, Typography } from "@mui/material";

export default function TodoForm() {
    return (
        <div>
            <Typography sx={{ mt: 3, fontWeight: 'bold' }} variant="h5" color="darkgray" >If you're ready, plan new tasks</Typography>
            <TextField fullWidth label="Title" margin="normal"></TextField>
            <TextField fullWidth label="Description" maxRows={3} multiline></TextField>
            <Button sx={{ mt: 3 }} variant="outlined" color="success">Add</Button>
        </div>
    )
}
