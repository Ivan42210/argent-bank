import { selectUser } from "../../Features/selector";
import { useSelector, useDispatch } from "react-redux";
import { signOut, fetchUserData } from "../../Services/actions";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";



export default function UserProfile(){

    const userData = useSelector(selectUser);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const token = localStorage.getItem("token") || sessionStorage.getItem("token");

    useEffect(() => {
        if(!userData.data){
            if(token){
                dispatch(fetchUserData(token));
                navigate("/profile");
            } else{
                localStorage.clear();
                sessionStorage.clear();

                dispatch(signOut());
                navigate("/signin");
            }
        }
    }, [dispatch, navigate, token, userData]);

    if(!userData.data){
        return null;
    }

    return(
        <div className="page-container">
            <main className="main bg-dark">

                

            </main>

        </div>
    )
}