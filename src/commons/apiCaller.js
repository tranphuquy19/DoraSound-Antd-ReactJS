/*
 * Created by @tranphuquy19 on 10/12/2019
 * Email: tranphuquy19@gmail.com
 */
import axios from "axios";
import config from "./configs";
import headerHeper from "./HeaderHelper";

let apiCaller = (endpoint, method = 'GET', body) => {
    return axios({
        method: method,
        url: `${config.API_URL}/${endpoint}`,
        data: body,
        headers: headerHeper()
    });
};

export default apiCaller;
