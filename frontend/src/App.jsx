import { useState, useEffect } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import useLocalStorage from 'react-use-localstorage';
import jwtDecode from 'jwt-decode';
import './App.css'
 
// load components
import Login from './components/login/login.jsx';
import Signup from './components/signup/signup.jsx';
import Secure from './components/secure/secure.jsx';
import Header from './components/header/header.jsx';
import Footer from './components/footer/footer.jsx';

// load context
import { AuthContext } from './context/AuthContext.js';


function App() {
  const [ login, setLogin ] = useState(false); // is user logged in
  const [ user, setUser ] = useState();
  const [ token, setToken ] = useLocalStorage("token");

  useEffect(() => {
    const token = window.localStorage.getItem("token")

    if(token){
      const user = jwtDecode(token);
      console.log(user);
      setUser(user);
      setLogin(true);
    }
    else {
      setUser(undefined);
      setLogin(false);
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{user, setUser, token, setToken, login, setLogin}}>
      <div className="App">
          <BrowserRouter>
              <Header/>

              <div className='main' style={{'minHeight': '100vh'}}>
                <Routes>
                  <Route path='/' element={<Login/>}/>
                  <Route path='/login' element={<Login/>}/>
                  <Route path='/signup' element={<Signup/>}/>
                  <Route path='/secure' element={<Secure/>}/>
                </Routes>
              </div>

              <Footer/>
          </BrowserRouter>
      </div>
    </AuthContext.Provider>
  )
}

export default App
