/*
 * Created by @tranphuquy19 on 10/12/2019
 * Email: tranphuquy19@gmail.com
 */

import User from "./models/userModel";
import React, {useState} from "react";
import {UserContext} from "./contexts/userContext";
import {LoginModelContext} from "./contexts/loginModelContext";

const Store = ({children}) => {
    const [user, setUser] = useState(User);
    const [modelLogin, setModalLogin] = useState({
        isLoading: false,
        isVisible: false
    });

    return (
        <UserContext.Provider value={[user, setUser]}>
            <LoginModelContext.Provider value={[modelLogin, setModalLogin]}>
                {children}
            </LoginModelContext.Provider>
        </UserContext.Provider>
    );
}
export default Store;
