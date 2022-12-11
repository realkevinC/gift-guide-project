import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

// import { loginUser } from '../utils/API';
import Auth from '../utils/auth';
import { useMutation } from '@apollo/react-hooks';
import { LOGIN_USER } from '../utils/mutations';

const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN_USER);
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await login({
        variables: { ...userFormData }
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
      setShowAlert(true);
    }

    setUserFormData({
      username: '',
      email: '',
      password: '',
    });
  };


};

export default LoginForm;