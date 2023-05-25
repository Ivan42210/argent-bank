import { useState } from "react";
import { updateUserData } from "../../Services/actions";
import { useDispatch } from "react-redux";


export default function UserName({ userData }){

    const dispatch = useDispatch();

    const [userName, setUsername] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    function displayEditProfileForm(){
        setUsername(true);
        setFirstName(userData.data.firstName);
        setLastName(userData.data.lastName);
    }

    function name(e){
        e.preventDefault();

        const token = localStorage.getItem("token") || sessionStorage.getItem("token") || userData.token;

        const edit = dispatch(updateUserData(token, firstName, lastName));

        if(!edit){
            return;
        }

        setUsername(false);
    }



    return userName ? (
       <article className="header">
            <h1 className="">Welcome Back</h1>
            <form action="formChange" onSubmit={(e) => name(e)}>
                <div className="inputChangePart">
                    <label htmlFor="firstName"></label>
                    <input
                        className="changeInput"
                        type="text"
                        name="firstName"
                        placeholder=""
                        value={firstName}
                        required
                        onChange={(e) => setFirstName(e.target.value)} 
                    />
                    <label htmlFor="lastName"></label>
                    <input
                        className="changeInput"
                        type="text"
                        name="lastName"
                        placeholder=""
                        value={lastName}
                        required
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <div className="inputChangePart">
                    <button className="buttonChange" type="submit">
                        Save
                    </button>
                    <button 
                        className="buttonChange"
                        type="submit"
                        onClick={(e) => {
                            e.preventDefault(e);
                            setUsername(false)
                            }}>
                                Cancel
                            </button>
                </div>
            </form>
       </article>
       ) : (
        <div className="header">
            <h1>
                Welcome Back
                <br />
                {userData.data.firstName} {userData.data.lastName}
            </h1>
            <button className="edit-button" onClick={() => displayEditProfileForm()}>
                Edit Name
            </button>
        </div>
       );
}