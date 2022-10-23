import Head from 'next/head'
import { Container } from '@mui/material'
import TodoList from '../components/TodoList'
import TodoForm from '../components/TodoForm'

export default function Home() {
  return (
    <Container maxWidth="md">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Day planner application with next js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <TodoForm />
      <TodoList />

    </Container>
  )
}
