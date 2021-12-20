import React from 'react'
import visibility from '../../icons/visibility.svg'
import visibilityOff from '../../icons/visibility_off.svg'

const Input = ({ name, label, handleOnChange, type, autoFocus, handleShowPassword, showPassword }) => {
    const placeholderText = `${label} here`
    let isPassword = name === 'password';
    return (
        <>
            <label htmlFor={label} className='auth-label'>{label}</label>
            <div className='input-container'>
                <input
                    name={name}
                    autoFocus={autoFocus}
                    type={type}
                    placeholder={placeholderText}
                    className="inputbar"
                    onChange={handleOnChange}
                    required
                />
                {isPassword &&
                    <> {showPassword ?
                        <img src={visibilityOff} alt="showPassword" onClick={handleShowPassword} className='visibility' />
                        :
                        <img src={visibility} alt="hidePassword" onClick={handleShowPassword} className='visibility' />}
                    </>
                }
            </div>
        </>
    )
}

export default Input
