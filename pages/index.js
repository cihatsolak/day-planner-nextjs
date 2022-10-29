import Head from 'next/head'
import { Container, Snackbar, Alert } from '@mui/material'
import TodoList from '../components/TodoList'
import TodoForm from '../components/TodoForm'
import { TodoContext } from '../contexts/TodoContext'
import { useState } from 'react'

export default function Home() {

  const [open, setOpen] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");

  const showAlert = (type, message) => {
    setAlertType(type);
    setAlertMessage(message);
    setOpen(true);
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <TodoContext.Provider value={{ showAlert }}>
      <Container maxWidth="md">
        <TodoForm />
        <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={open} autoHideDuration={4000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={alertType} sx={{ width: '100%' }}>
            {alertMessage}
          </Alert>
        </Snackbar>
        <TodoList />
      </Container>
    </TodoContext.Provider>
  )
}
