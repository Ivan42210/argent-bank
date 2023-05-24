import { localHost } from "./localHost";
import axios from "axios";
import { actions } from "../Features/reducer";
import LoginForm from "../Components/LoginForm";
import { selectUser } from "../Features/selector";

export function signOut(){
    return (dispatch) => {
        localStorage.clear();
        sessionStorage.clear();
        dispatch(actions.reset());
    };
}


export function setRemember(token, remember){
    localStorage.setItem("token", token);
    localStorage.setItem("isRemembered", remember);
}


export function fetchUserToken(userLogin){
    return async (dispatch, getState) => {
        const tokenStatus = selectUser(getState()).tokenStatus;
        
        if(tokenStatus === "pending" || tokenStatus === "updating"){
            return;
        }

        dispatch(actions.userTokenFetching(userLogin));

        const options = {
            headers: {
                "ContentType": "application/json",
            },
        };

        try{
            const response = await axios.post(`${localHost}login`,
            userLogin,
            options);

            if(response.status === 400){
                console.log("invalid fields");
            } if (response.status === 401){
                dispatch(actions.reset());
            }

            const data = response.data;
            dispatch(actions.userTokenResolved(data.body.token));

            return data.body.token;
           
        } catch(error){
            dispatch(actions.userTokenRejected(error.message));
        }
    };
}

export function fetchUserData(token) {
    return async (dispatch, getState) =>{
        const status = selectUser(getState()).dataStatus;

        if(status ==="pending" || status ==="updating") {
            return;
        } if(status === "rejected") {
            dispatch(signOut());
            return <LoginForm />;
        }

        dispatch(actions.userDataFetching(token));

        const options = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        try{
            const response = await axios.post(`${localHost}profile`, null, options);
            
            if(response.status === 400){
                console.log("invalid fields");
            }

            if(response.status === 401){
                dispatch(signOut());
            }

            const data = response.data;
            dispatch(actions.userDataResolved(token, data.body));
        } catch(error){
            dispatch(actions.userDataRejected(error.message));
        }
    };
}

export function updateUserData(token, firstName, lastName) {
    return async (dispatch) => {
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
  
      const body = JSON.stringify({ firstName, lastName });
  
      try {
        const response = await axios.put(
          `${localHost}profile`,
          body,
          options
        );
  
        if (response.status === 400) {
          console.log("invalid fields");
        }
        if (response.status === 401) {
          dispatch(signOut());
        }
  
        dispatch(actions.userUpdateProfile(token, firstName, lastName));
      } catch (error) {
        dispatch(actions.userDataRejected(error.message));
      }
    };
  }