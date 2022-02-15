import React, { useContext } from 'react'
import { ThemeContext } from '../../../../../pages/_app'

//styles and icons
import { BsMoon, BsSun } from 'react-icons/bs'
import { Switch } from '@mui/material'
import { SwitchBtnContainer, CurrentThemeText } from './Theme.styles'
import { HeaderText } from '../../Settings.styles'

export default function Theme() {
    const { isOpenDarkTheme, setIsOpenDarkTheme } = useContext(ThemeContext)

    function setTheme() {
        setIsOpenDarkTheme(!isOpenDarkTheme)
        localStorage.setItem("is_dark_theme", !isOpenDarkTheme)
    }

    return (
        <div>
            <HeaderText>Theme</HeaderText>
            <p>
                Choose how Supeem Social looks to you. Select a single theme dark or light.
            </p>
            <SwitchBtnContainer>
                <Switch checked={isOpenDarkTheme} onClick={() => setTheme()} /> 
                {isOpenDarkTheme ? (
                    <CurrentThemeText>
                        dark <BsMoon style={{ marginLeft: "0.5rem" }} />
                    </CurrentThemeText>
                ) : (
                    <CurrentThemeText>
                        light <BsSun style={{ marginLeft: "0.5rem" }} />
                    </CurrentThemeText>
                )}
            </SwitchBtnContainer>
        </div> 
    )
}
