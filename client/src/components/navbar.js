import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
const Navbar = () => {
    const navigate = useNavigate();

    const logout = () => {
        setCookies("access_token", "");
        window.localStorage.clear();
        navigate("/auth");
    };
    const [cookies, setCookies] = useCookies(['access_token'])
  return (
    <div className='navbar'>
      <Link to='/'>Home</Link>
      {!cookies.access_token ? (<><Link to='/auth'>Login/Register</Link></>): <><Link to='/mycryptos'>Mycryptos</Link><Link to='/add'>Add Crypto</Link><button onClick={logout}> Logout </button> </>}
      
    </div>
  )
}

export default Navbar
