import React from 'react'
import Form from '../components/form';


 function Register() {
  return (
    <Form route="/api/users/register/" method="register" type="register" />
  )
}

export default Register;
// This component displays a simple register page with a heading. You can add your registration form and logic here.