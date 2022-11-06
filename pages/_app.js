import '../styles/globals.css'
import AuthContextContextProvider from '../contexts/AuthContext'

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextContextProvider>
      <Component {...pageProps} />
    </AuthContextContextProvider>
  )
}

export default MyApp
