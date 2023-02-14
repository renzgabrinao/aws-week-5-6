import { Link } from 'react-router-dom';

const Signup = () => {
  return (
    <>
      <h1>Sign Up</h1>
      <form method='POST' action='/api/signup'>
        <label htmlFor='name'>Name</label><br/>
        <input type='text' name='name'/><br/>

        <label htmlFor='email'>Email</label><br/>
        <input type='text' name='email'/><br/>

        <label htmlFor='password'>Password:</label><br/>
        <input type='password' name='password'/><br/>

        <input type='submit' value='Signup'/>
      </form>
    </>
  )
}

export default Signup;