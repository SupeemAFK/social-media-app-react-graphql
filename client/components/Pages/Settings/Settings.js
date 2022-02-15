import React from 'react'
import { useRouter } from 'next/router'

//styles and icons
import { IoMdSettings} from 'react-icons/io'
import { StyledLink } from '../../../styles/GlobalStyles'
import { SettingsDetails, SettingsPage, SettingDetailsBar, SettingsText, SettingsListContainer, SettingsList } from './Settings.styles'

//components
import Account from './SettingDetails/Account/Account'
import Theme from './SettingDetails/Theme/Theme'
import UserInfo from './SettingDetails/UserInfo/UserInfo'
import Changepassword from './SettingDetails/ChangePassword/ChangePassword'
import Security from './SettingDetails/Security/Security'

export default function Settings() {
    const settings = ["Account", "Theme"]
    const router = useRouter()
    const { settingDetails } = router.query

    return (
        <SettingsPage>
            <SettingDetailsBar>
                <SettingsText>Settings <IoMdSettings style={{ margin: '0 0.5rem'}} /></SettingsText>
                <SettingsListContainer>
                    {settings.map((setting, index) => <StyledLink key={index} href={`/settings/${setting.toLowerCase()}`}><SettingsList>{setting}</SettingsList></StyledLink>)}
                </SettingsListContainer>
            </SettingDetailsBar>
            <SettingsDetails>
                {settingDetails === 'security' && <Security />}
                {settingDetails === 'account' && <Account />}
                {settingDetails === 'theme' && <Theme />}
                {settingDetails === 'userinfo' && <UserInfo />}
                {settingDetails === 'changepassword' && <Changepassword />}
            </SettingsDetails> 
        </SettingsPage>
    )
}
