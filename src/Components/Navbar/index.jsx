import { Link, useNavigate } from "react-router-dom"
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


    return(
        <>
        <nav className="main-nav">
            <Link className="main-nav-logo" to={'/'}>
                <img className="main-nav-logo-image" src={logo} alt="Argent Bank Logo" />
                <h1 className="sr-only">Argent Bank</h1>
            </Link>

            <Link className="main-nav-item" to={'/signin'}>
                <FontAwesomeIcon icon={'user-circle'}></FontAwesomeIcon>
                Sign In
            </Link>

        </nav>
        </>
    )
}