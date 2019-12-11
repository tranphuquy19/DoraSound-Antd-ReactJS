/*
 * Created by @tranphuquy19 on 10/12/2019
 * Email: tranphuquy19@gmail.com
 */

import User from "./models/userModel";
import React, {useState} from "react";
import {UserContext} from "./contexts/userContext";
import {LoginModalContext} from "./contexts/loginModalContext";
import {useAudio} from "react-use";
import {PlayerContext} from "./contexts/playerContext";

const Store = ({children}) => {
    const userLogged = JSON.parse(localStorage.getItem('user'));
    let userInitState = (userLogged && userLogged.token) ? userLogged : {user: User};

    const [user, setUser] = useState(userInitState);
    const [modalLogin, setModalLogin] = useState({
        isLoading: false,
        isVisible: false
    });
    const [audio, state, controls, ref] = useAudio({
        src: 'https://doraneko.tk/resources/audios/7dae1c77e1cd334f45802d900ff1468c.mp3',
        autoPlay: false,
    });

    return (
        <UserContext.Provider value={[user, setUser]}>
            <LoginModalContext.Provider value={[modalLogin, setModalLogin]}>
                <PlayerContext.Provider value={{audio, state, controls, ref}}>
                    {children}
                </PlayerContext.Provider>
            </LoginModalContext.Provider>
        </UserContext.Provider>
    );
}
export default Store;
