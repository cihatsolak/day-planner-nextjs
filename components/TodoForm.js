import { Button, TextField, Typography } from "@mui/material";
import { useContext, useRef, useEffect } from "react";
import { addDoc, collection, serverTimestamp, updateDoc, doc } from "@firebase/firestore";
import { db } from '../firebase'
import { TodoContext } from '../contexts/TodoContext'
import { AuthContext } from '../contexts/AuthContext'

export default function TodoForm() {

    const { currentUser } = useContext(AuthContext);
    const { showAlert, todo, setTodo } = useContext(TodoContext);
    const selectedRef = useRef();

    const handleClick = async (event) => {
        event.preventDefault();

        if (todo.title == '' && todo.description == '') {
            showAlert("error", "Title or description fields cannot be left blank.")
            return;
        }

        if (todo?.hasOwnProperty("id")) {
            const ref = doc(db, 'todos', todo.id);
            updateDoc(ref, {
                title: todo.title,
                description: todo.description,
                date: serverTimestamp()
            })

            showAlert("success", `updated todo`)
        } else {
            const ref = collection(db, 'todos');
            const docRef = await addDoc(ref, { ...todo, email: currentUser.email, date: serverTimestamp() })
            showAlert("success", `Added ${docRef.id} id todo.`);
        }

        setTodo({ title: '', description: '' })
    }

    useEffect(() => {

        const clickControl = (event) => {
            if (!selectedRef.current.contains(event.target)) {
                console.log('inputlara tıklandı.')
            } else {
                console.log('inputlar harici  tıklandı.');
            }
        }

        document.addEventListener('mousedown', clickControl);

        return () => {
            document.removeEventListener('mousedown', clickControl);
        }
    }, [])

    return (
        <div ref={selectedRef}>
            <Typography sx={{ mt: 3, fontWeight: 'bold' }} variant="h5" color="darkgray" >If you're ready, plan new tasks</Typography>
            <TextField fullWidth label="Title" onChange={(event) => setTodo({ ...todo, title: event.target.value })} value={todo.title} margin="normal"></TextField>
            <TextField fullWidth label="Description" onChange={(event) => setTodo({ ...todo, description: event.target.value })} value={todo.description} maxRows={3} multiline></TextField>
            {
                todo?.hasOwnProperty("id") ? (
                    <Button onClick={handleClick} sx={{ mt: 3 }} variant="outlined" color="warning">Update Todo</Button>
                ) : (
                    <Button onClick={handleClick} sx={{ mt: 3 }} variant="outlined" color="success">Add New Todo</Button>
                )
            }
        </div>
    )
}
