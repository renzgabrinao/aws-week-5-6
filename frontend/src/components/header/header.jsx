import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from '../../context/AuthContext.js';


const Header = () => {
  const { login } = useContext(AuthContext);

  return (
    <nav style={{
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
    }}>
      {login ? 
        <> 
        </> 
        : 
        <>
          <Link to="/login" style={{
            color: "white",
          }}>Login</Link>
          <Link to="/signup" style={{
            color: "white",
          }}>Signup</Link>
        </>}
    </nav>
  )
}

export default Header;