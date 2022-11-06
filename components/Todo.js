import { ListItem, ListItemText, IconButton } from "@mui/material";
import moment from "moment";
import 'moment/locale/tr'
import { Delete, MoreVert } from '@mui/icons-material'
import { doc, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { useContext } from "react";
import { TodoContext } from '../contexts/TodoContext'
import { useRouter } from 'next/router'

export default function Todo({ id, title, description, date }) {

    const router = useRouter();
    const { showAlert, setTodo } = useContext(TodoContext)

    const handleDelete = async (id, event) => {
        event.preventDefault();

        const ref = doc(db, 'todos', id);
        await deleteDoc(ref);

        showAlert('warning', `${id} id will be deleted.`)
    }

    const handleMore = (id, event) => {
        router.push(`/todos/${id}`)
    }

    return (
        <ListItem onClick={() => { setTodo({ id, title, description, date }) }} sx={{ mt: 3, boxShadow: 3 }} style={{ backgroundColor: '#FAFAFA' }} secondaryAction={
            <>
                <IconButton onClick={(event) => handleDelete(id, event)}>
                    <Delete />
                </IconButton>
                <IconButton onClick={(event) => handleMore(id, event)}>
                    <MoreVert />
                </IconButton>
            </>
        }>
            <ListItemText primary={title} secondary={moment(date).format('LLL')} />
        </ListItem>
    )
}
