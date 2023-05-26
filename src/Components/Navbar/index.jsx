import { Link, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import logo from '../../assets/img/argentBankLogo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector, useDispatch } from "react-redux"
import { selectUser } from "../../Features/selector"
import { fetchUserData, signOut } from "../../Services/actions"

export default function Navbar(){

    const userData = useSelector(selectUser);
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    const isRemembered = localStorage.getItem("isRemembered");

    const dispatch= useDispatch();
    const navigate = useNavigate();

    function clearStorage(){
        localStorage.clear();
        sessionStorage.clear();
        return dispatch(signOut());
    }


    function remember(){
        if(isRemembered){
            dispatch(fetchUserData(token));
            navigate("/profile");
        }else{
            navigate("/signin");
        }
    }

    useEffect(() => {
        if (token && !userData.data) {
          dispatch(fetchUserData(token));
        }
      }, [dispatch, token, userData.data]);

   

    return token && userData.data?(
       <nav className="main-nav">
            <Link to={"/"} className="main-nav-logo">
            <img className="main-nav-logo-image" src={logo} alt="Argent Bank Logo" />
            <h1 className="sr-only">Argent Bank</h1>
            </Link>
            <div>
                <Link to={"/profile"} className="main-nav-item">
                    <FontAwesomeIcon icon={'user-circle'}></FontAwesomeIcon>
                    {userData.data.firstName}
                </Link>
                <Link to={"/"} onClick={clearStorage} className="main-nava-item">
                    <FontAwesomeIcon icon={'sign-out'}></FontAwesomeIcon>
                    Sign Out
                </Link>
            </div>
       </nav>
    ) : (
        <nav className="main-nav">
        <Link className="main-nav-logo" to={'/'}>
            <img className="main-nav-logo-image" src={logo} alt="Argent Bank Logo" />
            <h1 className="sr-only">Argent Bank</h1>
        </Link>

        <Link className="main-nav-item" to={'/signin'}>
            <div onClick={remember}> 
            <FontAwesomeIcon icon={'user-circle'}></FontAwesomeIcon>
            Sign In
            </div>
        </Link>

        </nav>
    )
}