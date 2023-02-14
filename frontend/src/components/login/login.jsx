import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const { user, setToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [ form, setForm ] = useState({email: "", password: ""})

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await axios.post('/api/login', form);
    console.log(result.data)
    if(result) {
      navigate("/secure");
      setToken(result.data.accessToken);
    }
    setForm({email: "", password: ""});
  }

  return (
    <>
      <h1>Log in</h1>
      <form onSubmit={(e) => handleLogin(e)}>
        <label htmlFor='email'>Username:</label><br/>
        <input 
          type='text' 
          name='email' 
          value={form.email} 
          onChange={(e) => setForm({...form, email: e.target.value})}
        /><br/>

        <label htmlFor='password'>Password:</label><br/>
        <input type='password' 
          name='password' 
          value={form.password}
          onChange={(e) => setForm({...form, password: e.target.value})}
        /><br/>

        <input type='submit' value='Login'/>
      </form>
      <Link to='/signup'>Don't have an account? Sign up now.</Link>
    </>

  )
}

export default Login;