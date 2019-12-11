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
import {PlaylistContext} from "./contexts/playlistContext";

const Store = ({children}) => {
    const userLogged = JSON.parse(localStorage.getItem('user'));
    let userInitState = (userLogged && userLogged.token) ? userLogged : {user: User};

    const [user, setUser] = useState(userInitState);
    const [modalLogin, setModalLogin] = useState({
        isLoading: false,
        isVisible: false
    });
    const [playlist, setPlaylist] = useState([
        {
            src: 'https://doraneko.tk/resources/audios/7dae1c77e1cd334f45802d900ff1468c.mp3',
            autoPlay: false,
            name: 'ahihi1',
            singer: 'Son tung mtp'
        },
        {
            src: 'https://doraneko.tk/resources/audios/d6be5459d04733ab79cd342a6ac0af1f.mp3',
            autoPlay: true,
            name: 'ahihi2',
            singer: 'Thu Trang'
        },
        {
            src: 'https://doraneko.tk/resources/audios/c3da7c9dc2557624bb4abc7c2770df94.mp3',
            autoPlay: true,
            name: 'ahihi3',
            singer: 'My Self'
        }
    ]);
    const [audio, state, controls, ref] = useAudio(playlist[0]);

    return (
        <UserContext.Provider value={[user, setUser]}>
            <LoginModalContext.Provider value={[modalLogin, setModalLogin]}>
                <PlaylistContext.Provider value={{playlist, setPlaylist}}>
                    <PlayerContext.Provider value={{audio, state, controls, ref}}>
                        {children}
                    </PlayerContext.Provider>
                </PlaylistContext.Provider>
            </LoginModalContext.Provider>
        </UserContext.Provider>
    );
}
export default Store;
