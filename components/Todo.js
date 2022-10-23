import { ListItem, ListItemText } from "@mui/material";
import moment from "moment";
import 'moment/locale/tr'

export default function Todo({ id, title, description, date }) {
    return (
        <ListItem sx={{ mt: 3, boxShadow: 3 }} style={{ backgroundColor: '#FAFAFA' }} >
            <ListItemText primary={title} secondary={moment(date).format('LLL')} />
        </ListItem>
    )
}
