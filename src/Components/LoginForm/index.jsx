import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUserToken, fetchUserData, setRemember } from "../../Services/actions";
import { useDispatch } from "react-redux";


export default function LoginForm(){

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [invalid, setinvalid] = useState(false)

    async function login(e){
        e.preventDefault();

        const remember = document.getElementById("remember-me");
        const userLogin = {email, password};
        const token = await dispatch(fetchUserToken(userLogin));

        if(!token){
            setinvalid(true);
            return;
        }

        setinvalid(false);
        dispatch(fetchUserData(token));

        remember ? setRemember(token, remember) : sessionStorage.setItem("token", token);

        navigate("/profile")
    }
 

    return (
        <>
        <form onSubmit={login}>
          
            <div className="input-wrapper">
                <label htmlFor="username">Username</label>
                <input type="email" id="username" name="email" onChange={(e) => setEmail(e.target.value)}/>
            </div>

            <div className="input-wrapper">
                <label htmlFor="password" id="password">Password</label>
                <input type="password" id="password" onChange={(e) => setPassword(e.target.value)}/>
            </div>

            <div className="input-remember">
                <input type="checkbox" id="remember-me"/>
                <label htmlFor="remember-me">Remember me</label>
            </div>
            <button className='sign-in-button'>Sign In</button>
        </form>
        {invalid ? (
            <div>invalid</div>
        ) : null}
        </>
    )
}