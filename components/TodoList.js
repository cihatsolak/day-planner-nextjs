import { collection, onSnapshot, query, orderBy } from "firebase/firestore"
import { db } from '../firebase/index'
import { useState, useEffect } from "react"

export default function TodoList() {
    
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const ref = collection(db, 'todos');
        const query = query(ref, orderBy("date", "desc"))

        const unsub = onSnapshot(query, (snap) => {
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
                    return <div key={todo.id}>{todo.title}</div>
                })
            }
        </div>
    )
}