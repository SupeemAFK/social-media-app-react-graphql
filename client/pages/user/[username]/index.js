import React from 'react';

//components
import Navbar from '../../../components/Navbar/Navbar'
import ProfilePage from '../../../components/Pages/ProfilePage/ProfilePage'

//styles
import { Content } from '../../../styles/GlobalStyles';

export default function UserProfile() {
  return (
    <>
      <Navbar />
      <Content>
        <ProfilePage />
      </Content>
    </>
  )
}
