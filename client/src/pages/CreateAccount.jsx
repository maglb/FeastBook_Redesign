import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import AuthService from '../utils/auth';
import { CREATE_ACCOUNT } from '../utils/mutations';
import loginPicture from '../assets/Pictures/login-picture.png';
import { useNavigate } from 'react-router-dom';

const CreateAccountForm = () => {
    const [userFormData, setUserFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [validated, setValidated] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [createAccount] = useMutation(CREATE_ACCOUNT);
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
    
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            try {
                const { data } = await createAccount({
                    variables: { ...userFormData },
                });
                AuthService.login(data.createAccount.token);
                setShowSuccessMessage(true);
                setTimeout(() => {
                    navigate('/home');
                }, 3000);
            } catch (err) {
                console.error(err);
                setShowAlert(true);
            }
        }
    
        setValidated(true);
    };

    return (
        <div className="login-page">
            <div className="login-form">
                <h2 className='login-heading'>Create Account</h2>
                <Form noValidate validated={validated} onSubmit={handleFormSubmit} className='login-text'>
                    {showAlert && (
                        <Alert dismissible onClose={() => setShowAlert(false)} variant='danger'>
                            There was a problem with creating your account.
                        </Alert>
                    )}
                    {showSuccessMessage && (
                        <Alert variant='success'>
                            Account created successfully! Redirecting...
                        </Alert>
                    )}
                    <Form.Group className='mb-3'>
                        <Form.Label htmlFor='username'>Username</Form.Label>
                        <Form.Control className='form-input login-form-input'
                            type='text'
                            placeholder='Your username'
                            name='username'
                            onChange={handleInputChange}
                            value={userFormData.username}
                            required
                        />
                    </Form.Group>

                    <Form.Group className='mb-3'>
                        <Form.Label htmlFor='email'>Email</Form.Label>
                        <Form.Control className='form-input login-form-input'
                            type='email'
                            placeholder='Your email'
                            name='email'
                            onChange={handleInputChange}
                            value={userFormData.email}
                            required
                        />
                    </Form.Group>

                    <Form.Group className='mb-3'>
                        <Form.Label htmlFor='password'>Password</Form.Label>
                        <Form.Control className='form-input login-form-input'
                            type='password'
                            placeholder='Your password'
                            name='password'
                            onChange={handleInputChange}
                            value={userFormData.password}
                            required
                        />
                    </Form.Group>

                    <Button disabled={!(userFormData.username && userFormData.email && userFormData.password)} type='submit' variant='success'>
                        Create Account
                    </Button>
                </Form>
                <div className="signup-section">
                    <p>Already have an account? <a href="/">Log in</a></p>
                </div>
            </div>
            <div className="right-section">
                <div className='top-section'>
                    <img src={loginPicture} alt="Login Illustration" className="login-picture" />
                </div>
                <div className="logo-section">
                    <span>Feastbook</span>
                </div>
            </div>
        </div>
    );
};

export default CreateAccountForm;
