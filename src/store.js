/*
 * Created by @tranphuquy19 on 10/12/2019
 * Email: tranphuquy19@gmail.com
 */

import User from "./models/userModel";
import React, {useState} from "react";
import {UserContext} from "./contexts/userContext";
import {LoginModelContext} from "./contexts/loginModelContext";
import {useAudio} from "react-use";
import {PlayerContext} from "./contexts/playerContext";

const Store = ({children}) => {
    const userLogged = JSON.parse(localStorage.getItem('user'));
    let userInitState = (userLogged && userLogged.token) ? userLogged : {user: User};

    const [user, setUser] = useState(userInitState);
    const [modelLogin, setModalLogin] = useState({
        isLoading: false,
        isVisible: false
    });
    const [audio, state, controls, ref] = useAudio({
        src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
        autoPlay: false,
    });

    return (
        <UserContext.Provider value={[user, setUser]}>
            <LoginModelContext.Provider value={[modelLogin, setModalLogin]}>
                <PlayerContext.Provider value={{audio, state, controls, ref}}>
                    {children}
                </PlayerContext.Provider>
            </LoginModelContext.Provider>
        </UserContext.Provider>
    );
}
export default Store;
