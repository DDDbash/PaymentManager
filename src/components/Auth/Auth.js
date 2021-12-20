import React, { useState } from 'react'
import { GoogleLogin } from 'react-google-login'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import logo from '../../logo/logo.svg'
import Input from './Input';
import { signin, signup } from '../../actions/auth'

const initialFormState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }

const Auth = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [isSignup, setIsSignup] = useState(false)
    const [formData, setFormData] = useState(initialFormState)
    const [err, setErr] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleShowPassword = () => setShowPassword(!showPassword)

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSignup) {
            dispatch(signup(formData, navigate, setErr))
        } else {
            dispatch(signin(formData, navigate, setErr))
        }
    }

    const handleOnChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const switchAuth = () => {
        setErr(false)
        setIsSignup(!isSignup)
        setShowPassword(false)
    }

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch({ type: 'AUTH', data: { result, token } });
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }
    const googleFailure = () => {
        console.log("Google Sign in was unsuccessful.");
    }

    return (
        <div className='container'>
            <div className='login-form'>
                <img src={logo} alt="logo" height={72} width={72} />
                <h2 className='login-header'>{isSignup ? 'Create an account' : 'Login to your Account'}</h2>
                <h5 className='login-subheader'>See what is going on with your business</h5>
                <GoogleLogin
                    clientId="922763855566-5rfo98nutgc4b8d06ssbknom41q5985h.apps.googleusercontent.com"
                    render={(renderProps) => (
                        <button className='google-login' onClick={renderProps.onClick} disabled={renderProps.disabled}>
                            Continue with Google
                        </button>
                    )}
                    onSuccess={googleSuccess}
                    onFailure={googleFailure}
                    cookiePolicy="single_host_origin"
                />
                <p className='email-header'>------------- or {isSignup ? 'Sign up' : 'Sign in'} with Email -------------</p>
                <form onSubmit={handleSubmit}>
                    {
                        isSignup ?
                            err && <p className='error-text'>The account already exists</p>
                            :
                            err && <p className='error-text'>Email or Password doesn't match</p>
                    }
                    {
                        isSignup && (
                            <>
                                <Input
                                    name="firstName"
                                    type="text"
                                    autoFocus={true}
                                    label="First Name"
                                    handleOnChange={handleOnChange}
                                />
                                <Input
                                    name="lastName"
                                    type="text"
                                    autoFocus={false}
                                    label="Last Name"
                                    handleOnChange={handleOnChange}
                                />
                            </>
                        )
                    }
                    <Input
                        name="email"
                        type="text"
                        autoFocus={true}
                        label="Email"
                        handleOnChange={handleOnChange}
                    />
                    <Input
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        showPassword={showPassword}
                        autoFocus={false}
                        label="Password"
                        handleOnChange={handleOnChange}
                        handleShowPassword={handleShowPassword}
                    />
                    {isSignup &&
                        <Input
                            name="confirmPassword"
                            type="password"
                            autoFocus={false}
                            label="Confirm Password"
                            handleOnChange={handleOnChange}
                        />
                    }
                    <button type="submit" className='email-login-btn'>{isSignup ? 'Sign up' : 'Login'}</button>
                </form>
                {isSignup ?
                    <p className='auth-footer'>Already have an account? <button className='auth-switch' onClick={switchAuth}>Sign In</button></p> :
                    <p className='auth-footer'>Not Registered Yet? <button className='auth-switch' onClick={switchAuth}>Create an account</button></p>
                }
            </div>
        </div>
    )
}

export default Auth;
