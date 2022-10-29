import { Button, TextField, Typography } from "@mui/material";
import { useState, useContext } from "react";
import { addDoc, collection, serverTimestamp } from "@firebase/firestore";
import { db } from "../firebase";
import { TodoContext } from '../contexts/TodoContext'

export default function TodoForm() {
    const { showAlert } = useContext(TodoContext);

    const [todo, setTodo] = useState({
        title: '',
        description: ''
    })

    const handleClick = async (event) => {
        event.preventDefault();

        if (todo.title == '' && todo.description == '') {
            showAlert("error", "Title or description fields cannot be left blank.")
            return;
        }

        const ref = collection(db, 'todos');
        const docRef = await addDoc(ref, { ...todo, date: serverTimestamp() })

        setTodo({ title: '', description: '' });
        showAlert("success", `Added ${docRef.id} id todo.`);
    }

    return (
        <div>
            <Typography sx={{ mt: 3, fontWeight: 'bold' }} variant="h5" color="darkgray" >If you're ready, plan new tasks</Typography>
            <TextField fullWidth label="Title" onChange={(event) => setTodo({ ...todo, title: event.target.value })} value={todo.title} margin="normal"></TextField>
            <TextField fullWidth label="Description" onChange={(event) => setTodo({ ...todo, description: event.target.value })} value={todo.description} maxRows={3} multiline></TextField>
            <Button sx={{ mt: 3 }} variant="outlined" color="success" onClick={handleClick}>Add</Button>
        </div>
    )
}
