import React from 'react'

//styles and icons
import { AiOutlineEye } from 'react-icons/ai'
import { AiOutlineEyeInvisible } from 'react-icons/ai'
import { EyeButton } from './Input.styles'
import { InputAdornment } from '@mui/material'
import { StyledTextField } from '../../../../styles/GlobalStyles'

export default function Input({handleOnChange, alert, authForm, isShowPassword, setIsShowPassword, name, label, type}) {
    
    if (name === 'password' || name === 'confirmPassword') {
        return (
            <StyledTextField 
                style={{margin: '0.5rem 0'}} 
                onChange={handleOnChange} 
                error={alert.inputName.includes(name)} 
                helperText={alert.inputName.includes(name) && alert.helperText} 
                value={authForm[name]} 
                name={name} 
                label={label}  
                type={isShowPassword ? "text" : "password"} 
                variant="standard"
                InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                          <EyeButton type="button" onClick={() => setIsShowPassword(!isShowPassword)}>{isShowPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}</EyeButton>
                      </InputAdornment>
                    ),
                  }}
            />
        )
    }

    return (
        <StyledTextField 
            style={{margin: '0.5rem 0'}} 
            onChange={handleOnChange} 
            error={alert.inputName.includes(name)} 
            helperText={alert.inputName.includes(name) && alert.helperText} 
            value={authForm[name]} 
            name={name} 
            label={label}  
            type={type} 
            variant="standard"
        />
    )
}
