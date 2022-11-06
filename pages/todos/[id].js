import { Grid } from "@mui/material";
import { collection, doc, getDoc, getDocs } from "@firebase/firestore";
import { db } from "../../firebase";

export default function TodoDetail({ todoProps }) {
    const todo = JSON.parse(todoProps);
    return (
        <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" style={{ minHeight: '100vh' }} >
            {todo.title}
        </Grid>
    )
}

export const getStaticPaths = async () => {
    const snap = await getDocs(collection(db, 'todos'));
    const paths = snap.docs.map(doc => {
        return {
            params: { id: doc.id.toString() }
        }
    })

    return {
        paths,
        fallback: false
    }
}

export const getStaticProps = async (context) => {

    const id = context.params.id

    const docRef = doc(db, 'todos', id);
    const docSnap = await getDoc(docRef);

    return {
        props: { todoProps: JSON.stringify(docSnap.data()) || null }
    }
}