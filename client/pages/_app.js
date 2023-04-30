import React, { useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import AuthProvider from '../auth/AuthProvider'
import { ToastContainer } from 'react-toastify';
import { darkTheme, lightTheme } from '../styles/theme'
import { GlobalStyles } from '../styles/GlobalStyles'
import { ThemeProvider } from 'styled-components';
import { useApollo } from '../lib/apollo';

//styles
import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css'

export const ThemeContext = React.createContext()
export const CreatePostFormContext = React.createContext()

function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  const [isOpenDarkTheme, setIsOpenDarkTheme] = useState(false)
  const [createPostForm, setCreatePostForm] = useState({ message: '', img: [], isOpenForm: false})

  return (
    <AuthProvider>
    <GoogleOAuthProvider clientId='YOUR_CLIENT_ID'>
      <ApolloProvider client={apolloClient}>
        <CreatePostFormContext.Provider value={{ createPostForm, setCreatePostForm }}>
          <ThemeContext.Provider value={{ isOpenDarkTheme, setIsOpenDarkTheme }}>
            <ThemeProvider theme={isOpenDarkTheme ? darkTheme : lightTheme}>
              <GlobalStyles />
              <div>
                <ToastContainer />
                <Component {...pageProps} />
              </div>
            </ThemeProvider>
          </ThemeContext.Provider>
        </CreatePostFormContext.Provider>
      </ApolloProvider>
      </GoogleOAuthProvider>
    </AuthProvider>
  ) 
}

export default MyApp
