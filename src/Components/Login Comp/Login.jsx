import { Button } from '@material-ui/core';
import React from 'react';
import { actionTypes } from '../../Context Api/reducer';
import { useStateValue } from '../../Context Api/StateProvider';
import { auth, provider } from '../../firebase';
import './Login.css';

function Login() {
    const [{}, dispatch] = useStateValue();
    const signIn= () =>{
        //auth from local firebase
        auth.signInWithPopup(provider).then((result)=>
        {
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user,
            });
        }).catch((error)=>alert(error.message) );
     
    };

    return (
        <div className="login">
            <div className="login__container">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/800px-WhatsApp.svg.png" alt=""/>
                <div className="login__text">
                    <h1>Sign in to WhatsApp</h1>
                </div>
                <Button onClick={signIn}  >
                    Sign In With Google
                </Button>
            </div>
        </div>
    )
}

export default Login
