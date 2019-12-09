/*
 * Created by @tranphuquy19 on 10/12/2019
 * Email: tranphuquy19@gmail.com
 */

import User from "./models/userModel";
import React, {useState} from "react";
import {UserContext} from "./contexts/userContext";

const Store = ({children}) => {
    const [user, setUser] = useState(User);
    return(
        <UserContext.Provider value={[user, setUser]}>
            {children}
        </UserContext.Provider>
    );
}
export default Store;
