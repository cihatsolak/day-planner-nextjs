import { collection, onSnapshot, query, orderBy } from "firebase/firestore"
import { db } from '../firebase/index'
import { useState, useEffect } from "react"
import Todo from './Todo'

export default function TodoList() {

    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const ref = collection(db, 'todos');
        const q = query(ref, orderBy("date", "desc"))

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
                todos && todos.map(todo => {
                    return <Todo key={todo.id} {...todo} />
                })
            }
        </div>
    )
}