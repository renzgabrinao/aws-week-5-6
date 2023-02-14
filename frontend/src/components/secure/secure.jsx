import { AuthContext } from "../../context/AuthContext";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

const Secure = () => {

  const [ form, setForm ] = useState(false);
  const [ name, setName ] = useState("");
  const { user, setToken, token } = useContext(AuthContext);

  const handleChangeName = async (e) => {
    e.preventDefault();
    const result = await axios.put('api/users/displayName', 
      { displayName: name, email: user.email },
      { headers: {
          'Authorization': `Bearer ${token}`
        }
    })

    if(result.data.status == "ok") {
      console.log(result.data);
      setToken(result.data.accessToken);
    } 
  }

  const handleLogout = () => {
    setToken("");
  }

  return (
    <div>
      {!!user ? 
        <div>
          <h1>{user.displayName}</h1>
          {form ?
            <form onSubmit={(e) => handleChangeName(e)}>
              <input 
                type="text" 
                name="displayName" 
                id="displayName" 
                placeholder="New Display Name"
                value={name}
                onChange={(e) => {setName(e.target.value)}}/>
              <input type="submit" value="Submit"/>
            </form>
          : 
          <></>}
          <button onClick={() => {setForm(!form)}}>Change Display Name</button>
          <h2>{user.email}</h2>
          <button onClick={() => {handleLogout()}}>Logout</button>
        </div>
      :
      <>
        <Link to="/">You Are Logged Out. Click here to log in again</Link>
      </>
      }

    </div>
  )
}

export default Secure;