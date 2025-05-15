import { useState } from 'react';

import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';

//using styled componenetsss of REACT

const Form = styled.form`
  display: flex;
  flex-direction: column;
  background: #e5eaf5;
  border-radius: 20px;
  gap: 20px;
  max-width: 550px;
  margin: 40px auto;
  padding: 40px;
`;

const Input = styled.input`
  padding: 15px;
  font-size: 18px;
  border: 1px solid #e5eaf5;
  border-radius: 15px;
  outline: none;
`;

const Button = styled.button`
  padding: 12px;
  font-size: 18px;
  background: lightBlue;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  &:hover {
   opacity:0.5
  }
`;

const Title = styled.h2`
  text-align: center;
  margin: 60px;
`;


function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState(
    { username: '', password: '' }
  );

  
   const handleChange = (e) =>
  {
     const name = e.target.name;
     const value = e.target.value;
    setForm({ ...form, [name]: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
// console.log(response)
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('token', data.token);

      navigate('/');//goinggg main dashhboarddd
    } else alert(data.message);
  };
// console.log(response)
  return (
    <>
      <Title>One Step Awayyy....!!!</Title>

      <Form onSubmit={handleSubmit}>
        <Input
          name="username"
          placeholder="Username"
          onChange={handleChange}
          required
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <Button type="submit">Login</Button>
      </Form>




     <p style={{ textAlign: 'center', marginTop: '20px' }}>
        Don't have an account ? <Link style={{color: 'lightblue'}} to="/register">Register</Link>
     </p>
    </>

    
  );
}

export default Login;
