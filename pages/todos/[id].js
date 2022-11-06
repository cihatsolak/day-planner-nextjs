import { collection, doc, getDoc, getDocs } from "@firebase/firestore";
import { db } from "../../firebase";
import { Button, Card, CardContent, CardActions, Grid, Typography } from "@mui/material";
import Link from 'next/link'

export default function TodoDetail({ todoProps }) {
    const todo = JSON.parse(todoProps);
    return (
        <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" style={{ minHeight: '100vh' }} >
            <Grid item xs={4}>
                <Card sx={{ minWidth: 300, maxWİdth: 600, boxShadow: 3 }} style={{ backgroundColor: '#fafafa' }}>
                    <CardContent>
                        <Typography variant="h5" component="div">
                            {todo.title}
                        </Typography>
                        <Typography sx={{ mt: 2 }} color="GrayText" variant="h5" component="div">
                            {todo.description}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Link href="/">
                            <Button size="small">Geri Dön</Button>
                        </Link>
                    </CardActions>
                </Card>
            </Grid>
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