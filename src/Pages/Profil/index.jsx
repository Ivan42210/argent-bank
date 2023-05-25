import { selectUser } from "../../Features/selector";
import { useSelector, useDispatch } from "react-redux";
import { signOut, fetchUserData } from "../../Services/actions";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import UserName from "../../Components/UserName";
import UserPart from "../../Components/ProfilePart";



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
                <UserName userData={userData}/>
                <h2 className="sr-only">Accounts</h2>

                <UserPart 
                    accountTitle="Argent Bank Checking (x8349)"
                    accountAmount="$2,082.79"
                    accountBalance="Available Balance"
                />

                <UserPart 
                    accountTitle="Argent Bank Savings (x6712)"
                    accountAmount="$10,928.42"
                    accountBalance="Available Balance"
                />

                <UserPart 
                    accountTitle="Argent Bank Credit Card (x8349)"
                    accountAmount="$184.30"
                    accountBalance="Current Balance"
                />

            </main>

        </div>
    )
}