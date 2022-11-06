import { collection, onSnapshot, query, orderBy, where } from "firebase/firestore"
import { db } from '../firebase/index'
import { useState, useEffect, useContext } from "react"
import Todo from './Todo'
import { Typography } from "@mui/material"
import { AuthContext } from '../contexts/AuthContext'

export default function TodoList() {

    const { currentUser } = useContext(AuthContext);
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const ref = collection(db, 'todos');
        const q = query(ref, where('email', '==', currentUser?.email), orderBy("date", "desc"))

        const unsub = onSnapshot(q, (snap) => {
            setTodos(snap.docs.map(document => (
                { ...document.data(), id: document.id, date: document.data().date?.toDate().getTime() }
            )))
        });

        return unsub;
    }, [])

    return (
        <div>
            {
                todos.length == 0 ? (
                    <Typography sx={{ mt: 5, fontWeight: 'bold' }} variant="h5" color="darkgray" >You haven't planned anything yet...</Typography>
                ) : (
                    <Typography sx={{ mt: 5, fontWeight: 'bold' }} variant="h5" color="darkgray" >Your planning list</Typography>
                )
            }
            {
                todos && todos.map(todo => {
                    return <Todo key={todo.id} {...todo} />
                })
            }
        </div>
    )
}