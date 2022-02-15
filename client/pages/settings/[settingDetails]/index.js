import React from 'react';

//components
import Navbar from '../../../components/Navbar/Navbar'
import Settings from '../../../components/Pages/Settings/Settings'

//styles
import { Content } from '../../../styles/GlobalStyles';

export default function SettingsPage() {
  return (
    <>
    <Navbar />
    <Content>
      <Settings />
    </Content>
    </>
  );
}
