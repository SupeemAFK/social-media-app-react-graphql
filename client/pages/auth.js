import React from 'react';
//auth
import { getSessionUser } from '../auth/getSessionUser'

//components
import Auth from '../components/Pages/Auth/Auth'

export default function auth() {
  return <Auth />;
}

export async function getServerSideProps({ req }) {
    const user = await getSessionUser(req)
    
    if (user) {
      return {
        redirect: {
          permanent: false,
          destination: "/",
        }
      }
    }
  
    return {
      props: {},
    }
  }